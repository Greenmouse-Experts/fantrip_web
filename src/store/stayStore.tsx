import { StayItemInput } from "@/lib/contracts/stay";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
  stay: StayItemInput;
  saveStay: (data: StayItemInput) => void;
  clearStay: () => void;
}
const stayInitState = {
  name: "",
  property: "",
  address: "",
  state: "",
  description: "",
  subHead: "",
  highlightFeature: "",
  price: 0,
  amenities: [],
  uniqueFeature: "",
  photos: [],
  specialOffers: [],
  percentageOff: 0,
  availableFrom: "",
  availableTo: "",
  maxNights: 0,
  currency: "€",
  maxGuests: 5,
  city: "",
  street: "",
  country: "",
  postal: "",
  suite: "",
};
const useStayStore = create<Props>()(
  persist(
    (set) => ({
      stay: stayInitState,
      saveStay: (data: StayItemInput) =>
        set(() => ({
          stay: data,
        })),
      clearStay: () =>
        set(() => ({
          stay: stayInitState,
        })),
    }),
    {
      name: "fantrip_stay",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStayStore;
