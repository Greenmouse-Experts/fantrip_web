import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/element/css/effect-fade";
import "swiper/css/bundle";
import { register } from "swiper/element/bundle";
import { PlaceItemLocation } from "@/lib/contracts/place";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

register();
interface Props {
  data: PlaceItemLocation[];
}
const TopDestinationSwiper: FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={18}
        className="w-full pb-6 mt-10"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="w-[300px] pb-3">
            <div
              className="w-full h-full relative flex items-end cursor-pointer"
              onClick={() => navigate(`/area-guide/location/${item.location}`)}
            >
              <img
                src={item.picture}
                alt="location-img"
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <p className="absolute bottom-3 left-3 text-lg fw-500 text-white">
                {item.location}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopDestinationSwiper;
