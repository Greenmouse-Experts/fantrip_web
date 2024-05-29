import PyramidSpin from "@/components/loaders/pyramid-spin";
import { guestFetchBooking } from "@/services/api/booking-api";
import { useQuery } from "@tanstack/react-query";
import PendingBookingList from "./components/booking-lisiting";
import { useState } from "react";
import EmptyNetState from "@/components/empty-states/empty-net";

const PendingBookings = () => {
  const [params, setParams] = useState({
    status: 'pending'
  })
  const { isLoading, data, refetch } = useQuery({
    queryFn: () => guestFetchBooking(params),
    queryKey: ["get-guest-booking", params.status],
  });
  return (
    <div>
      {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <PendingBookingList refetch={refetch} data={data?.data} />
      )}
       {!isLoading && !data?.data?.length && (
        <div>
          <EmptyNetState text="There is pending booking data available now." />
        </div>
      )}
    </div>
  );
};

export default PendingBookings;
