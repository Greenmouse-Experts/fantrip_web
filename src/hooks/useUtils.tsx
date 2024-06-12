import { FetchStayParamItem } from "@/lib/contracts/utils";
import useUtilsStore from "@/store/utilStore";

export function useUtils() {
  const utils = useUtilsStore((state) => state.utils);
  const stayParams = utils.fetchStay;
  const saveUtils = useUtilsStore((state) => state.saveUtils);

  const saveStayParam = (param: FetchStayParamItem) => {
    saveUtils({
      ...utils,
      fetchStay: { ...param },
    });
  };
  const resetParams = () => {
    saveUtils({
      ...utils,
      fetchStay: {
        property: "",
        name: "",
        state: "",
        guests: 1,
        city: "",
        checkIn: "",
        checkOut: "",
      }
    })
  }
  return {
    stayParams,
    utils,
    saveStayParam,
    resetParams,
  };
}
