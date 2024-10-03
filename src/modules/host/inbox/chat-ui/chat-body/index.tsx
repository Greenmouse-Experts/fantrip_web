import { FC, useEffect, useRef, useState } from "react";
import ChatBubble from "./component/chat-bubble";
import { useChat } from "@/hooks/useChat";
import useAuth from "@/hooks/authUser";
import { ChatItem2 } from "@/lib/contracts/chat";
import EmptyChat from "@/components/empty-states/empty-chat";

interface Props {
  socket: any;
}
const ChatBodyIndex: FC<Props> = ({ socket }) => {
  const { guestId, guestInfo, chatWithGuest, saveChatWithGuest } = useChat();
  const { token, userId } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false)
  const [newMsg, setNewMsg] = useState<ChatItem2>();

  // on load get previous messages or message history
  const getMessages = () => {
    const onListenEvent = (value: any) => {
      setIsLoaded(true)
      saveChatWithGuest(value.data.result);
    };
    socket.on(`messagesRetrieved:${guestId}:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messagesRetrieved:${guestId}:${userId}`);
  };

  // get current updates fro sent messages or received msgs
  const getUpdates = () => {
    const onListenEvent = (value: any) => {
      setNewMsg(value.data);
    };
    socket.on(`messageSent:${chatWithGuest[0]?.chat?.id}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messageSent:${chatWithGuest[0]?.chat?.id}`);
  };

  // connect to the chat room once page loads or when chat id is changed
  useEffect(() => {
    const payload = {
      token: token,
      chatBuddy: guestInfo.id,
      page: 1,
    };
    setIsLoaded(false)
    socket.emit("retrieveMessages", payload);
  }, [socket, guestInfo]);

  // to monitor if there are messages to carry its respective functions
  useEffect(() => {
    if (!chatWithGuest.length) {
      getMessages();
    }
  }, [socket, guestId]);

  useEffect(() => {
    if (isLoaded) {
      getUpdates();
    }
  }, [socket, isLoaded]);

  // add updated messages to the chat message array
  useEffect(() => {
    if (newMsg) {
      const filtered = chatWithGuest.filter((where) => where.id === newMsg.id);
      if (!filtered.length) {
        const newChat = [...chatWithGuest, newMsg];
        saveChatWithGuest(newChat);
      }
    }
  }, [newMsg]);

  // Scroll to the bottom of the div when new message is added
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatWithGuest]);

  return (
    <div className="w-full h-full p-1 pr-2">
      {guestId ? (
        <div className=" dark:bg-darkColor p-1 pr-2 rounded-lg h-full">
          <div className="h-full overflow-y-auto scroll-pro" ref={scrollRef}>
            <div className="p-2">
              <div className="grid gap-4 scroll-pro">
                {chatWithGuest.map((item) => (
                  <div className="flex" key={item?.id}>
                    <ChatBubble
                      type={item?.initiator?.role}
                      text={item.message || ""}
                      date={item.createdDate}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyChat bg="bg-[#1A1A1A]" />
      )}
    </div>
  );
};

export default ChatBodyIndex;
