import qr from "@/assets/svg/qr.svg";
import { HiBell } from "react-icons/hi";
import { IoMail } from "react-icons/io5";
const ExternalLinks = () => {
  return (
    <div className="flex justify-end gap-x-4">
      <button
        type="button"
        className="w-[42px] h-[42px] place-center bg-[#EDEDFF] circle"
      >
        <IoMail className="text-xl text-[#9847FE]" />
      </button>
      <button
        type="button"
        className="w-[42px] h-[42px] place-center bg-[#EDEDFF] circle"
      >
        <HiBell className="text-xl text-[#9847FE]" />
      </button>
      <button
        type="button"
        className="px-5 py-[9px] flex gap-x-3 items-center rounded-full bg-[#EDEDFF]"
      >
        <img src={qr} alt="qr-code" className="w-5 h-5" />
        <p className="fw-500 whitespace-nowrap">Get app</p>
      </button>
    </div>
  );
};

export default ExternalLinks;
