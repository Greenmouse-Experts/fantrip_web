import useAuth from "@/hooks/authUser";
import { useChat } from "@/hooks/useChat";
import { useUtils } from "@/hooks/useUtils";
import { ChatHistoryItem, ChatItem } from "@/lib/contracts/chat";
import { formatName } from "@/lib/utils/formatHelp";
import { FC } from "react";

interface Props {
  prevChats: ChatHistoryItem[];
}

const ChatListHistory: FC<Props> = ({ prevChats }) => {
  const { userId } = useAuth();
  const { saveHostInfo } = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();

  const openChatWithUser = (item: ChatItem) => {
    const receiver =
      item?.chatBuddy?.id === userId
        ? item?.initiator || item.chatBuddy // Fallback to chatBuddy if initiator is missing
        : item.chatBuddy;

    const payload = {
      id: receiver?.id || "",
      firstName: receiver?.firstName || "Unknown",
      lastName: receiver?.lastName || "",
      nickname: receiver?.nickname || "",
      verifiedAsHost: receiver?.verifiedAsHost || false,
      role: receiver?.role || "user",
      picture: receiver?.picture || "",
    };
    saveHostInfo(payload);
    setShowModal(true);
  };

  return (
    <div className="mt-4">
      <ul className="grid gap-5 lg:gap-5">
        {prevChats.map((item, i) => {
          // Handle missing initiator object gracefully
          const chatBuddy =
            item?.initiator && item?.initiator?.id === userId
              ? item.chatBuddy
              : item.initiator || item.chatBuddy; // Fallback to chatBuddy if initiator is missing

          return (
            <li
              className="flex gap-x-1 items-center cursor-pointer"
              key={i}
              onClick={() => openChatWithUser(item as unknown as ChatItem)}
            >
              <img
                src={
                  chatBuddy?.picture ||
                  "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
                }
                alt="User Avatar"
                className="w-8 h-8 circle shrink-0 -mt-1 object-cover"
              />
              <div>
                <p className="fs-500 fw-500 mx-1 leading-none">
                  {`${chatBuddy?.firstName || "Unknown"} ${
                    chatBuddy?.lastName || ""
                  }`}
                </p>
                <p
                  className={`opacity-70 mt-1 mx-1 text-[12px] ${
                    item.unread > 0 ? "font-semibold text-[#9847fe]" : ""
                  }`}
                >
                  {formatName(item.lastMessage || "No message", 25)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatListHistory;
