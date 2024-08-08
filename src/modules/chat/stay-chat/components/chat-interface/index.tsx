import { FC } from "react";
import ChatBody from "./chat-body";
import ChatFooter from "./chat-footer";
import ChatHeader from "./chat-header";
import io from "socket.io-client";
import { SOCKET_URL } from "@/services/constant";
import HostChatBody from "./chat-body/host-chat-body";

interface Props {
  close: () => void;
  type: "guest" | "host";
}

const socket = io(`${SOCKET_URL}`);

const ChatInterface: FC<Props> = ({ close, type }) => {
  return (
    <div className="h-full">
      <div className="h-[64px]">
        <ChatHeader close={close} type={type} />
      </div>
      <div className="h-[calc(100%_-_130px)]">
        {type === "guest" ? (
          <ChatBody socket={socket} type={type} />
        ) : (
          <HostChatBody socket={socket} type={type} />
        )}
      </div>
      <div className="h-[66px] border">
        <ChatFooter socket={socket} type={type}/>
      </div>
    </div>
  );
};

export default ChatInterface;
