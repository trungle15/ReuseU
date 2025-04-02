import Listing from "./Listing"
import { Dropdown } from "../Dropdown/Dropdown"

const SAMPLE_LISTINGS = [
  {
    title: "Air Force 1s",
    price: 20.00,
    tags: ["Clothing", "Shoes"],
    desc: "These are cool!",
    image: ""
  },
  {
    title: "Dell Laptop",
    price: 200.00,
    tags: ["Electronic", "Device"],
    desc: "Super fast, 5 years old...",
    image: ""
  },
  {
    title: "Chess Set",
    price: 50.00,
    tags: ["Furniture", "New"],
    desc: "Made of wood!",
    image: ""
  },
  {
    title: "Pet Rock",
    price: 1.69,
    tags: ["Furniture"],
    desc: "",
    image: ""
  }
];

export default function ListingsHomepage() {
  return (
    <div className="min-h-screen pt-6">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 shrink-0 pl-2">
          <div className="sticky top-24 bg-white rounded-lg shadow-sm h-[calc(100vh-8rem)]">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold text-center">Filters</h2>
            </div>
            <div className="p-4 h-full">
              <Dropdown />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 py-2 pr-4 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {SAMPLE_LISTINGS.map((listing, index) => (
              <Listing
                key={index}
                title={listing.title}
                price={listing.price}
                tags={listing.tags}
                desc={listing.desc}
                image={listing.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}