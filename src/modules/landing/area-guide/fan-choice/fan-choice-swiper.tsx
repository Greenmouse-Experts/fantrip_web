import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/element/css/effect-fade";
import "swiper/css/bundle";
import { register } from "swiper/element/bundle";
import { FaStar } from "react-icons/fa6";
import { formatNumber } from "@/lib/utils/formatHelp";

register();
const FanChoiceSwiper = () => {
  const data = [
    {
      name: "Martin Berasategui",
      reviews: "1290",
      location: "Lasarte-Oria, Spain",
      rating: 5,
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1714650849/fantrip/Rectangle_20118_l0vzwp.png",
    },
    {
      name: "Maison Lameloise",
      reviews: "1733",
      location: "Chagny, France",
      rating: 5,
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1714650849/fantrip/Rectangle_20119_1_qofu8a.png",
    },
    {
      name: "Le Manoir Restaurant",
      reviews: "1290",
      location: "Lasarte-Oria, Spain",
      rating: 5,
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1714650849/fantrip/Rectangle_20120_kkhvpf.png",
    },
    {
      name: "L'Auberge De L'Ill",
      reviews: "2093",
      location: "Illhaeusern, France",
      rating: 5,
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1714650849/fantrip/Rectangle_20121_ughpcb.png",
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
            <div>
              <img src={item.img} alt="location-img" className="w-full" />
              <div className="mt-3">
                <p className="syne fw-500 lg:text-lg">{item.name}</p>
                <div className="mt-[5px] flex gap-x-2 items-center">
                  <div className="flex text-[#9847FE] fs-500 gap-x-1 items-center">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <div>
                    <p className="fs-400 text-[#565656]">
                      {formatNumber(item.reviews)} Reviews
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
