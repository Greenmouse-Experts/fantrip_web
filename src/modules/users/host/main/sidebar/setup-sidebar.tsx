import { FC } from "react";
import { FaCircleCheck } from "react-icons/fa6";

interface Props {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>
}
const SetupSidebar: FC<Props> = ({ active, setActive }) => {
  return (
    <div className="mb-4 lg:Mb-0">
      <div className="bg-layout-gradient w-full overflow-x-auto p-3 lg:p-8 rounded-[13px] sidebar-shadow">
        <div className="text-white">
          <ul className="w-full flex oveflow-x-auto whitespace-nowrap scroll-pro lg:grid gap-7">
            <li onClick={() => setActive(1)} className="cursor-pointer flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 0 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Start New Listing</p>
            </li>
            <li onClick={() => setActive(2)} className="cursor-pointer flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 1 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Pricing</p>
            </li>
            <li onClick={() => setActive(3)} className="cursor-pointer flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 2 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Amenities</p>
            </li>
            <li onClick={() => setActive(4)} className="cursor-pointer flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 3 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Photos</p>
            </li>
            <li onClick={() => setActive(5)} className="cursor-pointer flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 4 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Special Offers</p>
            </li>
            <li onClick={() => setActive(6)} className="cursor-pointer flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 5 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Preview and Edit</p>
            </li>
            <li className="cursor-pointer flex items-center gap-x-4">
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
