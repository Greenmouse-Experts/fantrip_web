import HueSpinner from "@/components/loaders/hue-spinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListingFilter from "./filter";
import { hostFetchBooking } from "@/services/api/booking-api";
import BookingTableListing from "./table-listing";

const BookingListingTable = () => {
  const [params, setParams] = useState({
    isDisclosed: 1,
  });
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["host-get-reservations", params],
    queryFn: () => hostFetchBooking(),
  });
  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && data && (
        <ListingFilter setParams={setParams} param={params} />
      )}
      {!isLoading && !!data?.data?.length && (
        <div>
          <BookingTableListing data={data?.data} refetch={refetch} />
        </div>
      )}
    </div>
  );
};

export default BookingListingTable;
