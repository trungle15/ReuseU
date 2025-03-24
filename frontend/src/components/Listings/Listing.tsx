import { useState } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

interface ListingProps {
  title: string;
  price: number;
  tags: string[];
}

export default function Listing({ title, price, tags }: ListingProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="h-[20vh] w-full shadow-md p-4 bg-white rounded-lg relative">
      {/* Title (Top Middle) */}
      <div className="text-center mb-2">
        <h2 className="text-2xl font-semibold truncate">{title}</h2>
      </div>

      {/* Tags (Below Title) */}
      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {tags?.map((tag) => (
          <span 
            key={tag} 
            className="px-2 py-1 bg-gray-100 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Price (Top Right) */}
      <div className="absolute top-4 right-4 text-xl font-bold text-green-600">
        ${price?.toFixed(2)}
      </div>

      {/* Image + Description */}
      <div className="flex h-full min-h-0 items-stretch">
        <div className="w-1/4 h-full bg-gray-200 rounded-lg ">
          {/* Image Placeholder */}
        </div>
        <div className="w-3/4 pl-4">
          <div className="text-lg line-clamp-2">
            {/* Description would go here */}
          </div>
        </div>
      </div>

      {/* Heart Icon (Bottom Right) */}
      <button
        onClick={() => setIsFavorited(!isFavorited)}
        className="absolute bottom-4 right-4 p-1"
      >
        {isFavorited ? (
          <HeartSolid className="h-6 w-6 text-red-500" />
        ) : (
          <HeartOutline className="h-6 w-6 text-gray-400" />
        )}
      </button>
    </div>
  );
}