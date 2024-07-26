import { FC, useEffect, useState } from "react";
import ChatList from "./components/chat-list";
import SearchBar from "./components/search-bar";
import useAuth from "@/hooks/authUser";
import { ChatItem } from "@/lib/contracts/chat";

interface Props {
  socket: any;
}
const ChatSidebarIndex: FC<Props> = ({ socket }) => {
  const [prevChats, setPrevChats] = useState<ChatItem[]>([]);
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

  return (
    <div className="">
      <div className="px-4 py-2">
        <p className="text-2xl fw-600 syne">Chats</p>
      </div>
      <div className="p-4">
        <div>
          <SearchBar />
        </div>
        <div className="mt-6">
          <ChatList prevChats={prevChats} />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebarIndex;
