import PyramidSpin from "@/components/loaders/pyramid-spin";
import { guestFetchBooking } from "@/services/api/booking-api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CancelledBookingList from "./components/booking-lisiting";
import EmptyNetState from "@/components/empty-states/empty-net";
import useAuth from "@/hooks/authUser";

const CancelledBookings = () => {
  const { isHost } = useAuth();
  const [params, setParams] = useState({
    status: "cancelled",
    page: 1,
    isGuest: isHost,
  });
  const { isLoading, data, refetch } = useQuery({
    queryFn: () => guestFetchBooking(params),
    queryKey: ["get-cancelled-booking", params.status],
  });
  const handleNext = () => {
    setParams({
      ...params,
      page: 2,
    });
  };
  return (
    <div>
      {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <CancelledBookingList
          refetch={refetch}
          data={data?.data}
          next={handleNext}
        />
      )}
      {!isLoading && !data?.data?.length && (
        <div>
          <EmptyNetState text="There is no cancelled booking data available now." />
        </div>
      )}
    </div>
  );
};

export default CancelledBookings;
