import { useState } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/16/solid";

interface ListingProps {
  title: string;
  price: number;
  tags: string[];
}

export default function Listing({ title, price, tags }: ListingProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const onFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  }

  return (
    //overall listing holder
    <div className="h-56 flex flex-row items-center justify-start text-center p-4 border rounded-lg gap-5">
      <div className="h-full w-2/9 bg-gray-300 rounded-lg">
        {/*image goes here*/}
      </div>
      <div className="h-full w-5/9 flex flex-col bg-gray-400 rounded-lg gap-[1vh] justify-center">
        <div className ="h-1/8 bg-green-500 rounded-lg">
          <h3 className="font-bold">Title</h3>
        </div>
        <div className ="h-1/4 bg-green-600 rounded-lg">
          <text className="self-start ml-[1vh]">
            This is where my tags will go
          </text>
        </div>
        <div className ="h-1/2 bg-green-700 rounded-lg">
        <text className="self-start ml-[1vh]">
            Bruh stinky stinky stinky bruh bruh stinky stinky stinky bruh bruh stink
          </text>
        </div>
      </div>
        
      <div className="h-full w-2/9 bg-gray-500 rounded-lg flex flex-col rounded-lg justify-between">
        <div className="">
          $19.99
        </div>
        {isFavorited && <HeartOutline onClick={onFavoriteClick} className="cursor-pointer h-1/4 -mr-[12vh]"></HeartOutline>}
        {!isFavorited && <HeartSolid onClick={onFavoriteClick} className="cursor-pointer h-1/4 -mr-[12vh] "></HeartSolid>}
      </div>
    </div>
  );
}