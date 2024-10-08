import SidebarLayout from "./sections/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/authUser";
import useDialog from "@/hooks/useDialog";
import LogoutModal from "@/modules/auth/modals/logout-modal";
import { useEffect, useState } from "react";
import PushNotification from "@/firebase/nofity";
import { CgMenuHotdog } from "react-icons/cg";
import ThemeSwitch from "@/components/theme-switch";

const UserDashboardLayout = () => {
  const { firstName, isHost } = useAuth();
  const { Dialog, setShowModal } = useDialog();
  const token = sessionStorage.getItem("fantrip_token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    } else if (!isHost) {
      navigate("/user/profile");
    }
  }, []);
  if (!token || !isHost) {
    return;
  }
  const [toggled, setToggled] = useState(false);
  return (
    <>
      <PushNotification />
      <div className="flex">
        <div className=" dark:bg-darkColor  lg:w-[280px]">
          <SidebarLayout toggled={toggled} setToggled={setToggled} />
        </div>
        <div className="w-full dark:bg-darkColor dark:text-white text-black lg:w-[calc(100%_-_280px)] min-h-screen pb-6 lg:py-9">
          <div className="">
            <div className="lg:h-[60px] flex items-center px-2 lg:px-0 lg:block bg-white dark:!bg-darkColor relative index-30">
              <CgMenuHotdog
                onClick={() => setToggled(!toggled)}
                className="text-2xl lg:hidden"
              />
              <div className="lg:fixed bg-white dark:!bg-darkColor  z-10 top-0 w-full lg:w-[calc(100%_-_280px)] pl-4 lg:pl-9 pr-5 py-4 lg:py-[23px] flex items-center justify-between">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="fw-600 lg:text-xl">
                      Welcome back, {firstName}
                    </p>
                    <p className="fs-400 hidden lg:block">
                      Manage and control all your activities on fantrip
                    </p>
                  </div>
                  <ThemeSwitch header/>
                </div>
              </div>
            </div>
            <div className="px-2 lg:px-9">
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

export default UserDashboardLayout;
