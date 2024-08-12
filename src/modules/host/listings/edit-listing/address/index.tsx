import { FC } from "react";
import EditAddressModal from "./edit-address";
import { BiEdit } from "react-icons/bi";
import StayDetailList from "@/components/text-format/stay-detail-list";
import useDialog from "@/hooks/useDialog";
import { StayItem } from "@/lib/contracts/stay";

interface Props {
  data: StayItem;
  refetch: () => void;
}
const EditAddress: FC<Props> = ({ data, refetch }) => {
  const { address } = data;
  const { Dialog, setShowModal } = useDialog();
  return (
    <div>
      <div className="flex xl:w-6/12 items-center justify-between mb-4">
        <p className=" fw-600 text-lg">Stay Address</p>
        <button
          className="flex items-center gap-x-1"
          onClick={() => setShowModal(true)}
        >
          <BiEdit />
          Edit
        </button>
      </div>
      <div>
        <div className="grid lg:grid-cols-2 gap-4">
          <StayDetailList name="Address" value={address} />
        </div>
      </div>
      <Dialog title="Edit General Information" size="3xl">
        <EditAddressModal
          data={data}
          close={() => setShowModal(false)}
          refetch={refetch}
        />
      </Dialog>
    </div>
  );
};

export default EditAddress;
