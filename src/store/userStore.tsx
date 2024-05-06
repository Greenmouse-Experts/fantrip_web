import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
  user: userProps;
  saveUser: (data: userProps) => void;
  clearUser: () => void;
  kyc: kycProps;
  saveKyc: (data: kycProps) => void;
  clearKyc: () => void;
}
interface userProps {
  name: string;
  email: string;
  token: string;
  image: string;
  address: string;
  phone: string;
  id: string;
  account: string[];
  joined: string;
  bio: string;
  country: string;
  state: string;
  city: string;
}
export interface kycProps {
  fullName: string;
  picture: string;
  roomPicture: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  bio: string;
  governmentID: string;
}
const kycInitState = {
  fullName: "",
  picture: "",
  roomPicture: "",
  facebookUrl: "",
  twitterUrl: "",
  linkedinUrl: "",
  instagramUrl: "",
  bio: "",
  governmentID: "",
};
const userInitState = {
  name: "",
  email: "",
  token: "",
  image: "",
  address: "",
  account: [],
  phone: "",
  id: "",
  joined: "",
  bio: "",
  country: "",
  state: "",
  city: "",
};
const useAuthStore = create<Props>()(
  persist(
    (set) => ({
      user: userInitState,
      kyc: kycInitState,
      saveUser: (data: userProps) =>
        set(() => ({
          user: data,
        })),
      saveKyc: (data: kycProps) =>
        set(() => ({
          kyc: data,
        })),
      clearUser: () =>
        set(() => ({
          user: userInitState,
        })),
      clearKyc: () =>
        set(() => ({
          kyc: kycInitState,
        })),
    }),
    {
      name: "fantrip_user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
