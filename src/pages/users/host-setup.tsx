import useAuth from "@/hooks/authUser";
import HostSetupIndex from "@/modules/users/host/setup";
import SetupCompleted from "@/modules/users/setup-success";
import { useState } from "react";

const HostSetup = () => {
  const { isHost } = useAuth();
  const [showSetup, setShowSetup] = useState(!isHost);
  return (
    <div>
      <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
      <div className="section">
        <div className="box">
          {!showSetup && (
            <SetupCompleted showSetup={() => setShowSetup(true)} />
          )}
          {showSetup && <HostSetupIndex />}
        </div>
      </div>
    </div>
  );
};

export default HostSetup;
