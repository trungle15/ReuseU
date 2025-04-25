/**
 * GlobalContext
 * 
 * This context provides global state management for the ReuseU application.
 * It handles authentication, user state, and application-level state like filters and listings.
 * 
 * Usage:
 * 1. Wrap your app with GlobalProvider in _app.tsx
 * 2. Use the useGlobalContext hook in any component to access the global state
 * 
 * Example:
 * ```tsx
 * import { useGlobalContext } from '@/Context/GlobalContext';
 * 
 * function MyComponent() {
 *   const { user, loading, error, filters, setFilters } = useGlobalContext();
 *   
 *   // Use the context values
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   
 *   return (
 *     <div>
 *       <h1>Welcome, {user?.email}</h1>
 *       <button onClick={() => setFilters({ categories: [], priceRanges: [] })}>
 *         Clear Filters
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 * 
 * Available State:
 * - user: Firebase User object or null
 * - loading: boolean indicating if auth state is loading
 * - error: string | null for any auth errors
 * - filters: object containing category and price range filters
 * - setFilters: function to update filters
 * - title: string for current page title
 * - setTitle: function to update title
 * - listings: array of all listings
 * - setListings: function to update listings
 * 
 * Available Methods:
 * - signInWithEmail(email: string, password: string): Promise<void>
 * - signUpWithEmail(email: string, password: string): Promise<void>
 * - logout(): Promise<void>
 * 
 * Filter Structure:
 * ```typescript
 * interface Filters {
 *   categories: string[];  // Array of selected category names
 *   priceRanges: string[]; // Array of selected price range labels
 * }
 * ```
 * 
 * Price Range Labels:
 * - "Under $10"
 * - "$10 - $50"
 * - "$50 - $100"
 * - "$100 - $500"
 * - "Above $500"
 * 
 * Category Structure:
 * Categories are organized in groups with subcategories:
 * - Electronics: Laptops, Phones, Tablets, TVs
 * - Furniture: Tables, Chairs, Desks, Beds, Storage
 * - Clothing: Tops, Bottoms, Dresses, Shirts
 * - Home & Kitchen: Appliances, Cookware, Dinnerware, Utensils
 * - Arts & Crafts: Art, Crafts, Books
 * - Other: Other
 * 
 * Notes:
 * - All auth methods require .edu email addresses
 * - Filters are used in ListingsHomepage for filtering listings
 * - Listings state is managed globally to avoid refetching
 * - Title state is used for page titles and navigation
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface GlobalContextType {
  // Authentication
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({});
  const [title, setTitle] = useState<string>('');
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      if (!email.endsWith('.edu')) {
        throw new Error('Please use a .edu email address');
      }
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        loading,
        error,
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
