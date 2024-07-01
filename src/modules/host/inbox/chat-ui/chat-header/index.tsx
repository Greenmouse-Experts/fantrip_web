import { useChat } from "@/hooks/useChat";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatHeaderIndex = () => {
  const { guestId, guestInfo } = useChat();
  return (
    <div className="w-full">
      {guestId ? (
        <div className="flex pr-4 justify-between items-center">
          <div className="flex items-center gap-x-2">
            <img
              src={
                guestInfo.picture ||
                "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712921717/fantrip/Ellipse_56_frahhh.png"
              }
              alt="profile"
              className="w-12 h-12 object-cover circle"
            />
            <div>
              <p className="fw-500 text-lg fw-500">{`${guestInfo?.firstName} ${guestInfo?.lastName}`}</p>
            </div>
          </div>
          <div>
            <BsThreeDotsVertical className="text-2xl cursor-pointer" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChatHeaderIndex;
