import { FC, useState } from "react";
import { PaidBookingItem } from "@/lib/contracts/booking";
import dayjs from "dayjs";
import { FaLocationPin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProfileAvatar from "@/components/ProfileAvatar";
import { Drawer, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import BookingDetails from "../../../components/booking-details";
import LeaveReviewIndex from "../../../components/leave-review";

interface Props {
  data: PaidBookingItem[];
  refetch: () => void;
  next: () => void;
}
const CompletedBookingList: FC<Props> = ({ data, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const closeDrawer = () => setIsOpen(false);
  const openDetail = (id: string) => {
    setSelectedId(id);
    setIsOpen(true);
  };
  return (
    <div className="grid gap-4 mt-4">
      {data.map((item: PaidBookingItem) => (
        <div className="bg-gradient rounded-lg p-[2px]" key={item.id}>
          <div className="bg-white dark:bg-darkColor rounded-lg md:flex gap-x-4 p-1 h-full">
            <div className="w-full h-[130px] md:w-[160px] md:h-[100%] max-h-[140px] shrink-0 overflow-hidden rounded-[8px]">
              <img
                src={
                  !!item.reservation.stay.photos
                    ? item.reservation.stay.photos[0]
                    : "https://i.insider.com/6418b4bc50c7b20018f151c1?width=800&format=jpeg&auto=webp"
                }
                alt="stay-image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:flex items-center justify-between lg:pr-4">
              <div className="mt-2 md:mt-0">
                <p className="flex md:block items-center lg:text-2xl fw-500">
                  {item.reservation.stay.name}{" "}
                  <span className="text-green-600 relative md:bottom-[2px] rounded-full px-3 py-[1px] fs-400 bg-green-50">
                    confirmed
                  </span>
                </p>
                <div className="flex gap-x-2 my-2">
                  <ProfileAvatar
                    name={`${item?.reservation.stay?.host?.firstName} ${item.reservation.stay?.host?.lastName}`}
                    url={item?.reservation.stay?.host?.picture}
                    size={40}
                    font={14}
                  />
                  <div>
                    <p className="fw-500">{`${item?.reservation.stay?.host?.firstName} ${item?.reservation.stay?.host?.lastName}`}</p>
                    <p className="fw-500">Host</p>
                  </div>
                </div>
                <div className="text-sec gap-x-1 flex items-center">
                  <FaLocationPin className="text-md" />
                  <p className="fs-500">{item.reservation.stay.address}</p>
                </div>
              </div>
              <div className="grid gap-1 md:gap-3 md:justify-end p-2">
                <div className="flex md:justify-end">
                  <p className="mt-2 text-[#9847fe] fw-600 fs-500">
                    Booked: {dayjs(item.createdDate).fromNow()}
                  </p>
                </div>
                <div className="flex gap-x-3 md:justify-end relative">
                  <p
                    className="underline text-[#9847fe] relative block cursor-pointer"
                    onClick={() => openDetail(item.trx.id)}
                  >
                    View Details
                  </p>
                  <Link
                    className="underline text-[#9847fe] relative block"
                    to={`/find-stay/${item.reservation.stay.id}`}
                  >
                    View Listing
                  </Link>
                </div>
                <div className="flex md:justify-end">
                  <LeaveReviewIndex id={`${item.reservation.stay.id}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={closeDrawer}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <BookingDetails
            id={selectedId}
            close={closeDrawer}
            refetch={refetch}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CompletedBookingList;
