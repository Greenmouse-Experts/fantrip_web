import { ChatUserItem } from "@/lib/contracts/chat";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
  host: ChatUserItem;
  guest: ChatUserItem;
  saveGuestChat: (data: ChatUserItem) => void;
  saveHostChat: (data: ChatUserItem) => void;
  clearHost: () => void;
  clearGuest: () => void;
}
const chatInitState = {
  host: {
    page: 1,
    activeId: "",
    user: {
      firstName: "",
      lastName: "",
      nickname: "",
      verifiedAsHost: false,
      role: "",
      picture: "",
      id: "",
    },
    chats: [],
  },
  guest: {
    page: 1,
    activeId: "",
    user: {
      firstName: "",
      lastName: "",
      nickname: "",
      verifiedAsHost: false,
      role: "",
      picture: "",
      id: "",
    },
    chats: [],
  },
};
const useChatStore = create<Props>()(
  persist(
    (set) => ({
      host: chatInitState.host,
      guest: chatInitState.guest,
      saveGuestChat: (data: ChatUserItem) =>
        set(() => ({
          guest: data,
        })),
      saveHostChat: (data: ChatUserItem) =>
        set(() => ({
          host: data,
        })),
      clearGuest: () =>
        set(() => ({
          guest: chatInitState.guest,
        })),
      clearHost: () =>
        set(() => ({
          host: chatInitState.host,
        })),
    }),
    {
      name: "fantrip_chat",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useChatStore;
