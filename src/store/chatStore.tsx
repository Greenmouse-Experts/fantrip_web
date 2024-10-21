import {
  ChatHistoryItem,
  ChatUserItem,
  CommunityItem,
} from "@/lib/contracts/chat";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
  host: ChatUserItem;
  guest: ChatUserItem;
  mini: ChatUserItem;
  community: CommunityItem;
  history: ChatHistoryItem[];
  saveMiniChat: (data: ChatUserItem) => void;
  saveGuestChat: (data: ChatUserItem) => void;
  saveHostChat: (data: ChatUserItem) => void;
  saveCommunity: (data: CommunityItem) => void;
  saveHistory: (data: ChatHistoryItem[]) => void;
  clearHost: () => void;
  clearGuest: () => void;
  clearMini: () => void;
  clearCommunity: () => void;
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
  community: {
    communities: [],
    activeId: "all",
    name: "all",
  },
  history: [],
};
const useChatStore = create<Props>()(
  persist(
    (set) => ({
      host: chatInitState.host,
      guest: chatInitState.guest,
      mini: chatInitState.mini,
      community: chatInitState.community,
      history: chatInitState.history,
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
      saveCommunity: (data: CommunityItem) =>
        set(() => ({
          community: data,
        })),
      saveHistory: (data: ChatHistoryItem[]) =>
        set(() => ({
          history: data,
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
      clearCommunity: () =>
        set(() => ({
          community: chatInitState.community,
        })),
      clearHistory: () =>
        set(() => ({
          history: chatInitState.history,
        })),
    }),
    {
      name: "fantrip_chat",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useChatStore;
