import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalProvider } from "@/Context/GlobalContext";
import { ChatProvider } from "@/Context/ChatContext";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import Navbar from "@/components/Navbar";
import ChatComponent from "@/components/Chat/ChatComponent";
import React, { useRef, createContext } from "react";

// Context to provide global chat ref
export const GlobalChatRefContext = createContext<React.RefObject<{ fetchChats: () => void } | null> | null>(null);

export default function App({ Component, pageProps, router }: AppProps) {
  const isPublic = router.pathname === '/login' || router.pathname === '/signup';
  const chatRef = useRef<{ fetchChats: () => void } | null>(null);

  return (
    <GlobalProvider>
      <ChatProvider>
        <GlobalChatRefContext.Provider value={chatRef}>
          {isPublic ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Navbar />
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
          {/* Only show ChatComponent if user is signed in  kind of hacky, this should be changed later !!!*/}
          {!isPublic && typeof window !== 'undefined' && (window.
            localStorage.getItem('user') || window.sessionStorage.getItem('user')) && (
            <ChatComponent ref={chatRef} listingId="global-chat" listingTitle="ReuseU" />
          )}
        </GlobalChatRefContext.Provider>
      </ChatProvider>
    </GlobalProvider>
  );
}
