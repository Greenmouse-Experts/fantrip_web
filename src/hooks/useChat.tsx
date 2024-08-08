import { UserChatInfo } from "@/lib/contracts/chat";
import useChatStore from "@/store/chatStore";

export function useChat() {
  const guest = useChatStore((state) => state.guest);
  const host = useChatStore((state) => state.host);
  const mini = useChatStore((state) => state.mini);
  const saveGuest = useChatStore((state) => state.saveGuestChat);
  const saveHost = useChatStore((state) => state.saveHostChat);
  const saveMini = useChatStore((state) => state.saveMiniChat);
  const clearHost = useChatStore((state) => state.clearHost);
  const clearGuest = useChatStore((state) => state.clearGuest);
  const clearMini = useChatStore((state) => state.clearMini);

  const guestInfo = guest.user;
  const guestId = guest.activeId;
  const chatWithGuest = guest.chats;
  const chatWithGuestPage = guest.page;

  const saveGuestInfo = (item: UserChatInfo, id: string) => {
    saveGuest({
      ...guest,
      activeId: id,
      user: item,
      chats: []
    });
  };

  const saveChatWithGuest = (chat: any) => {
    saveGuest({
      ...guest,
      chats: chat,
    });
  };

  const clearChatWithGuest = () => {
    saveGuest({
      ...guest,
      chats: [],
    });
  };

  const hostInfo = host.user;
  const hostId = host.activeId;
  const chatWithHostPage = host.page;
  const chatWithHost = host.chats;

  const saveHostInfo = (item: UserChatInfo) => {
    saveHost({
      ...host,
      activeId: item.id,
      user: item,
      chats: []
    });
  };

  const saveChatWithHost = (chat: any) => {
    saveHost({
      ...host,
      chats: chat,
    });
  };

  const clearChatWithHost = () => {
    saveHost({
      ...host,
      chats: [],
    });
  };

  const miniInfo = mini.user;
  const miniId = mini.activeId;
  const chatWithMiniPage = mini.page;
  const chatWithMini = mini.chats;

  const saveMiniInfo = (item: UserChatInfo) => {
    saveMini({
      ...mini,
      activeId: item.id,
      user: item,
      chats: []
    });
  };

  const saveChatWithMini = (chat: any) => {
    saveMini({
      ...mini,
      chats: chat,
    });
  };

  const clearChatWithMini = () => {
    saveMini({
      ...mini,
      chats: [],
    });
  };

  return {
    guestId,
    guestInfo,
    chatWithGuest,
    chatWithGuestPage,
    saveGuestInfo,
    saveChatWithGuest,
    clearChatWithGuest,
    clearGuest,
    hostInfo,
    hostId,
    chatWithHost,
    chatWithHostPage,
    saveHostInfo,
    saveChatWithHost,
    clearChatWithHost,
    clearHost,
    miniInfo,
    miniId,
    chatWithMini,
    chatWithMiniPage,
    saveMiniInfo,
    saveChatWithMini,
    clearChatWithMini,
    clearMini
  };
}
