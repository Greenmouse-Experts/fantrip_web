import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LandingHeader from "../landing/header";
import LandingFooter from "../landing/footer";
import ScrollToTop from "@/lib/utils/scrollTop";
import { useEffect } from "react";
import ChatProvider from "../chat/chat-provider";
import PushNotification from "@/firebase/nofity";

const UserLayout = () => {
  const token = sessionStorage.getItem("fantrip_token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    localStorage.setItem('cachedURL', JSON.stringify(location.pathname));
  }, []);
  if (!token) {
    return;
  }
  return (
    <div>
      <PushNotification />
      <ScrollToTop />
      <LandingHeader />
      <ChatProvider />
      <Outlet />
      <LandingFooter />
    </div>
  );
};

export default UserLayout;
