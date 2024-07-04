import { useUtils } from "@/hooks/useUtils";
import ChatInterface from "@/modules/chat/stay-chat/components/chat-interface";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
const ReactModal = React.lazy(() => import("react-modal-resizable-draggable"));
// import ReactModal from "react-modal-resizable-draggable";

const ChatProvider = () => {
  const { stayChatModal: showModal, toggleStayChatmodal: setShowModal } =
    useUtils();
  const [isMobile] = useMediaQuery("(min-width: 980px)");
  return (
    <div>
      {isMobile ? (
        <Suspense fallback={<div>Loading...</div>}>
          {/* <ReactModal
            minWidth={250}
            minHeight={400}
            initWidth={400}
            initHeight={500}
            onFocus={() => console.log("Modal is click")}
            className={"rounded-xl !-z-0 overflow-hidden"}
            onRequestClose={() => setShowModal(true)}
            isOpen={showModal}
          >
            <ChatInterface close={() => setShowModal(false)} />
          </ReactModal> */}
          <></>
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
              <ChatInterface close={() => setShowModal(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default ChatProvider;
