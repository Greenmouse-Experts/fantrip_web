import Button from "@/components/Button";
import { FC } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { FaWifi } from "react-icons/fa6";
import { IoMdWine } from "react-icons/io";
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlineBalcony } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { VscJersey } from "react-icons/vsc";

interface Props{
    setActive: React.Dispatch<React.SetStateAction<number>>
}
const CondoDetails:FC<Props> = ({setActive}) => {
  return (
    <div>
      <div className="flex items-center justify-between pb-5 lg:pb-8 mt-6 lg:mt-10 border-b border-[#D2D2D2]">
        <div className="">
          <p className="text-lg lg:text-3xl fw-600">Modern Condo</p>
          <p className="mt-2 text-[#494949]">1 Double Bed . Shared Bathroom</p>
        </div>
        <div>
          <Button
            title={"Edit"}
            onClick={() => setActive(1)}
            altClassName="px-6 py-2 rounded-[20px] border border-[#000000]"
          />
        </div>
      </div>
      <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
       <div className="flex justify-between items-center mb-3">
       <p className="fw-600 lg:text-lg">Amenities and Unique Features</p>
        <div>
          <Button
            title={"Edit"}
            onClick={() => setActive(3)}
            altClassName="px-6 py-2 rounded-[20px] border border-[#000000]"
          />
        </div>
       </div>
        <div className="mt-4">
          <ul className="grid lg:grid-cols-2 gap-5">
            <li className="flex items-center gap-x-3">
              <SlScreenDesktop className="text-[#9847FE]" />
              <p className="fs-400">50" 4K TV with Premium Sports Package</p>
            </li>
            <li className="flex items-center gap-x-3">
              <MdOutlineBalcony className="text-[#9847FE]" />
              <p className="fs-400">
                Access to a private balcony with stadium view
              </p>
            </li>
            <li className="flex items-center gap-x-3">
              <FaWifi className="text-[#9847FE]" />
              <p className="fs-400">High-speed Wi-Fi for streaming the games</p>
            </li>
            <li className="flex items-center gap-x-3">
              <VscJersey className="text-[#9847FE] text-[18px]" />
              <p className="fs-400">Complimentary team merch for guests</p>
            </li>
            <li className="flex items-center gap-x-3">
              <IoMdWine className="text-[#9847FE]" />
              <p className="fs-400">
                In-house mini-bar stocked with game day snacks
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
        <div className="flex items-center justify-between mb-3">
        <p className="fw-600 lg:text-lg">Special Offers</p>
        <div>
          <Button
            title={"Edit"}
            onClick={() => setActive(5)}
            altClassName="px-6 py-2 rounded-[20px] border border-[#000000]"
          />
        </div>
        </div>
        <div className="mt-5">
          <ul className="grid gap-5">
            <li className="flex items-center gap-x-3">
              <CiDiscount1 className="text-[18px] text-[#9847FE]" />
              <p className="fs-400">10% off for game weekend bookings</p>
            </li>
            <li className="flex items-center gap-x-3">
              <CiDiscount1 className="text-[18px] text-[#9847FE]" />
              <p className="fs-400">Stay for 7 nights, get one night free</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
       <div className="flex items-center justify-between mb-3">
       <p className="fw-600 lg:text-lg">Pricing</p>
        <div>
          <Button
            title={"Edit"}
            onClick={() => setActive(2)}
            altClassName="px-6 py-2 rounded-[20px] border border-[#000000]"
          />
        </div>
       </div>
        <div className="mt-5">
          <ul className="grid gap-5">
            <li className="flex items-center gap-x-3">
              <IoPricetagOutline className="text-[18px] text-[#9847FE]" />
              <p className="fs-400">Weekdays: €70/night</p>
            </li>
            <li className="flex items-center gap-x-3">
              <IoPricetagOutline className="text-[18px] text-[#9847FE]" />
              <p className="fs-400">Game Days/Weekends: $119/night</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CondoDetails;
