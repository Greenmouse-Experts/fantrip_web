import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/element/css/effect-fade";
import "swiper/css/bundle";
import { register } from "swiper/element/bundle";

register();
const TopDestinationSwiper = () => {
  const data = [
    {
      location: "London",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1714650848/fantrip/Rectangle_20118_1_dsdkzr.png",
    },
    {
      location: "Paris",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1714650849/fantrip/Rectangle_20119_2_hr7uky.png",
    },
    {
      location: "Germany",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1714650849/fantrip/Rectangle_20120_2_blzltp.png",
    },
    {
      location: "Spain",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1714650852/fantrip/Rectangle_20121_1_u0hqn5.png",
    },
  ];
  return (
    <div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={18}
        className="w-full pb-6 mt-10"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="w-[300px] pb-3">
            <div className="w-full h-full relative flex items-end">
              <img src={item.img} alt="location-img" className="w-full h-[300px] object-cover" />
              <p className="absolute bottom-3 left-3 text-lg fw-500 text-white">{item.location}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopDestinationSwiper;
