import { useUtils } from "@/hooks/useUtils";
import ChatInterface from "@/modules/chat/stay-chat/components/chat-interface";
import ReactModal from "react-modal-resizable-draggable";

const ChatProvider = () => {
  const { stayChatModal: showModal, toggleStayChatmodal: setShowModal } =
    useUtils();
  return (
    <div>
      <ReactModal
        minWidth={400}
        minHeight={500}
        initWidth={400}
        initHeight={500}
        onFocus={() => console.log("Modal is click")}
        className={"rounded-xl overflow-hidden"}
        onRequestClose={() => setShowModal(true)}
        isOpen={showModal}
      >
        <ChatInterface close={() => setShowModal(false)} />
      </ReactModal>
    </div>
  );
};

export default ChatProvider;
