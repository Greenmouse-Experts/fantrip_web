import { FC, useEffect, useState } from "react";
import ChatList from "./components/chat-list";
import SearchBar from "./components/search-bar";
import useAuth from "@/hooks/authUser";
import { ChatHistoryItem } from "@/lib/contracts/chat";
import { useChat } from "@/hooks/useChat";
import dayjs from "dayjs";

interface Props {
  socket: any;
}
const ChatSidebarIndex: FC<Props> = ({ socket }) => {
  const [prevChats, setPrevChats] = useState<ChatHistoryItem[]>([]);
  const [prevToRender, setPrevToRender] = useState<ChatHistoryItem[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
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

  const handleSearch = () => {
    if (!!searchInput.length) {
      const filtered = history.filter(
        (where) =>
          where.chatBuddy.firstName.includes(searchInput) ||
          where.chatBuddy.lastName.includes(searchInput)
      );
      setPrevToRender(filtered);
    }else{
      setPrevToRender(history);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleSearch()
    }, 1200);
  }, [searchInput, prevChats, history])

  return (
    <div className="">
      <div className="px-4 py-2">
        <p className="text-2xl fw-600 syne">Chats</p>
      </div>
      <div className="p-4">
        <div>
          <SearchBar value={searchInput} setValue={setSearchInput} />
        </div>
        <div className="mt-6">
          <ChatList prevChats={prevToRender} />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebarIndex;
