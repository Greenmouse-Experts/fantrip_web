import { BookingItem } from "@/lib/contracts/booking";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import ReserveActions from "./reserve-actions";
import { formatName, formatStatus } from "@/lib/utils/formatHelp";
import { RESERVATION_STATUS } from "@/lib/contracts/enums";
import { MdSportsSoccer } from "react-icons/md";
import LargeChatWrapper from "@/components/large-chat-wrapper";
import { useChat } from "@/hooks/useChat";
import ChatInterface from "@/modules/chat/stay-chat/components/chat-interface";
import { BsChatDots } from "react-icons/bs";

interface Props {
  data: BookingItem;
  refetch: () => void;
}
const ReserveItemDisplay: FC<Props> = ({ data, refetch }) => {
  const [showChat, setShowChat] = useState(false);
  const { saveMiniInfo } = useChat();

  const {
    guest,
    checkIn,
    checkOut,
    children,
    adults,
    createdDate,
    stay,
    id,
    status,
  } = data;

  const handleChatWithGuest = () => {
    const payload = {
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
      nickname: guest.nickname,
      verifiedAsHost: guest.verifiedAsHost,
      role: guest.role,
      picture: guest.picture,
    };
    saveMiniInfo(payload);
    setShowChat(true);
  };

  return (
    <div>
      <div className="bg-gradient p-[1px] rounded-lg">
        <div className="bg-[#0D0D0D] h-full rounded-lg p-3">
          <div>
            <div className="flex items-center">
              <div className="w-5/12 pr-3">
                {guest.picture ? (
                  <img
                    src={guest.picture}
                    alt="profile"
                    className="w-full h-[180px] object-cover rounded"
                  />
                ) : (
                  <div className="bg-primary w-full h-[180px] place-center">
                    <FaImage className="text-5xl" />
                  </div>
                )}
              </div>
              <div className="w-7/12">
                <p className="fw-500 text-lg lg:text-xl">
                  {guest.firstName} {guest.lastName}
                </p>
                <p className="mt-1">{formatName(guest.bio, 60)}</p>
                <div className="flex gap-x-1 mt-1">
                  <HiLocationMarker className="mt-1" />
                  <p>
                    {guest.state} {guest.country}
                  </p>
                </div>
                <div className="flex gap-x-1 mt-1">
                  <MdSportsSoccer className="mt-1" />
                  <p>{guest.favTeam ? `${guest.favTeam} fan` : ``}</p>
                </div>
                <button
                  onClick={() => handleChatWithGuest()}
                  className="flex gap-x-2 fs-400 md:fs-500 mt-1 items-center fw-500"
                >
                  <BsChatDots />
                  Chat with Guest
                </button>
              </div>
            </div>
            <div className="border border-gray-600 p-3 mt-3 rounded-lg">
              <div className="flex gap-x-2">
                <p className="text-gray-300">Booking Time:</p>
                <p className="fw-500">
                  {dayjs(createdDate).format("HH:MM - YYYY-MM-DD")}
                </p>
              </div>
              <div className="flex gap-x-2">
                <p className="text-gray-300">Check In:</p>
                <p className="fw-500">{checkIn}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="text-gray-300">Check Out:</p>
                <p className="fw-500">{checkOut}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="text-gray-300">Adults:</p>
                <p className="fw-500">{adults}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="text-gray-300">Children:</p>
                <p className="fw-500">{children}</p>
              </div>
              <div className="flex gap-x-2">
                <p className="text-gray-300">Status:</p>
                <div className="fw-500">
                  {formatStatus[status as keyof typeof formatStatus]}
                </div>
              </div>
            </div>
            <div className="border border-gray-600 p-3 mt-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-5/12 pr-3">
                  <img
                    src={stay.photos[0]}
                    alt="profile"
                    className="w-full h-[100px] object-cover rounded"
                  />
                </div>
                <div className="w-7/12">
                  <p className="fw-500 text-lg lg:text-xl">{stay.name}</p>
                  <div className="flex gap-x-1 mt-1">
                    <HiLocationMarker className="mt-1 shrink-0" />
                    <p>{stay.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {status === RESERVATION_STATUS.PENDING && (
            <ReserveActions id={id} refetch={refetch} />
          )}
        </div>
      </div>
      <div className="text-black">
        <LargeChatWrapper open={showChat}>
          <ChatInterface close={() => setShowChat(false)} type="host" />
        </LargeChatWrapper>
      </div>
    </div>
  );
};

export default ReserveItemDisplay;
