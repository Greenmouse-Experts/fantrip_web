import Tabs from "@/components/Tabs";
// import BookingIndex from "../booking";
// import ReservationIndex from "../reservation";

const GuestActivityIndex = () => {
  const notifyTabs = [
    {
      title: <div className="flex item-end gap-x-6 lg:text-lg">Reservations</div>,
      content: (
        //   <ReservationIndex host/>
        <></>
      ),
    },
    {
      title: <div className="flex item-end gap-x-6 lg:text-lg">Bookings</div>,
      content: (
        //   <BookingIndex host/>
        <></>
      ),
    },
  ];
  return (
    <div>
      <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
      <div className="box py-6 min-h-[70vh]">
        <Tabs tabs={notifyTabs} type="norm" />
      </div>
    </div>
  );
};

export default GuestActivityIndex;
