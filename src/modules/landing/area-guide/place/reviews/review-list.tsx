import RatingComponent from "@/components/rating-component";
import { ReviewItem } from "@/lib/contracts/place";
import dayjs from "dayjs";
import { FC } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface Props {
  data: ReviewItem;
}
const ReviewList: FC<Props> = ({ data }) => {
  return (
    <div>
      <div className="mt-5 flex gap-x-4 items-center">
        <p className="text-lg lg:text-4xl fw-600">{data.avgRating}</p>
        <RatingComponent
          type={"review"}
          value={Number(data.avgRating)}
          setValue={() => false}
          size={17}
        />
        <p className="fw-500 ">/5.0 ratings</p>
      </div>
      <div className="mt-6 grid gap-5 lg:w-8/12">
        {!!data.results.length &&
          data.results.map((item) => (
            <div>
              <div className="flex gap-x-2 items-center">
                <p className="fw-600">{`${item.user.firstName} ${item.user.lastName}`}</p>
                <RiVerifiedBadgeFill className="text-[#9847FE]" />
              </div>
              <div className="flex gap-x-1 mt-1">
                <RatingComponent
                  type={"review"}
                  value={Number(item.rating)}
                  setValue={() => false}
                  size={16}
                />
              </div>
              <p className="mt-6 fs-500">
                "{`${item.comment}`}"
              </p>
              <p className="mt-2 text-[#9C9C9C] fs-400">
                Reviewed on {dayjs(item.createdDate).format('DD/MM/YYYY')}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewList;
