import HueSpinner from "@/components/loaders/hue-spinner";
import { getHostStay } from "@/services/api/stay-api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListingFilter from "./filter";
import StayTableListing from "./table-listing";

const StayListingTable = () => {
  const [params, setParams] = useState({
    isDisclosed: null,
  });
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["get-host-stay", params],
    queryFn: () => getHostStay(params),
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
          <StayTableListing data={data?.data} refetch={refetch} />
        </div>
      )}
    </div>
  );
};

export default StayListingTable;
