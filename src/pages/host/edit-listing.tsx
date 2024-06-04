import PyramidSpin from "@/components/loaders/pyramid-spin";
import EditListingIndex from "@/modules/host/listings/edit-listing";
import { getSingleStay } from "@/services/api/stay-api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const HostEditListing = () => {
  const { id } = useParams();
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["get-single-stay", id],
    queryFn: () => getSingleStay(`${id}`),
  });
  return (
    <div>
      {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {!isLoading && data && <EditListingIndex data={data} refetch={refetch} />}
    </div>
  );
};

export default HostEditListing;
