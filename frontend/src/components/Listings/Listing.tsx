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
      <div className="h-full w-2/9 border-2 border-double rounded-lg">
        {/*image goes here*/}
      </div>
      <div className="h-full w-5/9 flex flex-col border-2 border-dotted rounded-lg gap-[1vh] justify-center">
        <div className ="h-1/8 border-2 border-double rounded-lg">
          <h3 className="font-bold">Title</h3>
        </div>
        <div className ="h-1/4 border-2 border-doublerounded-lg">
          <span className="self-start ml-[1vh]">
            This is where my tags will go
          </span>
        </div>
        <div className ="h-1/2 border-2 border-double rounded-lg">
        <span className="self-start ml-[1vh]">
            Bruh stinky stinky stinky bruh bruh stinky stinky stinky bruh bruh stink
          </span>
        </div>
      </div>
        
      <div className="h-full w-2/9 rounded-lg flex flex-col rounded-lg justify-between border-2 border-double">
        <div className="">
          $19.99
        </div>
        {isFavorited && <HeartOutline onClick={onFavoriteClick} className="cursor-pointer h-1/4 -mr-[12vh] fill-white"></HeartOutline>}
        {!isFavorited && <HeartSolid onClick={onFavoriteClick} className="cursor-pointer h-1/4 -mr-[12vh] fill-red-500"></HeartSolid>}
      </div>
    </div>
  );
}