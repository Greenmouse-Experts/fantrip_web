import { FC } from "react";
import { LiaTimesSolid } from "react-icons/lia";

interface Props {
  title: string;
  shouldShow: boolean;
  onClose: () => void;
  children: JSX.Element;
  type?: "recommend" | "more";
}
export const ComponentModal: FC<Props> = ({
  shouldShow,
  onClose,
  children,
  title,
  type,
}) => {
  return shouldShow ? (
    <div
      className="fixed top-0 left-0 flex items-center justify-center z-[3000] h-full w-full bg-black/40 overflow-auto"
      onClick={onClose}
    >
      <div
        className={` ${
          type === "recommend"
            ? "bg-white w-11/12 lg:w-[50%]"
            : type === "more"
            ? "w-11/12 lg:w-[550px] rounded-lg p-2 lg:p-5 bg-[#EDEDFF]"
            : "bg-white p-5 rounded-lg w-11/12 [@media(min-width:1410px)]:w-[60%]"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {type === "recommend" ? (
          <div className="bg-[#EDEDFF] relative flex justify-between px-3 text-center py-4">
            <button
              className="absolute top-1 lg:top-0 md:relative monts text-[#5E5E5E] fw-500 lg:text-lg"
              onClick={onClose}
            >
              Close
            </button>
            <p className="fw-600 text-xl pt-4 md:pt-0">{title}</p> <p></p>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="fw-500 lg:text-2xl text-center w-full">{title}</p>
            <button
              className="text-xl bg-gray-100 p-1 rounded-lg"
              onClick={onClose}
            >
              <LiaTimesSolid />
            </button>
          </div>
        )}
        <div className={`${type === "more" && "px-3"}`}>{children}</div>
      </div>
    </div>
  ) : null;
};
