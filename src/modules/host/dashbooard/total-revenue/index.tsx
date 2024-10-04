import dayjs from "dayjs";
import { FC } from "react";
import { FaCalendar } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import TotalRevenueChart from "./components/line-chart";
import { formatAsNgnMoney } from "@/lib/utils/formatHelp";

interface Props{
  total: number;
  months: string[],
  revenue: number[]
}
const TotalRevenue:FC<Props> = ({total, months, revenue}) => {
  return (
    <div>
      <div className="lg:flex items-center justify-between">
        <div>
          <p className=" fw-500 fs-600">Total revenue</p>
          <div className="flex items-center gap-x-2">
            <p className="text-2xl lg:text-3xl fw-600">{formatAsNgnMoney(`${total}`)}</p>
            <div className="flex rounded-full items-center gap-x-[1px] px-2 py-1 bg-[#05C16833] text-[#14CA74]">
              <GoArrowUpRight className="text-sm" />
            </div>
          </div>
        </div>
        <div className="lg:flex mt-2 lg:mt-0 gap-x-4 items-center">
          <div>
            <ul className="flex gap-x-2">
              <li className="flex gap-x-2 items-center">
                <span className="w-3 h-3 circle bg-[#9847FE]"></span>
                <span>Revenue</span>
              </li>
            </ul>
          </div>
          <div className="flex lg:block mt-2 lg:mt-0">
            <div className="flex items-center gap-x-2 cursor-pointer dark:bg-darkColorLight bg-white  px-2 py-1 rounded">
              <FaCalendar className="text-sm" />
              <p>Jan {dayjs().format('YYYY')} - Dec {dayjs().format('YYYY')}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <TotalRevenueChart months={months} revenue={revenue}/>
      </div>
    </div>
  );
};

export default TotalRevenue;
