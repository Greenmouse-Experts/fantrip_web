import { BankAccountFullItem } from "@/lib/contracts/routine";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
  user: userProps;
  saveUser: (data: userProps) => void;
  clearUser: () => void;
  kyc: kycProps;
  account: BankAccountFullItem[];
  saveAccounts: (data: BankAccountFullItem[]) => void;
  saveKyc: (data: kycProps) => void;
  clearKyc: () => void;
  clearAccount: () => void;
}
interface userProps {
  name: string;
  email: string;
  token: string;
  image: string;
  address: string;
  phone: string;
  id: string;
  account: string;
  joined: string;
  bio: string;
  country: string;
  state: string;
  city: string;
  nickname: string;
  isNickname: boolean;
  dob:string;
  isVerified: boolean;
}
export interface accountProps {
  accounts: BankAccountFullItem[];
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
  dob: string;
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
  dob: ""
};
const userInitState = {
  name: "",
  email: "",
  token: "",
  image: "",
  address: "",
  account: "",
  phone: "",
  id: "",
  joined: "",
  bio: "",
  country: "",
  state: "",
  city: "",
  nickname: "",
  isNickname: false,
  isVerified: false,
  dob: ""
};
const accountsInitState = [] as BankAccountFullItem[];
const useAuthStore = create<Props>()(
  persist(
    (set) => ({
      user: userInitState,
      kyc: kycInitState,
      account: accountsInitState,
      saveUser: (data: userProps) =>
        set(() => ({
          user: data,
        })),
      saveAccounts: (data: BankAccountFullItem[]) =>
        set(() => ({
          account: data,
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
      clearAccount: () =>
        set(() => ({
          account: accountsInitState,
        })),
    }),
    {
      name: "fantrip_user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
