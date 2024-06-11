import { IoSearch } from "react-icons/io5";
import { usePlacesWidget } from "react-google-autocomplete";
import { GOOGLE_MAP_KEY } from "@/services/constant";
import { FC, useState } from "react";
import { getStateFromGoogle } from "@/lib/utils/helper-function";

interface Props{
  handleChange: (val: any, field: string) => void;
  prevValue: string
}
const CitySearch:FC<Props> = ({handleChange, prevValue}) => {
  const [val, setVal] = useState(prevValue)
  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_MAP_KEY,
    onPlaceSelected: (place) => {
      handleChange(getStateFromGoogle(place.address_components), 'state')
    },
  });
  return (
    <div className="relative">
      <div className="flex gap-x-2 items-center relative top-4 lg:top-0">
        <IoSearch className="text-xl" />
        <input
          type="text"
          ref={ref as any}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full lg:w-auto outline-none p-2 placeholder:text-black"
          placeholder="Enter city or region"
        />
      </div>
    </div>
  );
};

export default CitySearch;
