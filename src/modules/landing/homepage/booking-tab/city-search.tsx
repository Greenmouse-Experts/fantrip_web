import { IoSearch } from "react-icons/io5";
import { usePlacesWidget } from "react-google-autocomplete";
import { GOOGLE_MAP_KEY } from "@/services/constant";
import { FC, useEffect, useState } from "react";
import {
  getCityFromGoogle,
  getStateFromGoogle,
} from "@/lib/utils/helper-function";
import { useUtils } from "@/hooks/useUtils";

interface Props {
  handleChange: (val: any, field: string) => void;
}
const CitySearch: FC<Props> = ({}) => {
  const { stayParams, saveStayParam } = useUtils();
  const [initVal, setInitValue] = useState(stayParams.address);

  useEffect(() => {
    setInitValue(stayParams.address);
  }, [stayParams]);
  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_MAP_KEY,
    options: {
      types: ["address"],
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
    <div className="relative lg:overflow-hidden">
      <div className="flex gap-x-2 items-center relative top-4 md:top-0 lg:top-0">
        <IoSearch className="text-xl" />
        <input
          type="text"
          ref={ref as any}
          value={initVal}
          onChange={(e) => setInitValue(e.target.value)}
          className="w-full lg:w-auto outline-none p-2 placeholder:text-black"
          placeholder="Enter city or region"
        />
      </div>
    </div>
  );
};

export default CitySearch;
