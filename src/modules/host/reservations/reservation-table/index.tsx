import HueSpinner from "@/components/loaders/hue-spinner";
import { guestFetchReservation } from "@/services/api/booking-api";
import { useQuery } from "@tanstack/react-query";
import ReserveItemDisplay from "./reserve-item";
import { BookingItem } from "@/lib/contracts/booking";
import { useEffect, useState } from "react";
import ReservationFilter from "./filter";
import PaginationIndex from "@/modules/landing/find-stay/fetch-component/pagination";

const ReservationListingTable = () => {
  const [page, setPage] = useState(1)
  const [params, setParams] = useState({
    status: "all",
    page: page,
  });

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["host-get-reservations", params],
    queryFn: () => guestFetchReservation(params),
  });

  useEffect(() => {
    setParams({
      ...params,
      page: page
    })
  },[page])

  const total = data?.count || 0

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
      <div className="flex justify-center mt-12 lg:mt-24">
        <PaginationIndex total={total} page={params.page} setPage={setPage}/>
      </div>
    </div>
  );
};

export default ReservationListingTable;
