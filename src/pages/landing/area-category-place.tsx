import PyramidSpin from "@/components/loaders/pyramid-spin";
import AreaCategoryPlaceIndex from "@/modules/landing/area-guide/place";
import { getSinglePlace } from "@/services/api/places-api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const AreaGuideCategoryPlace = () => {
  const { id } = useParams();
  const param = id?.toLowerCase();
  const { isLoading, data } = useQuery({
    queryKey: ["get-single-place", param],
    queryFn: () => getSinglePlace(`${param}`),
  });
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-8 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              {`${data?.name}`}
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
        {!isLoading && data && <AreaCategoryPlaceIndex data={data} />}
      </div>
    </div>
  );
};

export default AreaGuideCategoryPlace;
