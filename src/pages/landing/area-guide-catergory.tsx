import { getPlaces } from "@/services/api/places-api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const AreaGuideCategory = () => {
    const {name} = useParams()
    const param = name?.toLowerCase()
    const {} = useQuery({
        queryKey: ['get-category-places'],
        queryFn: () => getPlaces(`${param}`)
    })
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              {`${name}`}
            </p>
          </div>
        </div>
      </div>
      {/* content */}
    </div>
  );
};

export default AreaGuideCategory;
