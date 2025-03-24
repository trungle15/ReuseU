import Listing from "./Listing"


export default function ListingsHomepage() {
    return (
      <div className="w-11/12 mx-auto mt-10 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Listing title={"Deadbeat Father"} price={399} tags={["used"]}/>
          <Listing title={"Deadbeat Father"} price={399} tags={["used"]}/>
          <Listing title={"Deadbeat Father"} price={399} tags={["used"]}/>
        </div>
      </div>
    );
  }