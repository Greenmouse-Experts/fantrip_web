import { FC } from "react";
import { GoComment } from "react-icons/go";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import LeaveComment from "../leave-a-comment";

interface Props {
  item: any;
}
const TextPostRender: FC<Props> = ({ item }) => {
  return (
    <div className="border-b pb-3 border-[#D2D2D2]">
      <div className="bg-[#EDEDFF] rounded-[12px] p-4">
        <div className="flex">
          <div className="flex gap-x-2 items-center">
            <div className="w-[35px] lg:w-[40px] h-[35px] lg:h-[40px] bg-gradient p-[1px] circle">
              <img
                src={
                  item.image ||
                  "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
                }
                alt="profile"
                className="w-full h-full circle object-cover"
              />
            </div>
            <div>
              <p className="fw-500 fs-500">{item.posterName}</p>
              <p className="opacity-80 fs-300">
                <span className="capitalize fw-500">{item.role}</span>
                {" - "}
                <span>{item.time}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="my-3">
          <p>{item.post}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-x-3">
            <button
              type="button"
              className="bg-white flex items-center gap-x-1 rounded-full px-4 py-[2px]"
            >
              <TbArrowBigUp />
              <p>{item.like}</p>
            </button>
            <button
              type="button"
              className="bg-white flex items-center gap-x-1 rounded-full px-4 py-[2px]"
            >
              <TbArrowBigDown />
              <p>{item.dislike}</p>
            </button>
          </div>
          <button
            type="button"
            className="bg-white flex items-center gap-x-1 rounded-full px-4 py-[2px]"
          >
            <GoComment />
            <p>{item.comment}</p>
          </button>
        </div>
      </div>
      <div className="mt-3">
        <LeaveComment />
      </div>
    </div>
  );
};

export default TextPostRender;
