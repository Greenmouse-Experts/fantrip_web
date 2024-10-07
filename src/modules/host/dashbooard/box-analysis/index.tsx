import { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaStar, FaUser } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { IoMdAddCircle, IoMdEye } from "react-icons/io";

interface Props{
  total: number;
  booked: number;
  available: number;
  reviews: number
}
const BoxAnalyysis:FC<Props> = ({total, booked, available, reviews}) => {
  const data = [
    {
      name: "Total listings",
      icon: <IoMdEye />,
      number: total,
      percent: "28.4%",
    },
    {
      name: "Booked",
      icon: <FaUser />,
      number: booked,
      percent: "28.4%",
    },
    {
      name: "Available listings",
      icon: <IoMdAddCircle />,
      number: available,
      percent: "3.1%",
    },
    {
      name: "Reviews",
      icon: <FaStar />,
      number: reviews,
      percent: "11.4%",
    },
  ];
  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-5 lg:gap-5">
        {data.map((item) => (
          <div
            key={item.name}
            className="border border-[#343B4F] rounded-[11px] p-5"
          >
            <div className="flex items-ceter justify-between">
              <div className="flex items-center gap-x-1 ">
                {item.icon}
                <p>{item.name}</p>
              </div>
              <div>
                <BsThreeDots className="text-[#D9E1FA]" />
              </div>
            </div>
            <div className="flex justify-between items-center gap-x-5 mt-5">
              <p className="text-2xl lg:text-4xl fw-600">{item.number}</p>
              <div className="flex items-center gap-x-[1px] px-2 rounded-full py-1 bg-[#05C16833] text-[#14CA74]">
                {/* <p className="fs-300">{item.percent}</p> */}
                <GoArrowUpRight className="text-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxAnalyysis;
