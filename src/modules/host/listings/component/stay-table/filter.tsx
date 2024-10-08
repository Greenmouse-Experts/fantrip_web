import { FetchParam } from "@/lib/contracts/routine";
import React, { FC } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { formatStatus } from "@/lib/utils/formatHelp";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";

interface Props {
  setParams: React.Dispatch<React.SetStateAction<any>>;
  param: FetchParam;
}
const ListingFilter: FC<Props> = ({ param, setParams }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <div className="border px-4 py-3 border-gray-700 rounded-lg">
        <Menu>
          <MenuButton>
            <div className="flex gap-x-2 items-center">
              <p>Status:</p>
              {param.isDisclosed === null
                ? formatStatus["all"]
                : param.isDisclosed === 0
                ? formatStatus["draft"]
                : formatStatus["active"]}
              <FaChevronDown className="opacity-50" />
            </div>
          </MenuButton>
          <MenuList className="">
            <MenuItem
              onClick={() =>
                setParams({
                  isDisclosed: null,
                })
              }
            >
              <p className="text-black">All Listings</p>
            </MenuItem>
            <MenuItem
              onClick={() =>
                setParams({
                  isDisclosed: 1,
                })
              }
            >
              <p className="text-black">Active Listings</p>
            </MenuItem>
            <MenuItem
              onClick={() =>
                setParams({
                  isDisclosed: 0,
                })
              }
            >
              <p className="text-black">Draft Listings</p>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div
        onClick={() => navigate("/user/host")}
        className="border px-4 py-3 cursor-pointer border-gray-700 rounded-lg flex items-center gap-x-2"
      >
        <IoAddCircleOutline className="text-lg" />
        <p>
          Add <span className="hidden lg:inline">New</span> Stay
        </p>
      </div>
    </div>
  );
};

export default ListingFilter;
