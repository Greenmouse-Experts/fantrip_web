import { BsChatDots } from "react-icons/bs";
import { useUtils } from "@/hooks/useUtils";
import { FC } from "react";
import { UserItem } from "@/lib/contracts/auth";
import { useChat } from "@/hooks/useChat";

interface Props {
  id: string;
  host: UserItem;
}
const ChatForStay: FC<Props> = ({ host }) => {
  const { saveHostInfo} = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();
  const openChatWithHost = () => {
    const payload = {
      id: host.id,
      firstName: host.firstName,
      lastName: host.lastName,
      nickname: host.nickname,
      verifiedAsHost: host.verifiedAsHost,
      role: host.role,
      picture: host.picture,
    };
    saveHostInfo(payload);
    setShowModal(true);
  };
  return (
    <div>
      <button
        onClick={() => openChatWithHost()}
        className="flex gap-x-2 items-center fw-500"
      >
        <BsChatDots />
        Chat with Host
      </button>
    </div>
  );
};

export default ChatForStay;
