import useAuth from "@/hooks/authUser";
import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import icon_4 from "@/assets/svg/user.svg";
import icon_5 from "@/assets/svg/building-07.svg";
import icon_6 from "@/assets/svg/calendar-check-02.svg";
import icon_7 from "@/assets/svg/globe-06.svg";
import icon_8 from "@/assets/svg/ph_key.svg";
import icon_9 from "@/assets/images/ref.png";
import icon_10 from "@/assets/svg/logout.svg";

interface Props {
  close: () => void;
  mobileLogOut: (data: Boolean) => void;
}
const MobileSheet: FC<Props> = ({ close, mobileLogOut }) => {
  const { isHost, isLoggedIn } = useAuth();

  return (
    <div
      className="relative p-8 pb-12 bg-white dark:bg-darkColor"
      onClick={close}
    >
      <IoMdClose onClick={close} className="absolute top-4 right-4" />
      {isLoggedIn && (
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
                <p className="dark:text-white">Dashboard</p>
              </Link>
            ) : (
              <Link
                to={"/user/profile"}
                className="flex gap-x-3 !py-3 items-center text-black"
              >
                <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                  <img src={icon_4} alt="icons" />
                </div>
                <p className="dark:text-white">Profile</p>
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
                  <p className="dark:text-white">Reservations</p>
                </Link>
                <Link
                  to={"/user/booking"}
                  className="flex gap-x-3 items-center !py-3 text-black"
                >
                  <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                    <img src={icon_6} alt="icons" />
                  </div>
                  <p className="dark:text-white">Bookings</p>
                </Link>
                <Link
                  to={"/user/recommendations"}
                  className="flex gap-x-3 items-center !py-3 text-black"
                >
                  <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                    <img src={icon_7} alt="icons" />
                  </div>
                  <p className="dark:text-white">Reccomendations</p>
                </Link>
              </div>
            )}
            {isHost && (
              <Link
                to={"/user/guest-activity"}
                className="w-full flex gap-x-3 items-center !py-2 pl-2 pr-4 text-black "
              >
                <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                  <img src={icon_7} alt="icons" />
                </div>
                <p className="">My Fanstay trips</p>
              </Link>
            )}
            <Link
              to={isHost ? "/user/host" : "/user/host-setup"}
              className="flex gap-x-3 items-center !py-3 text-black"
            >
              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                <img src={icon_8} alt="icons" />
              </div>
              <p className="dark:text-white">Create New Listing</p>
            </Link>
            <Link
              to={
                isHost
                  ? "/host/settings?referral=true"
                  : "/user/profile?referral=true"
              }
              className="flex gap-x-3 items-center !py-3 text-black"
            >
              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                <img src={icon_9} alt="icons" />
              </div>
              <p className="dark:text-white">Referrals</p>
            </Link>

            <div
              className="flex gap-x-3 items-center !py-3 text-black"
              onClick={() => mobileLogOut(true)}
            >
              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                <img src={icon_10} alt="icons" className="w-5 h-5" />
              </div>
              <p className="">Logout</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSheet;
