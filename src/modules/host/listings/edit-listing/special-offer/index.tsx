import useDialog from "@/hooks/useDialog";
import { FC } from "react";
import { BiEdit } from "react-icons/bi";
import EditSpecialOffers from "./edit-form";

interface Props {
  special: string[];
  id: string;
  refetch: () => void;
}
const SpecialOfferInfo: FC<Props> = ({ special, id, refetch }) => {
  const { Dialog, setShowModal } = useDialog();
  return (
    <div>
      <div className="flex xl:w-6/12 items-center justify-between mb-4">
        <p className="fw-600 text-lg">Special Offers</p>
        <button
          className="flex items-center gap-x-1"
          onClick={() => setShowModal(true)}
        >
          <BiEdit />
          Edit
        </button>
      </div>
      <div className="grid gap-3">
        {special.map((item, i) => (
          <div className="flex items-center gap-x-1" key={i}>
            <p className="bg-gray-400 w-3 h-3 circle shrink-0"></p>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <Dialog title="Update Special Offers" size="xl">
        <EditSpecialOffers
          id={id}
          offers={special}
          refetch={refetch}
          close={() => setShowModal(false)}
        />
      </Dialog>
    </div>
  );
};

export default SpecialOfferInfo;
