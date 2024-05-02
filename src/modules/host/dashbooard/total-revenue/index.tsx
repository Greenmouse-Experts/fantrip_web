import { FaCalendar } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";

const TotalRevenue = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#AEB9E1] fw-500 fs-400">Total revenue</p>
          <div className="flex items-center gap-x-2">
            <p className="text-2xl lg:text-3xl fw-600">$1,330.8K</p>
            <div className="flex items-center gap-x-[1px] px-2 py-1 bg-[#05C16833] text-[#14CA74]">
              <p className="fs-300">24.65</p>
              <GoArrowUpRight className="text-sm" />
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 items-center">
          <div>
            <ul className="flex gap-x-2">
              <li className="flex gap-x-2 items-center">
                <span className="w-3 h-3 circle bg-[#9847FE]"></span>
                <span>Revenue</span>
              </li>
              <li className="flex gap-x-2 items-center">
                <span className="w-3 h-3 circle bg-[#00C2FF]"></span>
                <span>Expenses</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-x-2 cursor-pointer bg-[#0A1330] text-[#AEB9E1] px-2 py-1 rounded">
                <FaCalendar className="text-sm"/>
                <p>Jan 2024 - Jun 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;
