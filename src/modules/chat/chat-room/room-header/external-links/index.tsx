import qr from "@/assets/svg/qr.svg";
import { BiHelpCircle } from "react-icons/bi";
import { HiBell } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ExternalLinks = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end gap-x-4">
      <button
        type="button"
        onClick={() => navigate('/get-help')}
        className="w-[42px] h-[42px] place-center bg-[#EDEDFF] circle"
      >
        <BiHelpCircle className="text-xl text-[#9847FE]" />
      </button>
      <button
        type="button"
        className="w-[42px] h-[42px] place-center bg-[#EDEDFF] circle"
      >
        <HiBell className="text-xl text-[#9847FE]" />
      </button>
      <button
        type="button"
        onClick={() => navigate("/get-app")}
        className="px-5 py-[9px] flex gap-x-3 items-center rounded-full bg-[#EDEDFF]"
      >
        <img src={qr} alt="qr-code" className="w-5 h-5" />
        <p className="fw-500 whitespace-nowrap">Get app</p>
      </button>
    </div>
  );
};

export default ExternalLinks;
