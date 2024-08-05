import useAuth from "@/hooks/authUser";
import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import icon_4 from "@/assets/svg/user.svg";
import icon_5 from "@/assets/svg/building-07.svg";
import icon_6 from "@/assets/svg/calendar-check-02.svg";
import icon_7 from "@/assets/svg/globe-06.svg";
import icon_8 from "@/assets/svg/ph_key.svg";

interface Props {
  close: () => void;
}
const MobileSheet: FC<Props> = ({ close }) => {
  const { isHost } = useAuth();
  return (
    <div className="relative p-8 pb-12" onClick={close}>
      <IoMdClose onClick={close} className="absolute top-4 right-4" />
      <div>
        <div>
          {isHost ? (
            <Link
              to={"/host"}
              className="flex gap-x-3 !py-3 items-center text-black"
            >
              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                <img src={icon_4} alt="icons" />
              </div>
              <p>Dashboard</p>
            </Link>
          ) : (
            <Link
              to={"/user/profile"}
              className="flex gap-x-3 !py-3 items-center text-black"
            >
              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                <img src={icon_4} alt="icons" />
              </div>
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
                <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                  <img src={icon_5} alt="icons" />
                </div>
                <p>Reservations</p>
              </Link>
              <Link
                to={"/user/booking"}
                className="flex gap-x-3 items-center !py-3 text-black"
              >
                <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                  <img src={icon_6} alt="icons" />
                </div>
                <p>Bookings</p>
              </Link>
              <Link
                to={"/user/recommendations"}
                className="flex gap-x-3 items-center !py-3 text-black"
              >
                <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                  <img src={icon_7} alt="icons" />
                </div>
                <p>Reccomendations</p>
              </Link>
            </div>
          )}
          <Link
            to={isHost ? "/user/host" : "/user/host-setup"}
            className="flex gap-x-3 items-center !py-3 text-black"
          >
            <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
              <img src={icon_8} alt="icons" />
            </div>
            <p>Create New Listing</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileSheet;
