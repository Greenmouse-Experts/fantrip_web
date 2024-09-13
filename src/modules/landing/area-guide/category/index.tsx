import { FC } from "react";
import { ReccomendationItem } from "@/lib/contracts/place";
import { formatNumber } from "@/lib/utils/formatHelp";
import GuideImageSlider from "@/components/GuideImageSlider";
import { useNavigate } from "react-router-dom";
import RatingComponent from "@/components/rating-component";
import { IoOpenOutline } from "react-icons/io5";

interface Props {
  data: ReccomendationItem[];
}
const ViewCategoryRecommendations: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">
        {data.map((item) => (
          <div
            className="cursor-pointer"
            onClick={() => navigate(`${item.id}`)}
            key={item.id}
          >
            <div className="w-full h-[200px] lg:h-[300px]" onClick={(e) => e.stopPropagation()}>
              <GuideImageSlider images={item.photos} />
            </div>
            <div className="mt-3 px-2">
              <div className="flex items-center justify-between">
                <p className="syne fw-500 lg:text-lg">{item.name}</p>
                <p className="flex text-prima fs-400 fw-600 syne items-center gap-x-1">Open <IoOpenOutline/></p>
              </div>
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
              <p className="text-[#565656] fs-500 mt-[5px]">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCategoryRecommendations;
