import StayDetailList from "@/components/text-format/stay-detail-list";
import useDialog from "@/hooks/useDialog";
import { FC } from "react";
import { BiEdit } from "react-icons/bi";
import EditAvailability from "./edit-form";

interface Props {
  from: string;
  to: string;
  id: string;
  refetch: () => void
}
const AvailabilityInfo: FC<Props> = ({ from, to, id, refetch }) => {
    const {Dialog, setShowModal} = useDialog()
  return (
    <div>
      <div className="flex xl:w-6/12 items-center justify-between mb-4">
        <p className="fw-600 text-lg">Availability Information</p>
        <button className="flex items-center gap-x-1" onClick={() => setShowModal(true)}>
          <BiEdit />
          Edit
        </button>
      </div>
      <div>
        <div>
          <div className="grid lg:grid-cols-2 gap-4">
            <StayDetailList name="Available From" value={from} />
            <StayDetailList name="Available To" value={to} />
          </div>
        </div>
      </div>
      <Dialog title="Edit Availability" size="xl">
        <EditAvailability from={from} to={to} id={id} close={() => setShowModal(false)} refetch={refetch}/>
      </Dialog>
    </div>
  );
};

export default AvailabilityInfo;
