import Tabs from "@/components/Tabs";
import PendingReservation from "./tabs/pending-reservation";
import ConfirmedReservation from "./tabs/confirmed-reservation";
import CancelledReservation from "./tabs/cancelled-reservation";

const GuestReservationIndex = () => {
  const reservationTabs = [
    {
      title: <p>Pending Reservations</p>,
      content: <PendingReservation/>
    },
    {
      title: <p>Confirmed Reservations</p>,
      content: <ConfirmedReservation/>
    },
    {
      title: <p>Cancelled Reservations</p>,
      content: <CancelledReservation/>
    },
  ]
  return (
    <div>
      <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
      <div className="box py-6 min-h-[70vh]">
        <Tabs tabs={reservationTabs} type="charts"/>
      </div>
    </div>
  );
};

export default GuestReservationIndex;
