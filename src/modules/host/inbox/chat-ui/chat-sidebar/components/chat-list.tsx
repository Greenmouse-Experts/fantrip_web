import { useChat } from "@/hooks/useChat";
import { ChatItem } from "@/lib/contracts/chat";
import { formatName } from "@/lib/utils/formatHelp";
import { FC } from "react";

interface Props {
  prevChats: ChatItem[];
}
const ChatList: FC<Props> = ({ prevChats }) => {
  const { saveGuestInfo, guestId } = useChat();
  const selectThisGuest = (guest: ChatItem) => {
    const payload = {
      id: guest.initiator.id,
      firstName: guest.initiator.firstName,
      lastName: guest.initiator.lastName,
      nickname: guest.initiator.nickname,
      verifiedAsHost: guest.initiator.verifiedAsHost,
      role: guest.initiator.role,
      picture: guest.initiator.picture,
    };
    saveGuestInfo(payload, guest.id);
  };
  return (
    <div className="grid gap-4">
      {prevChats &&
        prevChats.map((item) => (
          <div
            className={`cursor-pointer p-2 rounded-lg ${item.id === guestId && 'bg-[#1A1A1A]'}`}
            key={item.id}
            onClick={() => selectThisGuest(item)}
          >
            <div className="flex gap-x-2">
              <img
                src={
                  item.initiator.picture ||
                  "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712921717/fantrip/Ellipse_56_frahhh.png"
                }
                alt="profile"
                className="w-12 h-12 object-cover circle"
              />
              <div>
                <p className="fw-500">{`${item.initiator.firstName} ${item.initiator.lastName}`}</p>
                <p className="mt-[2px] opacity-70 fs-400">
                  {formatName(item?.lastMessage, 27)}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatList;
