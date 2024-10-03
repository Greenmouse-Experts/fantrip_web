import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "@/services/api/places-api";
import { useNavigate } from "react-router-dom";
import FanChoiceSwiper from "../fan-choice/fan-choice-swiper";

const SportsBar = () => {
  const param = "sports bars";
  const { isLoading, data } = useQuery({
    queryKey: ["get-category-places", param],
    queryFn: () => getPlaces(`${param}`),
  });

  const navigate = useNavigate();

  return (
    <div className="section pb-0">
      <div className="box">
        <div className="lg:flex justify-between">
          <p className="text-2xl lg:text-4xl fw-600 syne">
            Fans&apos; Choice: Sports Bars
          </p>
          <button onClick={() => navigate("/area-guide/Sports%20Bars")}>
            See all
          </button>
        </div>
        <div>{!isLoading && data && <FanChoiceSwiper data={data?.data} />}</div>
      </div>
    </div>
  );
};

export default SportsBar;
