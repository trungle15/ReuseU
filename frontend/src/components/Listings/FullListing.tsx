import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";

export interface FullListingProps {
  title: string;
  price: number;
  tags: string[];
  desc: string;
  image: string;
  sellerId: string;
}

export default function FullListing({ title, price, tags, desc, image, sellerId }: FullListingProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex items-start max-w-7xl mx-auto p-4 mt-10">
      {/* Back Button on the Left */}
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 h-fit cursor-pointer"
        onClick={handleBackClick}
      >
        Back
      </button>
    
      {/* Main Container */}
      <div className="flex-1">
        {/* Top Content: Image + Text Side by Side */}
        <div className="flex">
          {/* Left Half - Image */}
          <div className="w-1/2">
            <img
              src={image}
              alt={title}
              className="w-full rounded-md"
            />
            <div className="flex justify-between mt-2">
              <ChevronLeftIcon className="w-10 h-10" />
              <ChevronRightIcon className="w-10 h-10"/>
            </div>
          </div>
    
          {/* Right Half - Title, Price, Desc */}
          <div className="w-1/2 pl-4 flex flex-col justify-start">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-lg mt-2">${price.toFixed(2)}</p>
            <p className="mt-4">{desc}</p>
          </div>
        </div>
    
        {/* Bottom Centered Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Message Seller
          </button>
        </div>
      </div>
    </div>
  );
}