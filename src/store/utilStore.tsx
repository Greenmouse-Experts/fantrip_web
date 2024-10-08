import { UtilsStoreItem } from "@/lib/contracts/utils";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface Props {
  utils: UtilsStoreItem;
  saveUtils: (data: UtilsStoreItem) => void;
  clearUtils: () => void;
}
const utilsInitState = {
  fetchStay: {
    property: "",
    name: "",
    state: "",
    guests: 1,
    city: "",
    checkIn: "",
    checkOut: "",
    address: ""
  },
  guestReserveTab: 0,
  guestBookTab: 0,
  stayModal: false,
  chatActiveModal: null
};
const useUtilsStore = create<Props>()(
  persist(
    (set) => ({
      utils: utilsInitState,
      saveUtils: (data: UtilsStoreItem) =>
        set(() => ({
          utils: data,
        })),
      clearUtils: () =>
        set(() => ({
            utils: utilsInitState,
        })),
    }),
    {
      name: "fantrip_utils",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUtilsStore;
