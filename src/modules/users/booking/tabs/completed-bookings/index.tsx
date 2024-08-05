import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PyramidSpin from "@/components/loaders/pyramid-spin";
import { guestFetchBooking } from "@/services/api/booking-api";
import EmptyNetState from "@/components/empty-states/empty-net";
import { FetchParam } from "@/lib/contracts/routine";
import CompletedBookingList from "./components/booking-lisiting";

const CompletedBookings = () => {
  const [params, setParams] = useState<FetchParam>({
    status: "checked-out",
    page: 1
  })
  const { isLoading, data, refetch } = useQuery({
    queryFn: () => guestFetchBooking(params),
    queryKey: ["get-completed-booking", params],
  });
  const handleNext = () => {
    setParams({
      ...params,
      page: 2
    })
  }
  return (
    <div>
      {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <CompletedBookingList refetch={refetch} data={data?.data} next={handleNext}/>
      )}
       {!isLoading && !data?.data?.length && (
        <div>
          <EmptyNetState text="There is no pending booking data available now." />
        </div>
      )}
    </div>
  );
};

export default CompletedBookings;
