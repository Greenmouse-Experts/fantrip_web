import HueSpinner from "@/components/loaders/hue-spinner";
import { guestFetchReservation } from "@/services/api/booking-api";
import { useQuery } from "@tanstack/react-query";
import ReserveItemDisplay from "./reserve-item";
import { BookingItem } from "@/lib/contracts/booking";
import { useState } from "react";
import ReservationFilter from "./filter";

const ReservationListingTable = () => {
  const [params, setParams] = useState({
    status: "all",
    page: 1,
  });

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["host-get-reservations", params],
    queryFn: () => guestFetchReservation(params),
  });

  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && data?.data && (
        <ReservationFilter setParams={setParams} param={params} />
      )}
      <div className="grid lg:grid-cols-2 gap-4 items-stretch mt-3">
        {!isLoading &&
          !!data?.data?.length &&
          data.data.map((item: BookingItem) => (
            <ReserveItemDisplay key={item.id} data={item} refetch={refetch} />
          ))}
      </div>
    </div>
  );
};

export default ReservationListingTable;
