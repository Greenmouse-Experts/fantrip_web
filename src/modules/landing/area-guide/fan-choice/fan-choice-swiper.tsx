import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/element/css/effect-fade";
import "swiper/css/bundle";
import { register } from "swiper/element/bundle";
import { formatNumber } from "@/lib/utils/formatHelp";
import { ReccomendationItem } from "@/lib/contracts/place";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import RatingComponent from "@/components/rating-component";

register();
interface Props {
  data: ReccomendationItem[];
}
const FanChoiceSwiper: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const getFirstPhoto = (item: string) => {
    const img = JSON.parse(item);
    return !img.length ? "" : img[0];
  };
  return (
    <div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={18}
        className="w-full pb-6 mt-10"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index} className="w-[300px] pb-3">
            <div onClick={() => navigate(`/area-guide/Restuarant/${item.id}`)} className=" cursor-pointer">
              <img
                src={getFirstPhoto(item.photos)}
                alt="location-img"
                className="w-full h-[230px] rounded-lg object-cover"
              />
              <div className="mt-3">
                <p className="syne fw-500 lg:text-lg">{item.name}</p>
                <div className="mt-[5px] flex gap-x-2 items-center">
                  <div className="flex text-[#9847FE] fs-500 gap-x-1 items-center">
                    <RatingComponent
                      value={Number(item.avgRating)}
                      setValue={() => false}
                      type="review"
                      size={17}
                    />
                  </div>
                  <div>
                    <p className="fs-400 text-[#565656]">
                      {formatNumber(`${item.totalReviews}`)} Reviews
                    </p>
                  </div>
                </div>
                <p className="text-[#565656] fs-500 mt-[5px]">
                  {item.location}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FanChoiceSwiper;
