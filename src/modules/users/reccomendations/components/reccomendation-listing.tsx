import { ReccomendationItem } from "@/lib/contracts/place";
import { formatNumber } from "@/lib/utils/formatHelp";
import { FC } from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";

interface Props {
  data: ReccomendationItem[];
}
const ReccomendationListing: FC<Props> = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {!!data.length &&
        data.map((item) => (
          <div>
            <img
              src={
                "https://res.cloudinary.com/greenmouse-tech/image/upload/v1720193181/tyrqxgdvswrchvkqrbrf.jpg"
              }
              alt="location-img"
              className="w-full"
            />
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
                    {formatNumber(10)} Reviews
                  </p>
                </div>
              </div>
              <p className="text-[#565656] fs-500 mt-[5px]">{item.location}</p>
            </div>
          </div>
        ))}
      <div>
        <img
          src={
            "https://res.cloudinary.com/greenmouse-tech/image/upload/v1720193181/tyrqxgdvswrchvkqrbrf.jpg"
          }
          alt="location-img"
          className="w-full"
        />
        <div className="mt-3 px-2">
          <div className="flex items-center justify-between">
            <p className="syne fw-500 lg:text-lg">Maldives</p>
            <div className="flex gap-x-2 items-center">
              <Link to={""}>
                <HiOutlineViewfinderCircle className="text-xl" />
              </Link>
              <Link to={""}>
                <FaRegEdit className="text-lg relative -top-[2px]" />
              </Link>
            </div>
          </div>
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
                {formatNumber(10)} Reviews
              </p>
            </div>
          </div>
          <p className="text-[#565656] fs-500 mt-[5px]">
            Wines Corner, Winchester, England.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReccomendationListing;
