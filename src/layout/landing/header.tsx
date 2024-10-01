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
import { FaCircleUser } from "react-icons/fa6";
import icon_1 from "@/assets/svg/nav_icon_1.svg";
import icon_2 from "@/assets/svg/nav_icon_2.svg";
import icon_3 from "@/assets/svg/nav_icon_3.svg";
import icon_4 from "@/assets/svg/user.svg";
import icon_5 from "@/assets/svg/building-07.svg";
import icon_6 from "@/assets/svg/calendar-check-02.svg";
import icon_7 from "@/assets/svg/globe-06.svg";
import icon_8 from "@/assets/svg/ph_key.svg";
import icon_9 from "@/assets/svg/logout.svg";
import icon_10 from "@/assets/images/ref.png";
import { MdAttractions } from "react-icons/md";
import MobileSheet from "./mobileSheet";
import useDialog from "@/hooks/useDialog";
import LogoutModal from "@/modules/auth/modals/logout-modal";
import ThemeSwitch from "@/components/theme-switch";

const LandingHeader = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { Dialog, setShowModal } = useDialog();
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
                          className="w-full flex gap-x-2 !py-[2px] items-center text-black "
                        >
                          <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                            <img src={icon_1} alt="icons" />
                          </div>
                          <p className="fs-500 ">Area Guide</p>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to={"/chat-room"}
                          className="w-full flex gap-x-2 !py-[2px] items-center text-black "
                        >
                          <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                            <img src={icon_2} alt="icons" />
                          </div>
                          <p className="fs-500 ">Chat Room</p>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to={"/chat-room?quiz=true"}
                          className="flex gap-x-2 !py-[2px] items-center text-black"
                        >
                          <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                            <img src={icon_3} alt="icons" />
                          </div>
                          <p className="fs-500 ">Live quiz and predictions</p>
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
                        <MenuItem className="border-b !p-0">
                          {isHost ? (
                            <Link
                              to={"/host"}
                              className="w-full flex gap-x-3 !py-2 pl-2 pr-4 items-center text-black   "
                            >
                              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                                <img src={icon_4} alt="icons" />
                              </div>
                              <p className="" >Dashboard</p>
                            </Link>
                          ) : (
                            <Link
                              to={"/user/profile"}
                              className="w-full flex gap-x-3 !py-2 pl-2 pr-4 items-center text-black "
                            >
                              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                                <img src={icon_4} alt="icons" />
                              </div>
                              <p className="">Profile</p>
                            </Link>
                          )}
                        </MenuItem>
                        {!isHost && (
                          <MenuItem className="border-b !p-0">
                            <Link
                              to={"/user/reservation"}
                              className="w-full flex gap-x-3 pl-2 items-center !py-2 text-black "
                            >
                              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                                <img src={icon_5} alt="icons" />
                              </div>
                              <p className="">Reservations</p>
                            </Link>
                          </MenuItem>
                        )}
                        {!isHost && (
                          <MenuItem className="border-b !p-0">
                            <Link
                              to={"/user/booking"}
                              className="w-full flex gap-x-3 items-center !py-2 pl-2 text-black "
                            >
                              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                                <img src={icon_6} alt="icons" />
                              </div>
                              <p>Bookings</p>
                            </Link>
                          </MenuItem>
                        )}
                        {!isHost && (
                          <MenuItem className="border-b !p-0">
                            <Link
                              to={"/user/recommendations"}
                              className="w-full flex gap-x-3 items-center !py-2 pl-2 pr-4 text-black "
                            >
                              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                                <img src={icon_7} alt="icons" />
                              </div>
                              <p className="">Recommendations</p>
                            </Link>
                          </MenuItem>
                        )}
                        <MenuItem className="!p-0">
                          <Link
                            to={isHost ? "/user/host" : "/user/host-setup"}
                            className="w-full flex gap-x-3 items-center !py-2 pl-2 pr-4 text-black "
                          >
                            <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                              <img src={icon_8} alt="icons" />
                            </div>
                            <p className="">Create New Listing</p>
                          </Link>
                        </MenuItem>
                        <MenuItem className="!p-0">
                          <Link
                            className="w-full flex gap-x-3 items-center !py-2 pl-2 pr-4 text-black "
                            to={
                              isHost
                                ? "/host/settings?referral=true"
                                : "/user/profile?referral=true"
                            }
                          >
                            <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                            <img src={icon_10} alt="icons" className="w-full h-full" />
                            </div>
                            <p className="">Referrals</p>
                          </Link>
                        </MenuItem>
                        {!isHost && (
                          <MenuItem className="border-b !p-0">
                            <Link
                              to={"/user/notifications"}
                              className="w-full flex gap-x-3 items-center !py-2 pl-2 pr-4 text-black "
                            >
                              <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                                <img src={icon_7} alt="icons" />
                              </div>
                              <p className="">Notifications</p>
                            </Link>
                          </MenuItem>
                        )}
                        <MenuItem className="!p-0">
                          <div
                            className="w-full flex gap-x-3 items-center !py-2 pl-2 pr-4 text-black "
                            onClick={() => setShowModal(true)}
                          >
                            <div className="w-[46px] h-[46px] circle place-center bg-[#EDEDFF]">
                            <img src={icon_9} alt="icons" className="w-5 h-5" />
                            </div>
                            <p className="">Logout</p>
                          </div>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </li>
                )}
                <ThemeSwitch header/>
              </ul>
            </div>
          </div>
        </div>
        <Dialog title="" size="xs">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Dialog>
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
