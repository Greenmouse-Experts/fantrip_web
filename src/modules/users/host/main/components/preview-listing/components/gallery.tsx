import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/element/css/effect-fade";
import "swiper/css/bundle";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { register } from "swiper/element/bundle";
import {
  Autoplay,
  EffectFade,
  FreeMode,
  Navigation,
  Thumbs,
} from "swiper/modules";
import { FC, useState } from "react";

register();
interface Props {
  data: string[];
}
const StayGallery: FC<Props> = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);
  return (
    <div className="w-full">
      <Swiper
        effect={"fade"}
        autoplay={{ delay: 6000 }}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Autoplay, EffectFade, Navigation, Thumbs]}
        slidesPerView={1}
        className="w-full pb-6 rounded-lg h-[300px] lg:h-[400px]"
      >
        {data.map((item: any, index: any) => (
          <SwiperSlide key={index}>
            <img
              src={item}
              alt=""
              className="w-full h-[280px] lg:h-[400px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper as any}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper rounded-lg lg:mt-4"
      >
        {" "}
        {data.map((item: any, index: any) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <img
              src={item}
              alt=""
              className="w-full h-[60px] lg:h-[100px] rounded-lg object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StayGallery;
