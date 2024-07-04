import { FC } from "react";
import { FaCircleCheck } from "react-icons/fa6";

interface Props {
  active: number;
}
const SetupSidebar: FC<Props> = ({ active }) => {
  return (
    <div className="mb-4 lg:mb-0">
      <div className="bg-layout-gradient p-4 lg:p-8 rounded-[13px] sidebar-shadow">
        <div className="text-white">
          <ul className="flex w-full overflow-x-auto scroll-pro whitespace-nowrap lg:grid gap-7">
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 0 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Profile Information</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 1 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Photos</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 2 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Bio</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 3 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Social Media</p>
            </li>
            <li className="flex items-center gap-x-4">
              <FaCircleCheck
                className={`text-lg ${
                  active > 4 ? "text-[#1CA976]" : "text-[#B5B5B5]"
                }`}
              />
              <p className="fw-500">Verification</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SetupSidebar;
