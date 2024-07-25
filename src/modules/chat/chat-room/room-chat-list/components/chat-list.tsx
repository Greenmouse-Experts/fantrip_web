import useAuth from "@/hooks/authUser";
import { useChat } from "@/hooks/useChat";
import { useUtils } from "@/hooks/useUtils";
import { ChatItem, UserChatItem } from "@/lib/contracts/chat";
import { formatName } from "@/lib/utils/formatHelp";
import { FC } from "react";

interface Props {
  prevChats: ChatItem[];
}
const ChatListHistory: FC<Props> = ({ prevChats }) => {
  const { userId } = useAuth();
  const { saveHostInfo } = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();

  const openChatWithUser = (item: ChatItem) => {
    let receiver = {} as UserChatItem;
    if (item.chatBuddy.id === userId) {
      receiver = item.initiator;
    } else {
      receiver = item.chatBuddy;
    }
    const payload = {
      id: receiver.id,
      firstName: receiver.firstName,
      lastName: receiver.lastName,
      nickname: receiver.nickname,
      verifiedAsHost: receiver.verifiedAsHost,
      role: receiver.role,
      picture: receiver.picture,
    };
    saveHostInfo(payload);
    setShowModal(true);
  };

  const getRecieverPicture = (item: ChatItem) => {
    if (item.initiator.id === userId) {
      return item.chatBuddy.picture;
    } else return item.initiator.picture;
  };

  const getRecieverName = (item: ChatItem) => {
    if (item.initiator.id === userId) {
      return `${item.chatBuddy.firstName} ${item.chatBuddy.lastName}`;
    } else return `${item.initiator.firstName} ${item.initiator.lastName}`;
  };

  return (
    <div className="mt-4">
      <ul className="grid gap-3 lg:gap-5">
        {prevChats.map((item, i) => (
          <li
            className="flex gap-x-1 items-center cursor-pointer"
            key={i}
            onClick={() => openChatWithUser(item)}
          >
            <img
              src={
                getRecieverPicture(item) ||
                "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
              }
              alt=""
              className="w-8 h-8 circle shrink-0 object-cover"
            />
            <div>
              <p className="fs-500 fw-500 leading-none">
                {getRecieverName(item)}
              </p>
              <p className="opacity-70 text-[12px]">
                {formatName(item.lastMessage, 25)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatListHistory;
