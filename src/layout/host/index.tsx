
import SidebarLayout from "./sections/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/authUser";
import useDialog from "@/hooks/useDialog";
import LogoutModal from "@/modules/auth/modals/logout-modal";
import { useEffect } from "react";

const UserDashboardLayout = () => {
  const { firstName, isHost } = useAuth();
  const { Dialog, setShowModal } = useDialog();
  const token = sessionStorage.getItem('fantrip_token')
  const navigate = useNavigate()
  useEffect(() => {
    if(!token){
      navigate("/auth/login");
    }else if(!isHost){
      navigate("/user/profile");
    }
  }, [])
  if (!token || !isHost) {
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

export default UserDashboardLayout;
