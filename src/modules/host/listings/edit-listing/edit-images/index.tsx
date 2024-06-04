import { FC } from "react";
import { IoMdAddCircle } from "react-icons/io";

interface Props {
  images: string[];
  id: string;
}
const EditListingImage: FC<Props> = ({ images}) => {
  return (
    <div className="">
        <p className="mb-4 fw-600 text-lg">Stay Images</p>
      <div className="grid grid-cols-4 gap-4">
        {images.map((item, i) => (
          <img src={item} alt="" key={i} className="w-full h-36 rounded-lg object-cover" />
        ))}
        <div className="place-center w-full bg-gray-800 h-36 rounded-lg"><IoMdAddCircle className="text-3xl text-gray-400"/></div>
      </div>
    </div>
  );
};

export default EditListingImage;
