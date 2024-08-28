import { GoArrowUpRight } from "react-icons/go";
import { PiChartLineUp } from "react-icons/pi";

const TotalProfit = () => {
  return (
    <div className="p-5">
      <div>
        <div className="flex items-center gap-x-1">
          <PiChartLineUp className="" />
          <p className=" fw-500 fs-400">Total listing</p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-2xl lg:text-3xl fw-600">$1,110.6K</p>
          <div className="flex items-center gap-x-[1px] px-2 py-1 bg-[#05C16833] text-[#14CA74]">
            <p className="fs-300">24.65</p>
            <GoArrowUpRight className="text-sm" />
          </div>
        </div>
      </div>
      <div className="h-24"></div>
      <div className="flex justify-between items-center">
        <p className=" fs-500">Last 6 months</p>
        <p className="text-[#9847FE] fs-500">View report</p>
      </div>
    </div>
  );
};

export default TotalProfit;
