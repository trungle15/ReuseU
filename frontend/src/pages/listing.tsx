/**
 * Listing Page Component
 * 
 * This page displays a single listing's details including title, price, description,
 * and images. It fetches the listing data based on the ID from the URL query parameters.
 * The page includes error handling and loading states, and renders the FullListing component
 * to display the listing information.
 */

import Dashboard from "@/components/Dashboard";
import FullListing from "@/components/Listings/FullListing";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { listingsApi } from "./api/listings";

export default function Listing() {
    // Get listing ID from URL query parameters
    const router = useRouter();
    const { id } = router.query;
    const [listing, setListing] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch listing data when component mounts or ID changes
    useEffect(() => {
        const fetchListing = async () => {
            if (!id) return;
            
            try {
                setIsLoading(true);
                const data = await listingsApi.getById(id as string);
                console.log(data);
                setListing(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch listing');
                console.error('Error fetching listing:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    // Loading state display
    if (isLoading) {
        return (
            <div>
                <Dashboard />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl">Loading...</div>
                </div>
            </div>
        );
    }

    // Error state display
    if (error) {
        return (
            <div>
                <Dashboard />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl text-red-500">Error: {error}</div>
                </div>
            </div>
        );
    }

    // No listing found state
    if (!listing) {
        return (
            <div>
                <Dashboard />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl">Listing not found</div>
                </div>
            </div>
        );
    }

    // Main listing display with all details
    return (
        <div>
            <Dashboard />
            <FullListing 
                title={listing.Title}
                price={parseFloat(listing.Price)}
                tags={listing.Category}
                desc={listing.Description}
                image={listing.Images?.[0] || ""}
                sellerId={listing.UserID}
            />
        </div>
    );
}

