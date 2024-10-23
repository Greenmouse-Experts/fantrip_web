import ReservationListingTable from "./reservation-table";

const ReservationIndex = () => {
  return (
    <div>
      <div>
        <p className="text-xl syne fw-600 dark:text-white">Guest Reservations</p>
      </div>
      <div className="mt-6">
        <ReservationListingTable />
      </div>
    </div>
  );
};

export default ReservationIndex;
