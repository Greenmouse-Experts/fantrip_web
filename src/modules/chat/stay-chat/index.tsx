import { BsChatDots } from "react-icons/bs";
import { useUtils } from "@/hooks/useUtils";
import { FC } from "react";

interface Props{
    id: string
}
const ChatForStay:FC<Props> = () => {
    const { toggleStayChatmodal:setShowModal} = useUtils()
  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="flex gap-x-2 items-center fw-500"
      >
        <BsChatDots />
        Chat with Host
      </button>
    </div>
  );
};

export default ChatForStay;
