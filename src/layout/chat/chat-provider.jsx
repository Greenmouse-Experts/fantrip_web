import React, { Suspense } from "react";
import { useUtils } from "@/hooks/useUtils";
import ChatInterface from "@/modules/chat/stay-chat/components/chat-interface";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import LargeChatWrapper from "@/components/large-chat-wrapper";

const ChatProvider = () => {
  const { stayChatModal: showModal, toggleStayChatmodal: setShowModal } =
    useUtils();
  const [isMobile] = useMediaQuery("(min-width: 980px)");
  return (
    <div className="">
      {isMobile ? (
        <Suspense fallback={<div>Loading...</div>}>
          <LargeChatWrapper open={showModal}>
            <ChatInterface close={() => setShowModal(false)} type="guest" />
          </LargeChatWrapper>
        </Suspense>
      ) : (
        <Drawer
          isOpen={showModal}
          placement="bottom"
          size={"xs"}
          onClose={() => setShowModal(false)}
          closeOnEsc
        >
          <DrawerOverlay />
          <DrawerContent>
            <div className="mobile-chat-container">
              <ChatInterface close={() => setShowModal(false)} type="guest" />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default ChatProvider;
