import { ChatItem, UserChatInfo } from "@/lib/contracts/chat";
import useChatStore from "@/store/chatStore";


export function useChat() {
  const guest = useChatStore((state) => state.guest);
  const host = useChatStore((state) => state.host);
  const saveGuest = useChatStore((state) => state.saveGuestChat);
  const saveHost = useChatStore((state) => state.saveHostChat);

  const guestInfo = guest.user
  const guestId = guest.activeId
  const chatWithGuest = guest.chats

  const saveGuestInfo = (item:UserChatInfo, id:string) => {
    saveGuest({
        ...guest,
        activeId: id,
        user: item,
    })
  }

  const saveChatWithGuest = (chat:any) => {
    saveGuest({
        ...guest,
       chats: chat
    })
  }

  const hostInfo = host.user
  const hostId = host.activeId
  const chatWithHostPage = host.page
  const chatWithHost = host.chats

  const saveHostInfo = (item:UserChatInfo) => {
    saveHost({
        ...host,
        activeId: item.id,
        user: item,
    })
  }
  
  return {
    guestId,
    guestInfo,
    chatWithGuest,
    saveGuestInfo,
    saveChatWithGuest,
    hostInfo,
    hostId,
    chatWithHost,
    chatWithHostPage,
    saveHostInfo
  };
}
