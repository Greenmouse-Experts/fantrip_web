import { FC, useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import useAuth from "@/hooks/authUser";
import { ChatItem2 } from "@/lib/contracts/chat";
import ChatBubble from "../component/chat-bubble";

interface Props {
  socket: any;
  reload: string | undefined;
  type: "guest" | "host"
}
const HostChatBody: FC<Props> = ({ socket, reload }) => {
  const { chatWithMini, miniInfo, chatWithMiniPage, saveChatWithMini } =
    useChat();
  const { token, userId, isHost, user, firstName, lastName } = useAuth();
  const [newMsg, setNewMsg] = useState<ChatItem2>();
  const [isLoaded, setIsLoaded] = useState(false)

  // on load get previous messages or message history
  const getMessages = () => {
    const onListenEvent = (value: any) => {
      setIsLoaded(true)
      saveChatWithMini(value.data.result);
    };
    socket.on(`messagesRetrieved:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messagesRetrieved:${userId}`);
  };

  // get recent chat sent
  const getSentMessages = () => {
    const onListenEvent = (value: any) => {
      setIsLoaded(true);
      console.log(value);
      const payload = {
        chatBuddy: {
          ...miniInfo,
        },
        initiator: {
          id: user.id,
          firstName: firstName,
          lastName: lastName,
          nickname: user.nickname,
          verifiedAsHost: false,
          role: isHost? "host" : "guest",
          picture: user.image,
          reviews: [],
          totalReviews: 0,
          avgRating: null,
        },
        id: value.data.id,
        message: value.data.lastMessage,
        file: null,
        read: false,
        createdDate: value.data.createdDate,
        isArchived: false,
        chat: {
          id: value.data.id,
          lastMessage: value.data.lastMessage,
          isArchived: false,
          unread: "",
          read: false,
          createdDate: value.data.createdDate,
          updatedDate: value.data.createdDate,
        },
      };
      setNewMsg(payload as ChatItem2);
    };
    socket.on(`recentChatRetrieved:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`recentChatRetrieved:${userId}`);
  };

  // get current updates fro sent messages or received msgs
  const getUpdates = () => {
    const onListenEvent = (value: any) => {
      setNewMsg(value.data);
    };
    socket.on(`messageSent:${chatWithMini[0].chat.id}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messageSent:${chatWithMini[0].chat.id}`);
  };

   // connect to the chat room once page loads or when chat id is changed
  useEffect(() => {
    const payload = {
      token: token,
      chatBuddy: miniInfo.id,
      page: chatWithMiniPage,
    };
    socket.emit("retrieveMessages", payload);
  }, [socket, miniInfo]);

  useEffect(() => {
    if(!chatWithMini.length){
      getMessages();
    }
  }, [socket, miniInfo]);

  useEffect(() => {
    if (isLoaded) {
      getUpdates();
    }
  }, [socket, isLoaded]);

  useEffect(() => {
    if (!chatWithMini.length && !reload?.length) {
      getSentMessages();
    }
  }, [socket, reload]);

   // add updated messages to the chat message array
   useEffect(() => {
    if (newMsg) {
      const filtered = chatWithMini.filter((where) => where.id === newMsg.id);
      if (!filtered.length) {
        const newChat = [...chatWithMini, newMsg];
        saveChatWithMini(newChat);
      }
    }
  }, [newMsg, socket]);
  

    // Scroll to the bottom of the div when new message is added
    const scrollRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [chatWithMini]);

  return (
    <div className="h-full overflow-y-auto" ref={scrollRef}>
      <div className="p-2">
        <div className="grid gap-3">
          {chatWithMini.map((item) => (
            <div className="flex" key={item.id}>
              <ChatBubble
                type={item?.initiator?.id}
                text={item.message || ""}
                date={item.createdDate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostChatBody;
