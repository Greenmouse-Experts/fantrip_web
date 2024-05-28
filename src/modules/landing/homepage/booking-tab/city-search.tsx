import { IoSearch } from "react-icons/io5";
import { usePlacesWidget } from "react-google-autocomplete";
import { GOOGLE_MAP_KEY } from "@/services/constant";

const CitySearch = () => {
  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_MAP_KEY,
    onPlaceSelected: (place) => {
      console.log(place);
    },
  });
  return (
    <div className="relative">
      <div className="flex gap-x-2 items-center relative top-4 lg:top-0">
        <IoSearch className="text-xl" />
        <input
          type="text"
          ref={ref as any}
          className="w-full lg:w-auto outline-none p-2 placeholder:text-black"
          placeholder="Enter city or region"
        />
      </div>
    </div>
  );
};

export default CitySearch;
