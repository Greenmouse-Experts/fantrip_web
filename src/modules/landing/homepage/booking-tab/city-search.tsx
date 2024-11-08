/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { usePlacesWidget } from "react-google-autocomplete";
import { GOOGLE_MAP_KEY } from "@/services/constant";
import {
  getCityFromGoogle,
  getStateFromGoogle,
} from "@/lib/utils/helper-function";
import { useUtils } from "@/hooks/useUtils";

interface Props {
  handleChange: (val: any, field: string) => void;
  initVal: string;
  setInitValue: React.Dispatch<React.SetStateAction<string>>;
}
const CitySearch: FC<Props> = ({initVal, setInitValue}) => {
  const { stayParams, saveStayParam } = useUtils();

  useEffect(() => {
    setInitValue(stayParams.address);
  }, [stayParams]);
  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_MAP_KEY,
    options: {
      types: ['(cities)'],
    },
    onPlaceSelected: (place) => {
      const state = getStateFromGoogle(place.address_components);
      const city = getCityFromGoogle(place.address_components);
      const address = place.formatted_address;
      saveStayParam({
        ...stayParams,
        state: state,
        city: city,
        address: address,
      });
    },
  });
  return (
    <div className="relative lg:overflow-hidden ">
      <div className="flex gap-x-2 items-center relative top-4 md:top-0 lg:top-0 md:border-none border-b border-gray-500">
        <IoSearch className="text-xl shrink-0" />
        <input
          type="text"
          ref={ref as any}
          value={initVal}
          onChange={(e) => setInitValue(e.target.value)}
          className="w-full lg:w-auto outline-none p-2 !text-black placeholder:text-black dark:!bg-white"
          placeholder="Enter city or region"
        />
      </div>
    </div>
  );
};

export default CitySearch;
