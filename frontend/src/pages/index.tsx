import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Dashboard from "@/components/Dashboard";
import ListingsHomepage from "@/components/Listings/ListingsHomepage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <div className="min-h-screen bg-[#EEDBBE]">
        <Dashboard />
        <div className="pt-16">
          <ListingsHomepage />
        </div>
      </div>
    </main>
  );
}
