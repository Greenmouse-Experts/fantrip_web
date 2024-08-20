import EmptyStay from "@/components/empty-states/empty-stay";
import PyramidSpin from "@/components/loaders/pyramid-spin";
import ViewCategoryRecommendations from "@/modules/landing/area-guide/category";
import {  getPlacesByLocation } from "@/services/api/places-api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const AreaGuideLocation = () => {
  const { name } = useParams();
  const param = name?.toLowerCase();
  const { isLoading, data } = useQuery({
    queryKey: ["get-location-places", param],
    queryFn: () => getPlacesByLocation(`${param}`),
  });

  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-8 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              {`${name}`}
            </p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="box">
        {isLoading && (
          <div className="py-12 lg:py-24 place-center">
            <PyramidSpin size={1.8} />
          </div>
        )}
        {!isLoading && !!data?.data.length && (
          <ViewCategoryRecommendations data={data?.data} />
        )}
            {!isLoading && !data.data.length &&(
          <EmptyStay/>
        )}
      </div>
    </div>
  );
};

export default AreaGuideLocation;
