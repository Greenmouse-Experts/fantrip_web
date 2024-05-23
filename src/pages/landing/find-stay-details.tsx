import PyramidSpin from "@/components/loaders/pyramid-spin";
import StayDetailsIndex from "@/modules/landing/find-stay";
import { getSingleStay } from "@/services/api/stay-api";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";

const FindStayDetails = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["get-single-stay", id],
    queryFn: () => getSingleStay(`${id}`),
  });
  return (
    <div>
      <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
      <div className="py-12">
        <div className="box">
          {isLoading && (
            <div className="py-12 lg:py-24 place-center">
              <PyramidSpin size={1.8} />
            </div>
          )}
          {!isLoading && data && <StayDetailsIndex data={data} />}
        </div>
      </div>
    </div>
  );
};

export default FindStayDetails;
