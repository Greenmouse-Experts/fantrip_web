import logo from "@/assets/logo_1.svg";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import MobileMenu from "./mobileMenu";
import useAuth from "@/hooks/authUser";
import { FaCircleUser, FaRegUser } from "react-icons/fa6";
import { LuKeyRound } from "react-icons/lu";
import { RiHotelLine } from "react-icons/ri";
import { GiBlackBook } from "react-icons/gi";
import icon_1 from "@/assets/svg/nav_icon_1.svg";
import icon_2 from "@/assets/svg/nav_icon_2.svg";
import icon_3 from "@/assets/svg/nav_icon_3.svg";
import icon_4 from "@/assets/svg/nav_icon_4.svg";
import { MdAttractions } from "react-icons/md";
import MobileSheet from "./mobileSheet";
import { FaRegThumbsUp } from "react-icons/fa";

const LandingHeader = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { isLoggedIn, isHost, isVerified } = useAuth();
  return (
    <div>
      <div className="absolute z-10 left-0 top-6 w-full">
        <div className="box duration-100">
          <div
            className={` bg-[#FFFFFF33] rounded-[50px] px-5 py-4 lg:py-5 lg:px-12 flex justify-between items-center`}
          >
            <div className="lg:hidden text-white">
              <TiThMenuOutline
                className="text-xl cursor-pointer"
                onClick={() => setOpen(true)}
              />
            </div>
            <div>
              <Link to={"/"}>
                <img src={logo} alt="logo" className="w-28 lg:w-auto" />
              </Link>
            </div>
            <div>
              <div className="lg:hidden text-white">
                <MdAttractions
                  className="text-2xl cursor-pointer"
                  onClick={() => setShow(true)}
                />
              </div>
              <ul className="hidden lg:flex items-center gap-x-6 lg:gap-x-10 text-white">
                <li className="hidden xl:block">
                  <Link to={"/get-app"}>Get the app</Link>
                </li>
                <li>
                  <Menu>
                    <MenuButton>
                      <div className="flex gap-x-2 items-center">
                        Features{" "}
                        <ChevronDownIcon size={14} className="text-xs" />
                      </div>
                    </MenuButton>
                    <MenuList>
                      <MenuItem>
                        <Link
                          to={"/area-guide"}
                          className="flex gap-x-2 !py-[2px] items-center text-black"
                        >
                          <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                            <img src={icon_1} alt="icons" />
                          </div>
                          <p className="fs-500">Matchday Area Guide</p>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to={"/chat-room"}
                          className="flex gap-x-2 !py-[2px] items-center text-black"
                        >
                          <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                            <img src={icon_2} alt="icons" />
                          </div>
                          <p className="fs-500">Chat Room</p>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to={"/auth/login"}
                          className="flex gap-x-2 !py-[2px] items-center text-black"
                        >
                          <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                            <img src={icon_3} alt="icons" />
                          </div>
                          <p className="fs-500">Live quiz and predictions</p>
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </li>
                <li>
                  <Link to={"/find-stay"}>Find a fan stay</Link>
                </li>
                <li>
                  <Link to={isVerified ? "/user/host" : "/user/host-setup"}>
                    Host a fan
                  </Link>
                </li>
                <li>
                  <Link to={"/faqs"}>FAQs</Link>
                </li>
                {!isLoggedIn && (
                  <li>
                    <Link to={"/auth/login"}>Login</Link>
                  </li>
                )}
                {isLoggedIn && (
                  <li>
                    <Menu>
                      <MenuButton className="p-0 m-0">
                        <div className="flex gap-x-2 items-center relative top-[2px]">
                          <FaCircleUser className="text-xl xl:text-2xl" />
                        </div>
                      </MenuButton>
                      <MenuList>
                        <MenuItem className="border-b">
                          {isHost ? (
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
                        </MenuItem>
                        {!isHost && (
                          <MenuItem className="border-b">
                            <Link
                              to={"/user/reservation"}
                              className="flex gap-x-3 items-center !py-3 text-black"
                            >
                              <RiHotelLine className="text-xl" />
                              <p>Reservations</p>
                            </Link>
                          </MenuItem>
                        )}
                        {!isHost && (
                          <MenuItem className="border-b">
                            <Link
                              to={"/user/booking"}
                              className="flex gap-x-3 items-center !py-3 text-black"
                            >
                              <GiBlackBook className="text-lg" />
                              <p>Bookings</p>
                            </Link>
                          </MenuItem>
                        )}
                        {!isHost && (
                          <MenuItem className="border-b">
                            <Link
                              to={"/user/recommendations"}
                              className="flex gap-x-3 items-center !py-3 text-black"
                            >
                              <FaRegThumbsUp className="text-xl" />
                              <p>Recommendations</p>
                            </Link>
                          </MenuItem>
                        )}
                        <MenuItem className="">
                          <Link
                            to={isHost ? "/user/host" : "/user/host-setup"}
                            className="flex gap-x-3 items-center !py-3 text-black"
                          >
                            <LuKeyRound className="text-xl" />
                            <p>Create New Listing</p>
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        isOpen={show}
        placement="bottom"
        size={"xs"}
        onClose={() => setShow(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <MobileSheet close={() => setShow(false)} />
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={open}
        placement="left"
        size={"xs"}
        onClose={() => setOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <MobileMenu close={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default LandingHeader;
