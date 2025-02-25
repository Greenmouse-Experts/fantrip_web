import PyramidSpin from "@/components/loaders/pyramid-spin";
import { guestFetchReservation } from "@/services/api/booking-api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EmptyNetState from "@/components/empty-states/empty-net";
import { RESERVATION_STATUS } from "@/lib/contracts/enums";
import { FetchParam } from "@/lib/contracts/routine";
import ConfirmedReservationList from "./components/reservation-lisiting";
import useAuth from "@/hooks/authUser";

const ConfirmedReservation = () => {
  const { isHost } = useAuth();
  const [params, setParams] = useState<FetchParam>({
    status: RESERVATION_STATUS.CONFIRMED,
    page: 1,
    isGuest: isHost,
  });

  const { isLoading, data, refetch } = useQuery({
    queryFn: () => guestFetchReservation(params),
    queryKey: ["get-guest-resevation", params.status],
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
        <ConfirmedReservationList
          refetch={refetch}
          data={data?.data}
          next={handleNext}
        />
      )}
      {!isLoading && !data?.data?.length && (
        <div>
          <EmptyNetState text="There is no confirmed Reservation data available now." />
        </div>
      )}
    </div>
  );
};

export default ConfirmedReservation;
