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
  return {
    stayParams,
    utils,
    saveStayParam,
  };
}
