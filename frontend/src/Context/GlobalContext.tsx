import React, { createContext, useContext, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuth } from './AuthContext';

interface GlobalContextType {
  // Authentication
  user: any; 
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // App-level state
  filters: any;
  setFilters: (filters: any) => void;
  title: string;
  setTitle: (title: string) => void;
  listings: any[];
  setListings: (listings: any[]) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  // Auth
  user: null,
  loading: true,
  error: null,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  logout: async () => {},
  // App state
  filters: {},
  setFilters: () => {},
  title: '',
  setTitle: () => {},
  listings: [],
  setListings: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser, loading: authLoading, error: authError } = useAuth();

  const [filters, setFilters] = useState({});
  const [title, setTitle] = useState<string>('');
  const [listings, setListings] = useState<any[]>([]);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      if (!email.endsWith('.edu')) {
        throw new Error('Please use a .edu email address');
      }
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user: authUser,
        loading: authLoading,
        error: authError,
        signInWithEmail,
        signUpWithEmail,
        logout,
        filters,
        setFilters,
        title,
        setTitle,
        listings,
        setListings,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
