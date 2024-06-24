import { FC, useEffect } from "react";
import ChatBubble from "./component/chat-bubble";
import { useChat } from "@/hooks/useChat";
import useAuth from "@/hooks/authUser";

interface Props {
  socket: any;
}
const ChatBody: FC<Props> = ({ socket }) => {
  const { hostId, chatWithHostPage } = useChat();
  const { token , userId} = useAuth();

  const getMessages = () => {
    const onListenEvent = (value: any) => {
     console.log(value.data.result);
    };
    socket.on(`messagesRetrieved:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messagesRetrieved:${userId}`);
  };

  useEffect(() => {
    const payload = {
      token: token,
      chatBuddy: hostId,
      page: chatWithHostPage,
    };
    socket.emit("retrieveMessages", payload)
  },[])
  useEffect(() => {
    getMessages();
  }, [socket]);
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-2">
        <div className="grid gap-4">
          <ChatBubble
            type="guest"
            text="Hello Green, your stay looks nice and clean, i want to inquire about
          the weather and temperature"
          />
          <ChatBubble
            type="host"
            text="Yeah, the weather is great and the room temperature is 14 deg."
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
