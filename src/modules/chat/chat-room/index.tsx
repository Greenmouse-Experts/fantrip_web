import { useState } from "react";
import io from "socket.io-client";
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { SOCKET_URL } from "@/services/constant";
import useAuth from "@/hooks/authUser";
import RoomBodyIndex from "./room-body";
import RoomChatListIndex from "./room-chat-list";
import RoomHeaderIndex from "./room-header";
import RoomSidebarIndex from "./room-sidebar";
import { useUtils } from "@/hooks/useUtils";
import { useSearchParams } from "react-router-dom";
import PostDetails from "./post-details";

const socket = io(`${SOCKET_URL}`);
const ChatRoomIndex = () => {
  const [searchParams] = useSearchParams();
  const postMode = searchParams.get("chatpost-id");
  const userId = searchParams.get("chatinit-id");
  const { isLoggedIn } = useAuth();
  const { activeModal, setNewActiveModal } = useUtils();
  const [reloadSocket, setReloadSocket] = useState("");
  const handleReload = () => {
    setReloadSocket(`${new Date()}`);
  };

  return (
    <div>
      <div className="pt-24 lg:pt-28 bg-layout-gradient"></div>
      <div className="py-6">
        <div className="box pb-3">
          <RoomHeaderIndex socket={socket} setReload={handleReload} />
        </div>
        <div className="p-[.5px] bg-[#D2D2D2] dark:bg-darkColorLight"></div>
        <div className="box">
          <div className="relative lg:flex gap-x-4 ">
            <div className="hidden lg:block lg:w-[28%] border-r-2 h-full border-[#D2D2D2] sticky top-0">
              <RoomSidebarIndex socket={socket} reload={handleReload} />
            </div>
            <div className="lg:w-[48%]">
              {postMode ? (
                <PostDetails socket={socket} id={postMode} userId={userId || ""}/>
              ) : (
                <RoomBodyIndex
                  reloadSocket={reloadSocket}
                  reload={handleReload}
                  socket={socket}
                />
              )}
            </div>
            {isLoggedIn && (
              <div className="hidden lg:block lg:w-[25%] h-full sticky top-0">
                <RoomChatListIndex socket={socket} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        isOpen={activeModal === "chatlist"}
        placement="bottom"
        size={"xs"}
        onClose={() => setNewActiveModal(null)}
      >
        <DrawerOverlay />
        <DrawerContent>
          {isLoggedIn && (
            <div className="">
              <RoomChatListIndex socket={socket} />
            </div>
          )}
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={activeModal === "sidebar"}
        placement="bottom"
        size={"xs"}
        onClose={() => setNewActiveModal(null)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="">
            <RoomSidebarIndex socket={socket} reload={handleReload} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ChatRoomIndex;
