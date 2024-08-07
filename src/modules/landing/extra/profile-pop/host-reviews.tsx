import EmptyReview from "@/components/empty-states/empty-review";
import { UserItem } from "@/lib/contracts/auth";
import dayjs from "dayjs";
import { FC } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface PopReview {
  comment: string;
  createdDate: string;
  id: string;
  rating: number;
  user: UserItem;
}
interface Props {
  reviews: PopReview[];
}
const HostReviews: FC<Props> = ({ reviews }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-lg fw-600">Reviews from past guests</p>
        <div className="flex gap-x-2 items-center">
          <button className="w-5 h-5 circle border border-gray-600 place-center">
            <IoArrowBack />
          </button>
          <button className="w-5 h-5 circle border border-gray-600 place-center">
            <IoArrowForward />
          </button>
        </div>
      </div>
      <div className="mt-4">
        {!reviews?.length && (
          <div>
            <EmptyReview />
          </div>
        )}
        {!!reviews.length && (
          <div className="flex gap-x-4 w-full overflow-x-auto scroll-pro">
            {reviews.map((item) => (
              <div className="bg-gradient rounded-[23px] p-[1px]">
                <div className="bg-[#EDEDFF] rounded-[23px] p-4 w-[340px]">
                  <div className="h-[153px] overflow-y-auto scroll-pro">
                    <p className="fs-500">"{item.comment}"</p>
                  </div>
                  <div className="flex justify-end mt-3">
                    <div className="flex gap-x-2">
                      <div>
                        <p className="fw-600">{`${item.user.firstName} ${item.user.lastName}`}</p>
                        <p>{dayjs(item.createdDate).format("MMMM-YYYY")}</p>
                      </div>
                      <img
                        src={
                          item.user.picture || "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
                        }
                        alt="avatar"
                        className="w-12 shrink-0 aspect-square object-cover circle"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostReviews;
