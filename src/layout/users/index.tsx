import { Outlet, useNavigate } from "react-router-dom";
import LandingHeader from "../landing/header";
import LandingFooter from "../landing/footer";
import ScrollToTop from "@/lib/utils/scrollTop";
import { useEffect } from "react";
import ChatProvider from "../chat/chat-provider";

const UserLayout = () => {
  const token = sessionStorage.getItem('fantrip_token')
  const navigate = useNavigate()
  useEffect(() => {
    if(!token){
      navigate("/auth/login");
    }
  }, [])
  if (!token) {
    return;
  }
  return (
    <div>
      <ScrollToTop />
      <LandingHeader />
      <ChatProvider/>
      <Outlet />
      <LandingFooter />
    </div>
  );
};

export default UserLayout;
