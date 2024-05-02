import Button from "@/components/Button";
import { FaRegUser } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";
import { PiCaretDownThin } from "react-icons/pi";

const SelectStayDate = () => {
  return (
    <div className="grid gap-3 mt-4 pb-6">
      <div className="px-2 grid gap-3">
        <div className="border p-3 border-[#D2D2D2] rounded-[7px] flex gap-x-3 cursor-pointer items-center">
          <FiCalendar className="text-xl" />
          <div className="w-full flex justify-between items-center">
            <p className="fw-500">Check In</p>
            <PiCaretDownThin />
          </div>
        </div>
        <div className="border p-3 border-[#D2D2D2] rounded-[7px] flex gap-x-3 cursor-pointer items-center">
          <FiCalendar className="text-xl" />
          <div className="w-full flex justify-between items-center">
            <p className="fw-500">Check Out</p>
            <PiCaretDownThin />
          </div>
        </div>
        <div className="border p-3 border-[#D2D2D2] rounded-[7px] flex gap-x-3 cursor-pointer items-center">
          <FaRegUser className="text-xl" />
          <div className="w-full flex justify-between items-center">
            <p className="fw-500">Guests (2 Adults, 0 Children)</p>
            <PiCaretDownThin />
          </div>
        </div>
        <div>
          <div>
            <div className="pt-3 flex justify-between items-center">
              <p className="fw-500">Price per night</p>
              <p className="fw-500 text-lg">€70</p>
            </div>
            <div className=" py-1 flex justify-between items-center">
              <p className="fw-500">Fantrip service fee</p>
              <p className="fw-500 text-lg">€10</p>
            </div>
            <div className=" flex justify-between items-center">
              <p className="fw-500">Taxes</p>
              <p className="fw-500 text-lg">€7</p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#D2D2D2]">
          <div className="text-lg flex justify-between items-center">
              <p className="fw-500">Total (EU)</p>
              <p className="fw-500 text-lg">€87</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <Button title={"Book a fan stay"} altClassName="btn-primary w-full py-3 !fw-600 syne lg:!text-lg rounded-[8px]" />
      </div>
    </div>
  );
};

export default SelectStayDate;
