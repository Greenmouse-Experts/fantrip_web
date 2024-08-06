import { BookingItem } from "@/lib/contracts/booking";
import dayjs from "dayjs";
import { FC } from "react";
import { FaImage } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import ReserveActions from "./reserve-actions";
import { formatStatus } from "@/lib/utils/formatHelp";
import { RESERVATION_STATUS } from "@/lib/contracts/enums";
import { MdSportsSoccer } from "react-icons/md";

interface Props {
  data: BookingItem;
  refetch: () => void;
}
const ReserveItemDisplay: FC<Props> = ({ data, refetch }) => {
  const { guest, checkIn, checkOut, children, adults, createdDate, stay, id, status } =
    data;
  return (
    <div className="bg-gradient p-[1px] rounded-lg">
      <div className="bg-[#0D0D0D] h-full rounded-lg p-3">
        <div>
          <div className="flex items-center">
            <div className="w-5/12 pr-3">
              {guest.picture ? (
                <img
                  src={guest.picture}
                  alt="profile"
                  className="w-full h-[160px] object-cover rounded"
                />
              ) : (
                <div className="bg-primary w-full h-[160px] place-center">
                  <FaImage className="text-5xl" />
                </div>
              )}
            </div>
            <div className="w-7/12">
              <p className="fw-500 text-lg lg:text-xl">
                {guest.firstName} {guest.lastName}
              </p>
              <p className="mt-1">{guest.bio}</p>
              <div className="flex gap-x-1 mt-1">
                <HiLocationMarker className="mt-1" />
                <p>
                  {guest.state} {guest.country}
                </p>
              </div>
              <div className="flex gap-x-1 mt-1">
                <MdSportsSoccer className="mt-1" />
                <p>
                  {guest.favTeam? `${guest.favTeam} fan` : ``}
                </p>
              </div>
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
              <div className="fw-500">{formatStatus[status as keyof typeof formatStatus]}</div>
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
        {status === RESERVATION_STATUS.PENDING && <ReserveActions id={id} refetch={refetch}/>}
      </div>
    </div>
  );
};

export default ReserveItemDisplay;
