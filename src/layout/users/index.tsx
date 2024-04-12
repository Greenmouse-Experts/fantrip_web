import { Outlet } from "react-router-dom";
import LandingHeader from "../landing/header";
import LandingFooter from "../landing/footer";
import ScrollToTop from "@/lib/utils/scrollTop";

const UserLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <LandingHeader />
      <Outlet />
      <LandingFooter />
    </div>
  );
};

export default UserLayout;
