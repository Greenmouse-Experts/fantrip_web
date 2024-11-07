import { FC } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import logo from "@/assets/images/auth-logo.png";
import logoDark from "@/assets/logo_1.svg";
import useAuth from "@/hooks/authUser";
import icon_1 from "@/assets/svg/nav_icon_1.svg";
import icon_2 from "@/assets/svg/nav_icon_2.svg";
import icon_3 from "@/assets/svg/nav_icon_3.svg";
import icon_4 from "@/assets/svg/user.svg";
import icon_5 from "@/assets/svg/building-07.svg";
// import icon_6 from "@/assets/svg/calendar-check-02.svg";
import icon_7 from "@/assets/svg/globe-06.svg";
import icon_8 from "@/assets/svg/ph_key.svg";
import ThemeSwitch from "@/components/theme-switch";

interface Props {
  close: () => void;
}
const MobileMenu: FC<Props> = ({ close }) => {
  const router = useNavigate();
  const { isLoggedIn } = useAuth();
  return (
    <div className="p-4 pt-6 bg-white dark:bg-darkColor h-full" onClick={close}>
      <div className="flex justify-between items-center">
        <img
          src={logo}
          alt="logo"
          width={150}
          height={50}
          className="w-36 lg:w-48 dark:hidden"
        />
        <img
          src={logoDark}
          alt="logo"
          width={150}
          height={50}
          className="w-36 lg:w-48 hidden dark:block"
        />
        <FaTimes className="text-xl cursor-pointer" onClick={close} />
      </div>
      <div className="mt-12 text-black dark:text-white">
        <ul className="grid gap-8">
          <li className="border-b">
            <Link to={"/"} className="px-3 flex items-center gap-2 pb-1">
              <span>
                <img src={icon_4} alt="" />
              </span>
              <span></span>
              Home
            </Link>
          </li>
          <li className="border-b">
            <Link
              to={"/find-stay"}
              className="px-3 flex items-center gap-2 pb-1"
            >
              <span>
                <img src={icon_5} alt="" />
              </span>
              Find a fan stay
            </Link>
          </li>
          <li className="border-b">
            <Link
              to={"/user/host-setup"}
              className="px-3 flex items-center gap-2 pb-1"
            >
              <span>
                <img src={icon_8} alt="" />
              </span>
              Host a fan
            </Link>
          </li>
          <li className="border-b">
            <Link
              to={"/area-guide"}
              className="px-3 flex items-center gap-2 pb-1"
            >
              <span>
                <img src={icon_1} alt="" />
              </span>
              Area Guide
            </Link>
          </li>
          <li className="border-b">
            <Link
              to={"/chat-room"}
              className="px-3 flex items-center gap-2 pb-1"
            >
              <span>
                <img src={icon_2} alt="" />
              </span>
              Chat Room
            </Link>
          </li>
          <li className="border-b">
            <Link
              to={"/chat-room?quiz=true"}
              className="px-3 flex items-center gap-2 pb-1"
            >
              <span>
                <img src={icon_3} alt="" />
              </span>
              Live quiz and predictions
            </Link>
          </li>
          <li className="border-b">
            <Link to={"/faqs"} className="px-3 flex items-center gap-2 pb-1">
              <span>
                <img src={icon_7} alt="" />
              </span>
              FAQs
            </Link>
          </li>
          {!isLoggedIn && (
            <li className="mt-7">
              <Button
                title={"Login"}
                onClick={() => router("/auth/login")}
                altClassName="bg-primary dark:!bg-[#9847FE] px-4 text-white lg:px-8 py-2 rounded-lg"
              />
            </li>
          )}
          <li className="px-3">
            <ThemeSwitch />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
