import React from "react";
import { getCabins } from "../_lib/data-service.js"; // import { getCabins } from "../_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";

const CabinList = async ({ filter }) => {
  const cabins = await getCabins();
  if (!cabins || cabins.length === 0) {
    return null;
  }
  let displayedCabins;
  if (filter == "all") {
    displayedCabins = cabins;
  } else if (filter == "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 3);
  } else if (filter == "medium") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 4);
  } else if (filter == "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
