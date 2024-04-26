import BtnContent from "@/components/btn-content";
import { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa6";

interface Props {
  next: () => void;
  prev: () => void;
}
const StayPhotos: FC<Props> = ({ next, prev }) => {
  return (
    <div>
      <p className="text-xl lg:text-4xl lg:w-9/12">
      Upload More Photos
      </p>
      <div className="mt-6 flex gap-x-1">
        <BsInfoCircle className="shrink-0 text-sm lg:text-[17px] relative top-[4px]" />
        <p className="fs-400 lg:fs-600">
        Hosts are encouraged to upload high-quality images of their accommodation.
        </p>
      </div>
      <div className="mt-4 flex">
        <div className="relative cursor-pointer py-2 border border-[#9847FE] rounded-[14px]">
          <input type="file" className="opacity-0 absolute w-full h-full" />
          <p className="text-center text-[#9847FE] fw-500 px-5 py-1">
            Upload photos
          </p>
        </div>
      </div>
      <div className="mt-8">
        <div className="w-44 lg:w-96 h-44 place-center rounded-[14px] border border-[#D2D2D2] border-dashed">
          <div className="text-center">
            <FaRegImage className="text-[#D2D2D2] text-xl mx-auto mb-1" />
            <p className="text-[#9847FE] fs-400">Upload more photos</p>
            <p className="fs-500">or drag and drop them here</p>
          </div>
        </div>
      </div>
      <div className="mt-8 lg:mt-16 flex justify-between items-center">
        <div className="btn-primary cursor-pointer px-6 py-2 lg:py-3" onClick={prev}>
          <BtnContent name="Prev" reverse/>
        </div>
        <div className="btn-primary cursor-pointer px-6 py-2 lg:py-3" onClick={next}>
          <BtnContent name="Continue" />
        </div>
      </div>
    </div>
  );
};

export default StayPhotos;
