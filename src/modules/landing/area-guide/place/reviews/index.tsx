import { ComponentModal } from "@/components/modal-component";
import { FC, useState } from "react";
import { BiMessageAdd } from "react-icons/bi";
import AddReview from "./add-review";

interface Props {
  id: string;
}
const PlacesReviews: FC<Props> = ({id}) => {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="fw-600 text-lg lg:text-2xl">Reviews(0)</p>
        <button className="flex items-center gap-x-2" onClick={() => setShowAdd(true)}>
          <BiMessageAdd />
          <span>Add Review</span>
        </button>
      </div>
      <ComponentModal
        title="Submit A Review"
        shouldShow={showAdd}
        onClose={() => setShowAdd(false)}
        type="recommend"
      >
        <AddReview id={id} refetch={() => false} close={() => setShowAdd(false)}/>
      </ComponentModal>
    </div>
  );
};

export default PlacesReviews;
