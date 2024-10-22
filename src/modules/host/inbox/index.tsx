import { SOCKET_URL } from "@/services/constant";
import ChatBodyIndex from "./chat-ui/chat-body";
import ChatFooterIndex from "./chat-ui/chat-footer";
import ChatHeaderIndex from "./chat-ui/chat-header";
import ChatSidebarIndex from "./chat-ui/chat-sidebar";
import io from "socket.io-client";

const socket = io(`${SOCKET_URL}`);

const HostInboxIndex = () => {
  return (
    <div>
      <div className="border border-gray-600 h-[1000px] lg:h-[85vh] overflow-hidden rounded-lg">
        <div className="lg:flex h-full">
          <div className="lg:w-[300px] shrink-0">
            <ChatSidebarIndex socket={socket} />
          </div>
          <div className="w-full h-full border-l border-gray-800">
            <div className="h-[60px] flex items-center bg-white dark:bg-gray-900 shadow-md">
              <ChatHeaderIndex />
            </div>
            <div className="h-[calc(100%_-_133px)] pl-2">
              <ChatBodyIndex socket={socket} />
            </div>
            <div className="h-[70px] flex items-center">
              <ChatFooterIndex socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostInboxIndex;
