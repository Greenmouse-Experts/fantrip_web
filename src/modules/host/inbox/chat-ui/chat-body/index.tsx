import { FC, useEffect, useRef } from "react";
import ChatBubble from "./component/chat-bubble";
import { useChat } from "@/hooks/useChat";
import useAuth from "@/hooks/authUser";

interface Props {
  socket: any;
}
const ChatBodyIndex: FC<Props> = ({ socket }) => {
  const { guestId, guestInfo, chatWithGuest, saveChatWithGuest } = useChat();
  const { token, userId } = useAuth();

  const getMessages = () => {
    const onListenEvent = (value: any) => {
      saveChatWithGuest(value.data.result);
    };
    socket.on(`messagesRetrieved:${guestId}:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messagesRetrieved:${guestId}:${userId}`);
  };

  const getUpdates = () => {
    const onListenEvent = (value: any) => {
      saveChatWithGuest([...chatWithGuest, ...value.data]);
    };
    socket.on(`recentChatRetrieved:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`recentChatRetrieved:${userId}`);
  };

  useEffect(() => {
    const payload = {
      token: token,
      chatBuddy: guestInfo.id,
      page: 1,
    };
    socket.emit("retrieveMessages", payload);
  }, []);

  useEffect(() => {
    getMessages();
    if(!!chatWithGuest.length){
        getUpdates()
    }
  }, [socket, guestId]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);
  console.log(chatWithGuest);

  return (
    <div className="w-full h-full p-1 pr-2">
      <div className="bg-[#1A1A1A] p-1 pr-2 rounded-lg h-full">
        <div className="h-full overflow-y-auto scroll-pro">
          <div className="p-2">
            <div className="grid gap-4 scroll-pro" ref={scrollRef}>
              {chatWithGuest.map((item) => (
                <div className="flex" key={item.id}>
                  <ChatBubble
                    type={item.initiator.role}
                    text={item.message || ""}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBodyIndex;
