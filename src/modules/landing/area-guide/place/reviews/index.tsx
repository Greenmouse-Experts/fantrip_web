import { FC } from "react";
import { BiMessageAdd } from "react-icons/bi";

interface Props {
  id: string;
}
const PlacesReviews: FC<Props> = ({}) => {
  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="fw-600 text-lg lg:text-2xl">Reviews(0)</p>
        <button className="flex items-center gap-x-2">
          <BiMessageAdd />
          <span>Add Review</span>
        </button>
      </div>
    </div>
  );
};

export default PlacesReviews;
