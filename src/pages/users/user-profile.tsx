import useDialog from "@/hooks/useDialog";
import ProfileComponent from "@/modules/users/profile";
import FirstTimeInfo from "@/modules/users/profile/profile-components/first-time-info";
import Cookies from "js-cookie";
import { useEffect } from "react";

const UserProfile = () => {
  const { Dialog, setShowModal } = useDialog();
  const firstTime = Cookies.get("fantrip_user");
  useEffect(() => {
    Cookies.set("fantrip_user", `${1}`);
    if (!firstTime) {
      setShowModal(true);
    }
  }, []);

  return (
    <div>
      <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
      <div className="section">
        <div className="box">
          <ProfileComponent />
        </div>
      </div>
      <Dialog title="" size="md">
        <FirstTimeInfo/>
      </Dialog>
    </div>
  );
};

export default UserProfile;
