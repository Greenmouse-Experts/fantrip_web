import { FC } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RxLink2 } from "react-icons/rx";

interface Props{
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>
}
const SidebarLayout:FC<Props> = ({setActive, active}) => {
  return (
    <div className="py-12">
      <div>
        <div className="w-36 relative mx-auto">
          <img
            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1712921717/fantrip/Ellipse_56_frahhh.png"
            alt="profile"
            className="w-36"
          />
          <div className="absolute bg-white top-0 right-2 cursor-pointer w-8 h-8 circle place-center circle-shadow p-1">
            <GoPencil className="text-xl" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xl fw-600 text-center">Victor Dwayne</p>
          <div className="flex justify-center">
            <p className="mt-2 bg-green-100 text-green-700 fw-500 px-4 py-1">
              Verified
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4">
          <div className={`px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] flex justify-between items-center hover:border hover:border-[#9847FE] ${active === 1 && 'border border-[#9847FE]'}`} onClick={() => setActive(1)}>
            <p>Account</p>
            <FaUserCircle className="text-xl" />
          </div>
          <div className={`px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] flex justify-between items-center hover:border hover:border-[#9847FE] ${active === 2 && 'border border-[#9847FE]'}`}  onClick={() => setActive(2)}>
            <p>Security</p>
            <BsGear className="text-xl" />
          </div>
          <div className={`px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] flex justify-between items-center hover:border hover:border-[#9847FE] ${active === 3 && 'border border-[#9847FE]'}`}  onClick={() => setActive(3)}>
            <p>Referral</p>
            <RxLink2 className="text-xl" />
          </div>
          <div className="px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] flex justify-between items-center hover:border hover:border-[#9847FE] text-red-600">
            <p>Logout</p>
            <BiLogOut className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
