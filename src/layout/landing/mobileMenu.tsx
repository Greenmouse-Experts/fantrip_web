import { FC } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import logo from "@/assets/images/auth-logo.png";
import useAuth from "@/hooks/authUser";

interface Props {
  close: () => void;
}
const MobileMenu: FC<Props> = ({ close }) => {
  const router = useNavigate();
  const { isLoggedIn} = useAuth();
  return (
    <div className="p-4 pt-6" onClick={close}>
      <div className="flex justify-between items-center">
        <img
          src={logo}
          alt="logo"
          width={150}
          height={50}
          className="w-36 lg:w-48"
        />
        <FaTimes className="text-xl cursor-pointer" onClick={close} />
      </div>
      <div className="mt-12">
        <ul className="grid gap-5">
          <li className="border-b">
            <Link to={"/"} className="px-3">
              Home
            </Link>
          </li>
          <li className="border-b">
            <Link to={"/find-stay"} className="px-3">
              Find a fan stay
            </Link>
          </li>
          <li className="border-b">
            <Link to={"/user/host-setup"} className="px-3">
              Host a fan
            </Link>
          </li>
          <li className="border-b">
            <Link to={"/area-guide"} className="px-3">
              Area Guide
            </Link>
          </li>
          <li className="border-b">
            <Link to={"/chat-room"} className="px-3">
              Chat Room
            </Link>
          </li>
          <li className="border-b">
            <Link to={"/auth/login"} className="px-3">
              Live quiz and predictions
            </Link>
          </li>
          <li className="border-b">
            <Link to={"/faqs"} className="px-3">
              FAQs
            </Link>
          </li>
          {!isLoggedIn && (
            <li className="mt-7">
              <Button
                title={"Login"}
                onClick={() => router("/auth/login")}
                altClassName="bg-primary px-4 text-white lg:px-8 py-2 rounded-lg"
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
