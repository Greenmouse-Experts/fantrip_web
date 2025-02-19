import { useLocation } from "react-router-dom";
import GuestActivity from "./guest-activity";
import PaymentModalWrapper from "./payment-modal-wrapper";

const GuestActivityWrapper = () => {
    const location = useLocation();
    return (
      <>
        <GuestActivity />
        {/* If modal route is active, render the modal */}
        {location.pathname.includes("/user/guest-activity/payment") && (
          <PaymentModalWrapper />
        )}
      </>
    );
  };

  export default GuestActivityWrapper;