import { useQuery } from "@tanstack/react-query";
import TopDestinationSwiper from "./destination-swiper";
import { getTopPlaces } from "@/services/api/places-api";

const TopDestination = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-top-places"],
    queryFn: () => getTopPlaces(),
  });

  return (
    <div className="section pt-6">
      <div className="box">
        <div className="lg:flex justify-between">
          <p className="text-2xl lg:text-4xl fw-600 syne">Top destinations</p>
        </div>
        <div>
          <div>
            {!isLoading && data && <TopDestinationSwiper data={data?.data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDestination;
