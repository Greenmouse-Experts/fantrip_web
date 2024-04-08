import Button from "@/components/Button";
import { BsInfoCircle } from "react-icons/bs";
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
      <div className="py-3 flex justify-between items-center">
        <p className="fw-600">Price per night</p>
        <p className="fw-600 text-lg">EU€70</p>
      </div>
     </div>
      <div className="my-3">
        <Button title={'Book fan stay'}/>
      </div>
      <div className="flex items-center gap-x-2">
        <BsInfoCircle className="text-red-600"/>
        <p className="text-red-600 fs-500 fw-500">Price is after tax and company&apos;s fee!</p>
      </div>
    </div>
  );
};

export default SelectStayDate;
