import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PyramidSpin from "@/components/loaders/pyramid-spin";
import { guestFetchBooking } from "@/services/api/booking-api";
import PendingBookingList from "./components/booking-lisiting";
import EmptyNetState from "@/components/empty-states/empty-net";
import { FetchParam } from "@/lib/contracts/routine";
import useAuth from "@/hooks/authUser";

const OngoingBookings = () => {
  const { isHost } = useAuth();
  const [params, setParams] = useState<FetchParam>({
    status: "checked-in",
    page: 1,
    isGuest: isHost,
  });
  const { isLoading, data, refetch } = useQuery({
    queryFn: () => guestFetchBooking(params),
    queryKey: ["get-ongoing-booking", params],
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
        <PendingBookingList
          refetch={refetch}
          data={data?.data}
          next={handleNext}
        />
      )}
      {!isLoading && !data?.data?.length && (
        <div>
          <EmptyNetState text="There is no ongoing booking data available now." />
        </div>
      )}
    </div>
  );
};

export default OngoingBookings;
