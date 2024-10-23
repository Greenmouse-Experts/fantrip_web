import { FC, useEffect, useRef, useState } from "react";
import ChatBubble from "./component/chat-bubble";
import { useChat } from "@/hooks/useChat";
import useAuth from "@/hooks/authUser";
import { ChatItem2 } from "@/lib/contracts/chat";
import dayjs from "dayjs";

interface Props {
  socket: any;
  type: "guest" | "host";
  reload: string | undefined;
}
const ChatBody: FC<Props> = ({ socket, reload }) => {
  const {
    hostId,
    chatWithHost,
    hostInfo,
    chatWithHostPage,
    saveChatWithHost,
    history,
    saveHistory,
  } = useChat();
  const { token, user, userId, firstName, lastName, isHost } = useAuth();
  const [newMsg, setNewMsg] = useState<ChatItem2>();
  const [isLoaded, setIsLoaded] = useState(false);

  // on load get previous messages or message history
  const getMessages = () => {
    const onListenEvent = (value: any) => {
      setIsLoaded(true);
      saveChatWithHost(value.data.result);
    };
    socket.on(`messagesRetrieved:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messagesRetrieved:${userId}`);
  };

  // get recent chat sent
  const getSentMessages = () => {
    const onListenEvent = (value: any) => {
      setIsLoaded(true);
      console.log(value, "sent message");

      const payload = {
        chatBuddy: {
          ...hostInfo,
        },
        initiator: {
          id: user.id,
          firstName: firstName,
          lastName: lastName,
          nickname: user.nickname,
          verifiedAsHost: false,
          role: isHost ? "host" : "guest",
          picture: user.image,
          reviews: [],
          totalReviews: 0,
          avgRating: null,
        },
        id: value.data.lastMessageId,
        message: value.data.lastMessage,
        file: null,
        read: false,
        createdDate: value.data.updatedDate,
        chat: {
          id: value.data.id,
          lastMessage: value.data.lastMessage,
          isArchived: false,
          read: false,
          unread: "",
          createdDate: value.data.updatedDate,
          updatedDate: value.data.updatedDate,
        },
        isArchived: false,
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
      // console.log(value.data, "inside listener");
      setNewMsg(value.data);
    };
    socket.on(`messageSent:${chatWithHost[0].chat.id}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messageSent:${chatWithHost[0].chat.id}`);
  };

  // connect to the chat room once page loads or when chat id is changed
  useEffect(() => {
    const payload = {
      token: token,
      chatBuddy: hostId,
      page: chatWithHostPage,
    };
    socket.emit("retrieveMessages", payload);
  }, [socket, hostInfo]);

  useEffect(() => {
    if (!chatWithHost.length) {
      getMessages();
    }
  }, [socket, hostId]);

  useEffect(() => {
    if (!chatWithHost.length && !reload?.length) {
      getSentMessages();
    }
  }, [socket, hostId, reload]);

  useEffect(() => {
    if (isLoaded && chatWithHost.length) {
      getUpdates();
    }
  }, [socket, isLoaded]);

  //update sent messages

  // add updated messages to the chat message array
  useEffect(() => {
    if (newMsg && newMsg?.chat?.lastMessage) {
      const filtered = chatWithHost.filter((where) => where.id === newMsg.id);
      const historyFilter = history.filter(
        (where) => where.chatBuddy.id !== hostInfo.id
      );
      if (!filtered.length) {
        const newChat = [...chatWithHost, newMsg];
        saveChatWithHost(newChat);
      }
      const newPayload = {
        id: newMsg.id,
        lastMessage: newMsg.message,
        isArchived: false,
        read: false,
        createdDate: dayjs().toISOString(),
        updatedDate: dayjs().toISOString(),
        initiator: {
          ...newMsg.initiator,
        },
        chatBuddy: {
          ...newMsg.chatBuddy,
        },
      };
      saveHistory([newPayload, ...historyFilter]);
    }
  }, [newMsg, socket]);

  // Scroll to the bottom of the div when new message is added
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatWithHost]);

  return (
    <div className="h-full overflow-y-auto" ref={scrollRef}>
      <div className="p-2">
        <div className="grid gap-3">
          {chatWithHost.map((item) => (
            <div className="flex" key={item.id}>
              <ChatBubble
                type={item.initiator.id}
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

export default ChatBody;
