import Tabs from "@/components/Tabs";
import CancelledBooking from "./tabs/cancelled-bookings";
import ConfirmedBooking from "./tabs/confirmed-bookings";
import CompletedBookings from "./tabs/completed-bookings";

const BookingIndex = () => {
  const bookingTabs = [
    {
      title: <p>Confirmed Bookings</p>,
      content: <ConfirmedBooking/>
    },
    {
      title: <p>Completed Bookings</p>,
      content: <CompletedBookings/>
    },
    {
      title: <p>Cancelled Bookings</p>,
      content: <CancelledBooking/>
    },
  ]
  return (
    <div>
      <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
      <div className="box py-6 min-h-[70vh]">
        <Tabs tabs={bookingTabs} type="charts"/>
      </div>
    </div>
  );
};

export default BookingIndex;
