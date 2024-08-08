import { ChatUserItem } from "@/lib/contracts/chat";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
  host: ChatUserItem;
  guest: ChatUserItem;
  mini: ChatUserItem;
  saveMiniChat: (data: ChatUserItem) => void;
  saveGuestChat: (data: ChatUserItem) => void;
  saveHostChat: (data: ChatUserItem) => void;
  clearHost: () => void;
  clearGuest: () => void;
  clearMini: () => void;
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
  mini: {
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
      mini: chatInitState.mini,
      saveGuestChat: (data: ChatUserItem) =>
        set(() => ({
          guest: data,
        })),
      saveHostChat: (data: ChatUserItem) =>
        set(() => ({
          host: data,
        })),
      saveMiniChat: (data: ChatUserItem) =>
        set(() => ({
          mini: data,
        })),
      clearGuest: () =>
        set(() => ({
          guest: chatInitState.guest,
        })),
      clearHost: () =>
        set(() => ({
          host: chatInitState.host,
        })),
      clearMini: () =>
        set(() => ({
          mini: chatInitState.host,
        })),
    }),
    {
      name: "fantrip_chat",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useChatStore;
