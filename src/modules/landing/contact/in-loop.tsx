import { useNavigate } from "react-router-dom";

const InLoop = () => {
  const navigate = useNavigate()
  const socials = [
    {
      name: "insta",
      route: "https://www.instagram.com/joinfantrip/",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1726752452/fantrip/image_kqeqcv.png",
    },
    {
      name: "twitter",
      route: "https://x.com/joinfantrip",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1726752452/fantrip/image_1_djkemz.png",
    },
    {
      name: "linkedin",
      route: "",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1726752451/fantrip/image_2_za2oog.png",
    },
    {
      name: "tiktok",
      route: "https://www.tiktok.com/@joinfantrip",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1726752451/fantrip/image_3_wneava.png",
    },
    {
      name: "facebook",
      route: "",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1726752451/fantrip/image_4_lp4gue.png",
    },
  ];

  return (
    <div className="grid  items-center lg:grid-cols-2 gap-6 lg:gap-20">
      <div>
        <p className="text-3xl font-[600] syne lg:text-4xl 2xl:text-5xl lg:!leading-[58px]">
          Stay in the loop!
        </p>
        <p className="text-[#494949] lg:text-lg mt-6 lg:mt-12 lg:leading-[36px]">
          Follow us on our social channels for the latest updates, fun tidbits
          and a whole lot of fan spirit! Cant wait connect with you and make
          your sport travels and game experience unforgettable.
        </p>
      </div>
      <div>
        <div className="bg-gradient p-[1px] rounded-[20px]">
          <div className="bg-[#F2F4FF] dark:bg-darkColorLight p-4 px-6 rounded-[20px]">
            <ul className="flex justify-between">
              {socials.map((item, i) => (
                <li onClick={() => navigate(item.route)} className="w-[65px] h-[65px] circle cursor-pointer hover:scale-105 duration-100" key={i}>
                  <img src={item.img} alt={item.name} className="w-full h-full"/>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InLoop;
