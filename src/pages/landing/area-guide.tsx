import AreaCategorySearch from "@/modules/landing/area-guide/category-search";
import FanChoice from "@/modules/landing/area-guide/fan-choice";
import LocationSearchBox from "@/modules/landing/area-guide/location-search";
import TopDestination from "@/modules/landing/area-guide/top-destination";
import { getSearchPlaces } from "@/services/api/places-api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import debounce from "lodash.debounce";
import SportsBar from "@/modules/landing/area-guide/sports-bar";

export const AreaGuide = () => {
  const [searchInput, setSearchInput] = useState("");

  const debouncedHandleInputChange = debounce((value: string) => {
    setSearchInput(value);
  }, 500);

  const { isLoading: isGettingResult, data: searchResult } = useQuery({
    queryKey: ["find-category-places", searchInput],
    queryFn: () => getSearchPlaces(searchInput),
    enabled: !!searchInput,
  });

  return (
    <div className="bg-[#EDEDFF] dark:bg-darkColor">
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white ">
              Cheer hard, explore harder!
            </p>
          </div>
        </div>
      </div>
      <div className="py-12 lg:pt-0  lg:relative -top-10">
        <LocationSearchBox setSearchInput={debouncedHandleInputChange} />
      </div>
      <div className="dark:bg-darkColor">
        <AreaCategorySearch
          searchedResult={searchResult}
          isGettingResult={isGettingResult}
          searchInput={searchInput}
        />
      </div>
      <div className="bg-white dark:bg-darkColorLight">
        <SportsBar />
      </div>
      <div className="bg-white dark:bg-darkColorLight">
        <FanChoice />
      </div>
      <div className="bg-white dark:bg-darkColorLight">
        <TopDestination />
      </div>
    </div>
  );
};
