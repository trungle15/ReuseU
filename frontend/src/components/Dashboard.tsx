/**
 * Dashboard Component
 * 
 * This is the main navigation bar component that appears at the top of every page.
 * It includes:
 * - Logo/Home button (ReuseU)
 * - Search bar for listings
 * - Create listing button
 * - Profile button
 * - Settings button
 * 
 * \
 */
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon, UserCircleIcon, Cog8ToothIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { LeafIcon, RecycleIcon } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  
  // Navigate to home page
  const handleReuseClick = () => {
    router.push('/');
  }
  
  // Navigate to create listing page
  const handleMakeAListingClick = () => {
    router.push('/create');
  }
  
  // Navigate to user profile page
  const handleUserCircleClick = () => {
    router.push('/profile');
  }
  
  // Handle settings button click
  const handleCogClick = () => {
    // Placeholder for settings functionality
  }
  
  // Main navigation bar layout with all interactive elements
  return (
    <div className="flex items-center fixed top-0 left-0 w-full h-16 bg-emerald-700 text-white shadow-md z-50">
      {/* Logo/Home button with leaf icon */}
      <div className="pl-5 h-full flex items-center">
        <div 
          className="cursor-pointer flex items-center font-bold text-xl rounded-lg px-4 py-2 bg-emerald-800 hover:bg-emerald-900 transition-colors"
          onClick={handleReuseClick}>
          <RecycleIcon className="mr-2 h-5 w-5" />
          <span>ReuseU</span>
        </div>
      </div>
      
      {/* Search bar with rounded styling */}
      <div className="relative w-3/4 pl-5 flex-grow mx-4">
        <div className="relative flex items-center">
          <input
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-500"
            type="text"
            placeholder="Search for a listing..."
          />
          <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-emerald-600" />
        </div>
      </div>
      
      {/* Create listing button with green styling */}
      <div className="px-2 h-full flex items-center">
        <button
          className="flex items-center justify-center bg-emerald-800 hover:bg-emerald-900 text-white rounded-full p-2 transition-colors"
          onClick={handleMakeAListingClick}
          title="Create New Listing">
          <PlusCircleIcon className="h-8 w-8" />
        </button>
      </div>
      
      {/* Profile button with hover effect */}
      <div className="px-2 h-full flex items-center">
        <button
          className="flex items-center justify-center hover:bg-emerald-800 rounded-full p-2 transition-colors"
          onClick={handleUserCircleClick}
          title="Profile">
          <UserCircleIcon className="h-8 w-8" />
        </button>
      </div>
      
      {/* Settings button with hover effect */}
      <div className="px-5 h-full flex items-center">
        <button
          className="flex items-center justify-center hover:bg-emerald-800 rounded-full p-2 transition-colors"
          onClick={handleCogClick}
          title="Settings">
          <Cog8ToothIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}