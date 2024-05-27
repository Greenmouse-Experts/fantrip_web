import PyramidSpin from "@/components/loaders/pyramid-spin";
import { guestFetchBooking } from "@/services/api/booking-api";
import { useQuery } from "@tanstack/react-query";
import PendingBookingList from "./components/booking-lisiting";

const PendingBookings = () => {
  const { isLoading, data, refetch } = useQuery({
    queryFn: guestFetchBooking,
    queryKey: ["get-guest-booking"],
  });
  return (
    <div>
      {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {!isLoading && data && (
        <PendingBookingList refetch={refetch} data={data?.data} />
      )}
    </div>
  );
};

export default PendingBookings;
