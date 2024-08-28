import useAuth from "@/hooks/authUser";
import { useChat } from "@/hooks/useChat";
import { ChatItem } from "@/lib/contracts/chat";
import { formatName } from "@/lib/utils/formatHelp";
import { FC } from "react";

interface Props {
  prevChats: ChatItem[];
}
const ChatList: FC<Props> = ({ prevChats }) => {
  const { userId } = useAuth();
  const { saveGuestInfo, guestId } = useChat();
  const selectThisGuest = (guest: ChatItem) => {
    if (guest.id === guestId) return;
    if (guest.chatBuddy.id === userId) {
      const payload = {
        id: guest.initiator.id,
        firstName: guest.initiator.firstName,
        lastName: guest.initiator.lastName,
        nickname: guest.initiator.nickname,
        verifiedAsHost: guest.initiator.verifiedAsHost,
        role: guest.initiator.role,
        picture: guest.initiator?.picture,
      };
      saveGuestInfo(payload, guest.id);
    } else {
      const payload = {
        id: guest.chatBuddy.id,
        firstName: guest.chatBuddy.firstName,
        lastName: guest.chatBuddy.lastName,
        nickname: guest.chatBuddy.nickname,
        verifiedAsHost: guest.chatBuddy.verifiedAsHost,
        role: guest.chatBuddy.role,
        picture: guest.chatBuddy?.picture,
      };
      saveGuestInfo(payload, guest.id);
    }
  };

  const getRecieverPicture = (item: ChatItem) => {
    if (item.chatBuddy.id === userId) {
      return item.initiator.picture;
    } else return item.chatBuddy.picture;
  };

  const getRecieverName = (item: ChatItem) => {
    if (item.chatBuddy.id === userId) {
      return `${item.initiator.firstName} ${item.initiator.lastName}`;
    } else return `${item.chatBuddy.firstName} ${item.chatBuddy.lastName}`;
  };

  return (
    <div className="grid gap-4">
      {prevChats &&
        prevChats.map((item) => (
          <div
            className={`cursor-pointer p-2 rounded-lg ${
              item.id === guestId && "dark:bg-darkColorLight bg-gray-100"
            }`}
            key={item.id}
            onClick={() => selectThisGuest(item)}
          >
            <div className="flex gap-x-2">
              <img
                src={
                  getRecieverPicture(item) ||
                  "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
                }
                alt="profile"
                className="w-12 h-12 object-cover circle"
              />
              <div>
                <p className="fw-500">{getRecieverName(item)}</p>
                <p className="mt-[2px] opacity-70 fs-400">
                  {formatName(item?.lastMessage, 25)}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatList;
