import { FC, useEffect, useMemo, useState } from "react";
import ChatListHistory from "./components/chat-list";
import { ChatHistoryItem } from "@/lib/contracts/chat";
import useAuth from "@/hooks/authUser";
import dayjs from "dayjs";
import { useChat } from "@/hooks/useChat";

interface Props {
  socket: any;
}
const RoomChatListIndex: FC<Props> = ({ socket }) => {
  const [prevChats, setPrevChats] = useState<ChatHistoryItem[]>([]);
  const { history, saveHistory } = useChat();
  const { token, userId } = useAuth();

  useEffect(() => {
    const fetchChats = () => {
      const payload = { token, page: 1 };
      socket.emit("retrieveChats", payload);
    };

    const onChatsRetrieved = (value: any) => {
      setPrevChats(value.data.result);
    };

    const onRecentChat = (value: any) => {
      const idToMatch = value.data.id;
      const updatedArray = history.map((item) => {
        if (item.id === idToMatch) {
          return {
            ...item,
            lastMessage: value.data.lastMessage,
            createdDate: value.data.createdDate,
            updatedDate: value.data.updatedDate,
            unread: 0,
          };
        }
        return item;
      });

      setPrevChats(updatedArray);
    };

    socket.on(`chatsRetrieved:${userId}`, onChatsRetrieved);
    socket.on(`recentChatRetrieved:${userId}`, onRecentChat);

    fetchChats();

    return () => {
      socket.off(`chatsRetrieved:${userId}`, onChatsRetrieved);
      socket.off(`recentChatRetrieved:${userId}`, onRecentChat);
    };
  }, [socket, userId]);

  const sortedChats = useMemo(() => {
    return prevChats?.length
      ? [...prevChats].sort(
          (a: ChatHistoryItem, b: ChatHistoryItem) =>
            dayjs(b.updatedDate).unix() - dayjs(a.updatedDate).unix()
        )
      : [];
  }, [prevChats]);

  useEffect(() => {
    saveHistory(sortedChats);
  }, [sortedChats, saveHistory]);

  return (
    <div className="h-full">
      <div className="bg-[#EDEDFF] dark:bg-darkColorLight lg:rounded-[12px] p-4 lg:mt-4 min-h-[400px] lg:h-full text-black dark:text-white">
        <div>
          <p className="lg:text-xl fw-500">Messages</p>
        </div>
        <div className="pt-5 lg:pt-1">
          <ChatListHistory prevChats={history} />
        </div>
      </div>
    </div>
  );
};

export default RoomChatListIndex;
