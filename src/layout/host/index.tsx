
import SidebarLayout from "./sections/sidebar";
import { BsGear } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/authUser";
import useDialog from "@/hooks/useDialog";
import LogoutModal from "@/modules/auth/modals/logout-modal";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { IoMdLogOut } from "react-icons/io";
import ProfileAvatar from "@/components/ProfileAvatar";
import { useEffect } from "react";

const AdminDashboardLayout = () => {
  const { user, firstName } = useAuth();
  const { Dialog, setShowModal } = useDialog();
  const token = sessionStorage.getItem('fantrip_token')
  const navigate = useNavigate()
  useEffect(() => {
    if(!token){
      navigate("/auth/login");
    }
  }, [])
  if (!token || user.account !== 'admin') {
    return;
  }
  return (
    <>
      <div className="flex">
        <div className=" bg-[#0D0D0D] lg:w-[280px]">
          <SidebarLayout />
        </div>
        <div className="w-full bg-black text-white lg:w-[calc(100%_-_280px)] min-h-screen py-4 lg:py-9">
          <div className="">
            <div className="h-[60px] relative index-30">
              <div className="fixed top-0 w-full lg:w-[calc(100%_-_280px)] pl-9 pr-5 py-4 lg:py-[23px] flex items-center justify-between">
               <div>
               <p className="fw-600 lg:text-xl">Welcome back, {firstName}</p>
                <p className="fs-400">Manage and control all your activities on fantrip</p>
               </div>
                <div className="flex gap-x-5 items-center">
                  {/* <NotifyDrop/> */}
                  <div className="flex gap-x-4 items-center">
                    <ProfileAvatar
                      url={user.image}
                      name={user.name}
                      size={44}
                      font={17}
                      type="dark"
                    />
                    <div className="hidden lg:flex gap-x-4 items-center cursor-pointer">
                      <Menu>
                        <MenuButton className="p-0 m-0">
                          <div className="flex gap-x-2 items-center relative top-[2px]">
                            <p className="fw-500">{user.name}</p>
                            <MdOutlineKeyboardArrowDown className="text-xl" />
                          </div>
                        </MenuButton>
                        <MenuList>
                          <MenuItem className="">
                            <Link
                              to={"/admin/settings"}
                              className="flex gap-x-3 !py-2 items-center text-black"
                            >
                              <BsGear className="text-xl" />
                              <p>Settings</p>
                            </Link>
                          </MenuItem>
                          <MenuItem className="">
                            <div
                              onClick={() => setShowModal(true)}
                              className="flex gap-x-3 items-center !py-2 text-black"
                            >
                              <IoMdLogOut className="text-xl" />
                              <p>Logout</p>
                            </div>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 lg:px-9">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Dialog title="" size="xs">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Dialog>
    </>
  );
};

export default AdminDashboardLayout;
