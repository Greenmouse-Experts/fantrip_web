import { ReccomendationItem } from "@/lib/contracts/place";
import { formatNumber } from "@/lib/utils/formatHelp";
import { FC } from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import GuideImageSlider from "@/components/GuideImageSlider";

interface Props {
  data: ReccomendationItem[];
}
const ReccomendationListing: FC<Props> = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {!!data.length &&
        data.map((item) => (
          <div className="" key={item.id}>
            <div className="lg:h-[280px]">
              <GuideImageSlider images={item.photos} />
            </div>
            <div className="mt-3 px-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="syne fw-600 lg:text-lg">{item.name}</p>
                  <p className="fw-500 text-prima">{item.spot.name}</p>
                </div>
                <div className="flex gap-x-2 items-center">
                  <Link to={`/area-guide/${item.spot.name}/${item.id}`}>
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
        ))}
    </div>
  );
};

export default ReccomendationListing;
