import useDialog from "@/hooks/useDialog";
import { FC } from "react";
import { IoMdAddCircle } from "react-icons/io";
import EditImages from "./images-edit";

interface Props {
  images: string[];
  id: string;
  refetch: () => void;
}
const EditListingImage: FC<Props> = ({ images, id, refetch }) => {
  const { Dialog, setShowModal } = useDialog();
  return (
    <div className="">
      <p className="mb-4 fw-600 text-lg">Stay Images</p>
      <div className="grid grid-cols-4 gap-4">
        {images.map((item, i) => (
          <img
            src={item}
            alt=""
            key={i}
            className="w-full h-36 rounded-lg object-cover"
          />
        ))}
        <div
          className="place-center w-full bg-gray-800 h-36 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          <IoMdAddCircle className="text-3xl text-gray-400" />
        </div>
      </div>
      <Dialog title="Edit Stay Images" size="xl">
        <EditImages
          images={images}
          id={id}
          close={() => setShowModal(false)}
          refetch={refetch}
        />
      </Dialog>
    </div>
  );
};

export default EditListingImage;
