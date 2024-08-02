import { FetchStayParamItem } from "@/lib/contracts/utils";
import useUtilsStore from "@/store/utilStore";

export function useUtils() {
  const utils = useUtilsStore((state) => state.utils);
  const stayParams = utils.fetchStay;
  const saveUtils = useUtilsStore((state) => state.saveUtils);
  const stayChatModal = utils.stayModal

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
        address: ""
      }
    })
  }
  const toggleStayChatmodal = (val:boolean) => {
    saveUtils({
      ...utils,
     stayModal: val
    })
  }
  return {
    stayParams,
    utils,
    saveStayParam,
    resetParams,
    stayChatModal,
    toggleStayChatmodal
  };
}
