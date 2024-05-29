import PyramidSpin from "@/components/loaders/pyramid-spin";
import { guestFetchBooking } from "@/services/api/booking-api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmedBookingList from "./components/booking-lisiting";
import EmptyNetState from "@/components/empty-states/empty-net";

const ConfirmedBooking = () => {
  const [params, setParams] = useState({
    status: "completed",
  });
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
        <ConfirmedBookingList refetch={refetch} data={data?.data} />
      )}
      {!isLoading && !data?.data?.length && (
        <div>
          <EmptyNetState text="There is confirmed booking data available now." />
        </div>
      )}
    </div>
  );
};

export default ConfirmedBooking;
