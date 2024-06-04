import useDialog from "@/hooks/useDialog";
import { AmenityItem } from "@/lib/contracts/routine";
import { FC } from "react";
import { BiEdit } from "react-icons/bi";
import EditAmenitiesForm from "./edit-form";

interface Props {
  amenities: AmenityItem[];
  id: string;
  unique: string;
  refetch: () => void;
}
const AmenitiesInfo: FC<Props> = ({ amenities, unique, refetch, id }) => {
    const {Dialog, setShowModal} = useDialog()
  return (
    <div>
      <div className="flex xl:w-6/12 items-center justify-between mb-4">
        <p className="fw-600 text-lg">Amenity Information</p>
        <button className="flex items-center gap-x-1" onClick={() => setShowModal(true)}>
          <BiEdit />
          Edit
        </button>
      </div>
      <div className="grid gap-3">
        {amenities.map((item) => (
          <div className="flex items-center gap-x-1" key={item.id}>
            <p className="bg-gray-400 w-3 h-3 circle shrink-0"></p>
            <p>{item.name}</p>
          </div>
        ))}
        <div className="flex items-center gap-x-1">
          <p className="bg-gray-400 w-3 h-3 circle shrink-0"></p>
          <p>Unique Feature: {unique}</p>
        </div>
      </div>
      <Dialog title="Update Amenities" size="2xl">
        <EditAmenitiesForm id={id} close={() => setShowModal(false)} amenities={amenities} unique={unique} refetch={refetch}/>
      </Dialog>
    </div>
  );
};

export default AmenitiesInfo;
