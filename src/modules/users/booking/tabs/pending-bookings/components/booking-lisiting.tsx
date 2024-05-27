import { FC } from "react";
import { BookingItem } from "@/lib/contracts/booking";
import dayjs from "dayjs";
import { FaLocationPin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProfileAvatar from "@/components/ProfileAvatar";
import CancelBooking from "./cancel-booking";

interface Props {
  data: BookingItem[];
  refetch: () => void;
}
const PendingBookingList: FC<Props> = ({ data, refetch }) => {
  return (
    <div className="grid gap-4 mt-4">
      {data.map((item: BookingItem) => (
        <div
          className="flex gap-x-4 border border-[#a1a1a1] rounded p-1"
          key={item.id}
        >
          <div className="w-[160px] h-[100%] shrink-0 overflow-hidden rounded-[8px]">
            <img
              src={
                !!item.stay.photos
                  ? item.stay.photos[0]
                  : "https://i.insider.com/6418b4bc50c7b20018f151c1?width=800&format=jpeg&auto=webp"
              }
              alt="stay-image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full flex items-center justify-between lg:pr-4">
            <div>
              <p className="lg:text-2xl fw-500">
                {item.stay.name}{" "}
                <span className="text-[#fc819f] relative bottom-[2px] rounded-full px-3 py-[1px] fs-400 bg-[#fc81a01b]">
                  {item.status} 
                </span>
              </p>
              <div className="flex gap-x-2 my-2">
                <ProfileAvatar
                  name={`${item?.guest?.firstName} ${item.guest.lastName}`}
                  url={item?.guest?.picture}
                  size={40}
                  font={14}
                />
                <div>
                  <p className="fw-500">{`${item?.guest?.firstName} ${item.guest.lastName}`}</p>
                  <p className="fw-500">Host</p>
                </div>
              </div>
              <p className="text-gray-500">{item.stay.description}</p>
              <div className="text-sec gap-x-1 flex items-center">
                <FaLocationPin className="text-md" />
                <p className="fs-500">{item.stay.address}</p>
              </div>
              <p className="mt-2 text-[#9847fe] fw-600 fs-500">
                Booked: {dayjs(item.createdDate).fromNow()}
              </p>
            </div>
            <div className="grid gap-3 justify-end p-2">
              <div className="flex gap-x-3 justify-end items-center">
                <p>Price:</p>
                <p className="synce text-xl text-end fw-600">{item.checkIn}</p>
              </div>
              <div className="grid gap-2">
                <div className="flex justify-end gap-x-2">
                  <p>Check-in:</p>
                  <p className="synce fw-500">{item.checkIn}</p>
                </div>
                <div className="flex justify-end gap-x-2">
                  <p>Check-out:</p>
                  <p className="synce fw-500">{item.checkOut}</p>
                </div>
                <div className="flex justify-end gap-x-2">
                  <p>No of Guest(Adults(Children)):</p>
                  <p className="synce fw-500">{`${item.adults}(${item.children})`}</p>
                </div>
              </div>
              <div className="flex gap-x-3 justify-end relative">
                <Link
                  className="underline text-[#9847fe] relative block"
                  to={`/find-stay/${item.stay.id}`}
                >
                  View Listing
                </Link>
                <CancelBooking id={item.id} refetch={refetch} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingBookingList;
