import useDialog from "@/hooks/useDialog";
import { FC } from "react";
import { MdRateReview } from "react-icons/md";

interface Props {
  id: string;
}
const LeaveReviewIndex: FC<Props> = ({}) => {
  const { Dialog, setShowModal } = useDialog();
  return (
    <div>
      <div
        className="flex gap-x-2 items-center"
        onClick={() => setShowModal(true)}
      >
        <MdRateReview className="text-prima" />
        <p>Leave a review</p>
      </div>
      <Dialog title="" size="md">
        <></>
      </Dialog>
    </div>
  );
};

export default LeaveReviewIndex;
