import useAuth from "@/hooks/authUser";
import { FC } from "react";
import { FaRegUser } from "react-icons/fa6";
import { GiBlackBook } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { RiHotelLine } from "react-icons/ri";
import { Link } from "react-router-dom";
interface Props {
  close: () => void;
}
const MobileSheet: FC<Props> = ({ close }) => {
  const { isHost } = useAuth();
  return (
    <div className="relative p-8 pb-12">
      <IoMdClose onClick={close} className="absolute top-4 right-4" />
      <div>
        <div>
          {!isHost ? (
            <Link
              to={"/host"}
              className="flex gap-x-3 !py-3 items-center text-black"
            >
              <FaRegUser className="text-xl" />
              <p>Dashboard</p>
            </Link>
          ) : (
            <Link
              to={"/user/profile"}
              className="flex gap-x-3 !py-3 items-center text-black"
            >
              <FaRegUser className="text-xl" />
              <p>Profile</p>
            </Link>
          )}
        </div>
        <div>
          {!isHost && (
            <div>
              <Link
                to={"/user/reservation"}
                className="flex gap-x-3 items-center !py-3 text-black"
              >
                <RiHotelLine className="text-xl" />
                <p>Reservations</p>
              </Link>
              <Link
                to={"/user/booking"}
                className="flex gap-x-3 items-center !py-3 text-black"
              >
                <GiBlackBook className="text-lg" />
                <p>Bookings</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSheet;
