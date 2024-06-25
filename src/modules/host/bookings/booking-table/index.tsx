import HueSpinner from "@/components/loaders/hue-spinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListingFilter from "./filter";
import { hostFetchBooking } from "@/services/api/booking-api";
import BookingTableListing from "./table-listing";
import { useToast } from "@chakra-ui/react";

const BookingListingTable = () => {
  const toast = useToast();
  const [params, setParams] = useState({
    status: "pending",
    page: 1,
  });

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["host-get-bookings", params],
    queryFn: () => hostFetchBooking(params),
  });

  const count = data?.count;

  const handleNext = () => {
    if (params.page * 10 >= count) {
      toast({
        title: "This is the last page",
        isClosable: true,
        position: "top",
        status: "info",
      });
    } else {
      setParams({
        ...params,
        page: params.page + 1,
      });
    }
  };

  const handlePrev = () => {
    if (params.page === 1) {
      toast({
        title: "This is the first page",
        isClosable: true,
        position: "top",
        status: "info",
      });
    } else {
      setParams({
        ...params,
        page: params.page - 1,
      });
    }
  };
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
        <div className="mt-4">
          <BookingTableListing
            data={data?.data}
            refetch={refetch}
            next={handleNext}
            prev={handlePrev}
            count={count}
            page={params.page}
          />
        </div>
      )}
    </div>
  );
};

export default BookingListingTable;
