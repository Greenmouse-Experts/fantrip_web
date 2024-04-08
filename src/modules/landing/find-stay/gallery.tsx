import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/element/css/effect-fade";
import "swiper/css/bundle";
import { register } from "swiper/element/bundle";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { FC } from "react";

register();
interface Props {
  data: string[];
}
const StayGallery: FC<Props> = ({ data }) => {
  return (
    <div className="w-full">
      <Swiper
        effect={"fade"}
        autoplay={{ delay: 6000 }}
        navigation
        modules={[Autoplay, EffectFade, Navigation]}
        slidesPerView={1}
        className="w-full pb-6 rounded-lg h-[300px] lg:h-[400px]"
      >
        {data.map((item: any, index: any) => (
          <SwiperSlide key={index}>
            <img
              src={item}
              alt=""
              className="w-full h-[300px] lg:h-[400px object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StayGallery;
