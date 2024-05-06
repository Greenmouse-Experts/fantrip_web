import { GoArrowUpRight } from "react-icons/go";
import { RiAlarmLine } from "react-icons/ri";
import TotalListingChart from "./components/line-chart";

const TotalListing = () => {
  return (
    <div className="p-5">
      <div>
        <div className="flex gap-x-1 items-center">
          <RiAlarmLine className="text-[#AEB9E1]" />
          <p className="text-[#AEB9E1] fw-500 fs-400">Total listing</p>
        </div>
        <div className="flex mt-1 items-center gap-x-2">
          <p className="text-2xl lg:text-3xl fw-600">20</p>
          <div className="flex items-center gap-x-[1px] px-2 py-1 bg-[#05C16833] text-[#14CA74]">
            <p className="fs-300">11.8%</p>
            <GoArrowUpRight className="text-sm" />
          </div>
        </div>
      </div>
      <div className="py-3">
        <TotalListingChart/>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[#AEB9E1] fs-500">Last 5 months</p>
        <p className="text-[#9847FE] fs-500">View report</p>
      </div>
    </div>
  );
};

export default TotalListing;
