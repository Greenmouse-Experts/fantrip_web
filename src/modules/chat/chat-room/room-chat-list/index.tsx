import { FC, useEffect, useState } from "react";
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

  const getMessages = () => {
    const onListenEvent = (value: any) => {
      setPrevChats(value.data.result);
    };
    socket.on(`chatsRetrieved:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off("chatroom_listen");
  };

  useEffect(() => {
    const payload = {
      token: token,
      page: 1,
    };
    socket.emit("retrieveChats", payload);
  }, []);

  useEffect(() => {
    getMessages();
  }, [socket]);

  useEffect(() => {
    const sortedList = prevChats?.length
      ? prevChats.sort(
          (a: ChatHistoryItem, b: ChatHistoryItem) =>
            dayjs(b.updatedDate).unix() - dayjs(a.updatedDate).unix()
        )
      : [];
    saveHistory(sortedList);
  }, [prevChats]);

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
