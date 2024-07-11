import { useQuery } from "@tanstack/react-query";
import FanChoiceSwiper from "./fan-choice-swiper";
import { getPlaces } from "@/services/api/places-api";

const FanChoice = () => {
  const param = "restaurant";
  const { isLoading, data } = useQuery({
    queryKey: ["get-category-places", param],
    queryFn: () => getPlaces(`${param}`),
  });

  return (
    <div className="section pb-6">
      <div className="box">
        <div className="lg:flex justify-between">
          <p className="text-2xl lg:text-4xl fw-600 syne">
            Fans&apos; Choice: Dining & Restaurants
          </p>
          <p>See all</p>
        </div>
        <div>{!isLoading && data && <FanChoiceSwiper data={data?.data} />}</div>
      </div>
    </div>
  );
};

export default FanChoice;
