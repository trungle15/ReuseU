/**
 * Listings Homepage Component
 * 
 * This is the main listings page that displays all available items for reuse.
 * Features include:
 * - Grid display of listings with images, titles, prices, and descriptions
 * - Filter sidebar with category and price range filters
 * - "Show My Listings" toggle to view only user's own listings
 * - Load More functionality
 * - Responsive grid layout
 * 
 * Updated with recycling/green theme
 */

import Listing from "./Listing"
import { Dropdown } from "../Dropdown/Dropdown"
import { useGlobalContext } from "@/Context/GlobalContext"
import { useEffect, useState } from "react"
import { listingsApi, Listing as ListingType } from "@/pages/api/listings";
import { LeafIcon, FilterIcon, UserIcon } from "lucide-react";

// Price range options for filtering
interface PriceRange {
  min: number;
  max: number;
  label: string;
}

const priceRanges: PriceRange[] = [
  { min: 0, max: 10, label: "Under $10" },
  { min: 10, max: 50, label: "$10 - $50" },
  { min: 50, max: 100, label: "$50 - $100" },
  { min: 100, max: 500, label: "$100 - $500" },
  { min: 500, max: Infinity, label: "Above $500" }
];

export default function ListingsHomepage() {
  const { filters, setListings, listings, user, setFilters } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedListings, setDisplayedListings] = useState<ListingType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMyListings, setShowMyListings] = useState(false);
  const itemsPerPage = 25;
  const currentUserId = user?.uid;

  // Fetch all listings on component mount
  useEffect(() => {
    let isMounted = true; // guard against setting state after unmount
  
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const token = user ? await user.getIdToken() : undefined;
        const data = await listingsApi.getAll(token);
        console.log(data);
  
        if (!isMounted) return;
  
        if (Array.isArray(data)) {
          setListings(data);
          setDisplayedListings(data.slice(0, itemsPerPage));
        } else {
          setListings([]);
          setDisplayedListings([]);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch listings');
          console.error('Error fetching listings:', err);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchListings();
  
    return () => {
      isMounted = false; // cleanup on unmount
    };
  }, [user, setListings]);

  // Load more listings when "Load More" button is clicked
  const loadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * itemsPerPage;
    const newListings = listings.slice(startIndex, endIndex);
    setDisplayedListings(newListings);
    setCurrentPage(nextPage);
  };

  // Filter listings based on selected filters and "Show My Listings" toggle
  const filteredListings = (showMyListings ? listings : displayedListings).filter((listing: ListingType) => {
    // First filter by user if showMyListings is true
    if (showMyListings) {
      if (String(listing.UserID) !== String(currentUserId)) {
        return false;
      }
    }

    // Then apply category and price filters
    if (!filters || Object.keys(filters).length === 0) return true;

    // Check category filter
    const hasMatchingCategory = filters.categories?.length === 0 ? true :
      listing.Category.some((category: string | null) => 
        category && filters.categories?.includes(category)
      );

    // Check price range filter
    const hasMatchingPriceRange = filters.priceRanges?.length === 0 ? true :
      priceRanges.some((range) => {
        if (filters.priceRanges?.includes(range.label)) {
          return parseFloat(listing.Price) >= range.min && parseFloat(listing.Price) < range.max;
        }
        return false;
      });

    // If both filters are active, both must match
    if (filters.categories?.length > 0 && filters.priceRanges?.length > 0) {
      return hasMatchingCategory && hasMatchingPriceRange;
    }

    // If only one filter is active, that one must match
    return hasMatchingCategory || hasMatchingPriceRange;
  });

  // Only show load more button if we're not showing my listings and there are more listings to show
  const showLoadMore = !showMyListings && displayedListings.length < (listings?.length || 0);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center bg-emerald-50">
        <div className="flex flex-col items-center text-emerald-700">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-700"></div>
          <p className="mt-4 font-medium">Loading listings...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center bg-emerald-50">
        <div className="bg-white p-6 rounded-lg shadow-md text-red-500 max-w-md text-center">
          <p className="text-xl font-medium">Error</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  // No listings found state
  if (filteredListings.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-emerald-50">
        <div className="flex gap-8 max-w-7xl mx-auto px-4">
          {/* Filter sidebar */}
          <div className="w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-lg shadow-sm overflow-hidden border border-emerald-100">
              <div className="p-4 border-b bg-emerald-700 text-white">
                <h2 className="text-xl font-semibold text-center flex items-center justify-center">
                  <FilterIcon className="w-5 h-5 mr-2" />
                  Filters
                </h2>
              </div>
              <div className="p-4 h-full">
                <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showMyListings}
                      onChange={() => setShowMyListings(!showMyListings)}
                      className="form-checkbox h-5 w-5 text-emerald-600 rounded"
                    />
                    <span className="text-gray-700 font-medium flex items-center">
                      <UserIcon className="w-4 h-4 mr-1" />
                      Show My Listings
                    </span>
                  </label>
                </div>
                <Dropdown />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No listings found matching your filters</p>
              <button 
                onClick={() => setFilters({ categories: [], priceRanges: [] })}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-emerald-50">
      <div className="flex gap-8 max-w-7xl mx-auto px-4">
        {/* Filter sidebar */}
        <div className="w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-lg shadow-sm overflow-hidden border border-emerald-100">
            <div className="p-4 border-b bg-emerald-700 text-white">
              <h2 className="text-xl font-semibold text-center flex items-center justify-center">
                <FilterIcon className="w-5 h-5 mr-2" />
                Filters
              </h2>
            </div>
            <div className="p-4 h-full">
              <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMyListings}
                    onChange={() => setShowMyListings(!showMyListings)}
                    className="form-checkbox h-5 w-5 text-emerald-600 rounded"
                  />
                  <span className="text-gray-700 font-medium flex items-center">
                    <UserIcon className="w-4 h-4 mr-1" />
                    Show My Listings
                  </span>
                </label>
              </div>
              <Dropdown />
            </div>
          </div>
        </div>

        {/* Listings grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredListings.map((listing) => (
              <Listing
                key={listing.ListingID}
                title={listing.Title}
                price={parseFloat(listing.Price)}
                tags={listing.Category}
                desc={listing.Description}
                image={listing.Images?.[0]}
                ListingID={listing.ListingID}
                UserID={listing.UserID}
              />
            ))}
          </div>

          {/* Load More button */}
          {showLoadMore && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}