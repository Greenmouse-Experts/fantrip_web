import { ComponentModal } from "@/components/modal-component";
import { FC, useState } from "react";
import { MdRateReview } from "react-icons/md";
import AddReview from "./add-review";

interface Props {
  id: string;
}
const LeaveReviewIndex: FC<Props> = ({id}) => {
  const [openReview, setOpenReview] = useState(false)
  return (
    <div>
      <div
        className="flex gap-x-2 cursor-pointer items-center"
        onClick={() => setOpenReview(true)}
      >
        <MdRateReview className="text-prima lg:text-lg relative top-[2px]" />
        <p>Leave a review</p>
      </div>
      <ComponentModal
        title="Submit A Review"
        shouldShow={openReview}
        onClose={() => setOpenReview(false)}
        type="recommend"
      >
        <AddReview id={id} close={() => setOpenReview(false)}/>
      </ComponentModal>
    </div>
  );
};

export default LeaveReviewIndex;
