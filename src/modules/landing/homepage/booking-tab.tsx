import { IoSearch } from "react-icons/io5";
import Button from "../../../components/Button";
import { FiCalendar } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { PiCaretDownThin } from "react-icons/pi";
const BookingTab = () => {
  return (
    <div className="box">
      <div className="w-full bg-white lg:rounded-[100px] book-tab-border px-6 py-3 lg:pl-12">
        <div className="lg:flex w-full ">
          <div className="grid gap-5 lg:gap-0 lg:grid-cols-4 divide-x divide-gray-400 w-full">
            <div className="flex gap-x-2 items-center">
                <IoSearch className="text-xl"/>
                <input type="text" className="outline-none p-2 placeholder:text-black" placeholder="Enter city or region"/>
            </div>
            <div className="flex justify-center">
                <div className="flex gap-x-4 cursor-pointer items-center">
                    <FiCalendar className="text-xl"/>
                    <p className="fw-500">Check In</p>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex gap-x-4 cursor-pointer items-center">
                    <FiCalendar className="text-xl"/>
                    <p className="fw-500">Check Out</p>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex gap-x-6 cursor-pointer items-center">
                    <FaRegUser className="text-xl"/>
                    <p className="fw-500">Guests</p>
                    <PiCaretDownThin/>
                </div>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <Button title={"Search"} altClassName="btn-primary w-full lg:w-auto shrink-0 py-4 lg:py-5 lg:px-16 fw-600 px-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTab;
