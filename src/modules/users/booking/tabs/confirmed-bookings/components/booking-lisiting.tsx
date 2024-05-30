import { FC, useState } from "react";
import { BookingItem } from "@/lib/contracts/booking";
import dayjs from "dayjs";
import { FaLocationPin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProfileAvatar from "@/components/ProfileAvatar";
import { Drawer, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import BookingDetails from "../../../components/booking-details";

interface Props {
  data: BookingItem[];
  refetch: () => void;
  next: () => void
}
const ConfirmedBookingList: FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const closeDrawer = () => setIsOpen(false);
  const openDetail = (id: string) => {
    setSelectedId(id);
    setIsOpen(true);
  };
  return (
    <div className="grid gap-4 mt-4">
      {data.map((item: BookingItem) => (
        <div className="bg-gradient rounded-lg p-[2px]" key={item.id}>
          <div className="bg-white rounded-lg flex gap-x-4 p-1 h-full">
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
                    name={`${item?.stay?.host?.firstName} ${item.stay?.host?.lastName}`}
                    url={item?.stay?.host?.picture}
                    size={40}
                    font={14}
                  />
                  <div>
                    <p className="fw-500">{`${item?.stay?.host?.firstName} ${item?.stay?.host?.lastName}`}</p>
                    <p className="fw-500">Host</p>
                  </div>
                </div>
                <div className="text-sec gap-x-1 flex items-center">
                  <FaLocationPin className="text-md" />
                  <p className="fs-500">{item.stay.address}</p>
                </div>
              </div>
              <div className="grid gap-3 justify-end p-2">
                <div className="flex justify-end">
                  <p className="mt-2 text-[#9847fe] fw-600 fs-500">
                    Booked: {dayjs(item.createdDate).fromNow()}
                  </p>
                </div>
                <div className="flex gap-x-3 justify-end relative">
                  <p
                    className="underline text-[#9847fe] relative block cursor-pointer"
                    onClick={() => openDetail(item.id)}
                  >
                    View Details
                  </p>
                  <Link
                    className="underline text-[#9847fe] relative block"
                    to={`/find-stay/${item.stay.id}`}
                  >
                    View Listing
                  </Link>

                  {/* <CancelBooking id={item.id} refetch={refetch} /> */}
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
          <BookingDetails id={selectedId} close={closeDrawer} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ConfirmedBookingList;
