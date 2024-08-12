import RoomBodyIndex from "./room-body";
import RoomChatListIndex from "./room-chat-list";
import RoomHeaderIndex from "./room-header";
import RoomSidebarIndex from "./room-sidebar";
import io from "socket.io-client";
import { SOCKET_URL } from "@/services/constant";
import useAuth from "@/hooks/authUser";

const socket = io(`${SOCKET_URL}`);
const ChatRoomIndex = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      <div className="pt-24 lg:pt-28 bg-layout-gradient"></div>
      <div className="py-6">
        <div className="box pb-3">
          <RoomHeaderIndex />
        </div>
        <div className="p-[.5px] bg-[#D2D2D2]"></div>
        <div className="box">
          <div className="lg:flex gap-x-4 h-[80vh]">
            <div className="lg:w-[28%] border-r-2 border-[#D2D2D2]">
              <RoomSidebarIndex />
            </div>
            <div className="lg:w-[48%]">
              <RoomBodyIndex />
            </div>
            {isLoggedIn && (
              <div className="lg:w-[25%] h-full">
                <RoomChatListIndex socket={socket} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomIndex;
