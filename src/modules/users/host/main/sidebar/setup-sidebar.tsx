import { FC } from "react";
import { FaCircleCheck } from "react-icons/fa6";

interface Props {
  active: number;
}
const SetupSidebar: FC<Props> = ({ active }) => {
  return (
    <div className="">
      <div className="bg-layout-gradient w-full overflow-x-auto p-3 lg:p-8 rounded-[13px] sidebar-shadow">
        <div className="text-white">
          <ul className="w-full flex oveflow-x-auto lg:grid gap-7">
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 0 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Start New Listing</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 1 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Pricing</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 2 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Amenities</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 3 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Photos</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 4 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Special Offers</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 5 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Preview and Edit</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 6 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Publish Listing</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SetupSidebar;
