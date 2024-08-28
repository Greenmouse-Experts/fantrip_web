import useDialog from "@/hooks/useDialog";
import LogoutModal from "@/modules/auth/modals/logout-modal";
import React, { FC } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { RxLink2 } from "react-icons/rx";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa6";

interface Props {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}
const MobileSidebar: FC<Props> = ({ active, setActive }) => {
  const { Dialog, setShowModal } = useDialog();

  const formatActive = {
    1: "My Profile",
    2: "Change Password",
    3: "Referrals",
    4:"Socials"
  }
  return (
    <div>
      <div>
        <Menu>
          <MenuButton className="p-0 m-0">
            <div className="flex gap-x-2 fw-600 items-center relative top-[2px]">
              {formatActive[active as keyof typeof formatActive]}
              <FaAngleDown/>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem className="border-b">
              <div
                className={`w-full px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] dark:bg-darkColorLight flex justify-between items-center hover:border hover:border-[#9847FE] ${
                  active === 1 && "border border-[#9847FE]"
                }`}
                onClick={() => setActive(1)}
              >
                <p>Account</p>
                <FaUserCircle className="text-xl" />
              </div>
            </MenuItem>
            <MenuItem className="border-b">
              <div
                className={`w-full px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] dark:bg-darkColorLight flex justify-between items-center hover:border hover:border-[#9847FE] ${
                  active === 2 && "border border-[#9847FE]"
                }`}
                onClick={() => setActive(2)}
              >
                <p>Security</p>
                <BsGear className="text-xl" />
              </div>
            </MenuItem>
            <MenuItem className="border-b">
              <div
                className={`w-full px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] dark:bg-darkColorLight flex justify-between items-center hover:border hover:border-[#9847FE] ${
                  active === 3 && "border border-[#9847FE]"
                }`}
                onClick={() => setActive(3)}
              >
                <p>Referral</p>
                <RxLink2 className="text-xl" />
              </div>
            </MenuItem>
            <MenuItem className="border-b">
              <div
                className={`w-full px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] dark:bg-darkColorLight flex justify-between items-center hover:border hover:border-[#9847FE] ${
                  active === 4 && "border border-[#9847FE]"
                }`}
                onClick={() => setActive(3)}
              >
                <p>Socials</p>
                <RxLink2 className="text-xl" />
              </div>
            </MenuItem>
            <MenuItem className="">
              <div
                className="w-full px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] dark:bg-darkColorLight flex justify-between items-center hover:border hover:border-[#9847FE] text-red-600"
                onClick={() => setShowModal(true)}
              >
                <p>Logout</p>
                <BiLogOut className="text-xl" />
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <Dialog title="" size="sm">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default MobileSidebar;
