import { FetchParam } from "@/lib/contracts/routine";
import React, { FC } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { formatStatus } from "@/lib/utils/formatHelp";

interface Props {
  setParams: React.Dispatch<React.SetStateAction<any>>;
  param: FetchParam;
}
const BookingFilter: FC<Props> = ({ param, setParams }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="border px-4 py-3 border-gray-700 rounded-lg">
        <Menu>
          <MenuButton>
            <div className="flex gap-x-2 items-center">
              <p>Status:</p>
              {
                formatStatus[
                  param.status?.toLowerCase() as keyof typeof formatStatus
                ]
              }
            </div>
          </MenuButton>
          <MenuList className="">
            <MenuItem
              onClick={() =>
                setParams({
                  ...param,
                  status: "Pending",
                })
              }
            >
              <p className="text-black">Upcoming Booking</p>
            </MenuItem>
            <MenuItem
              onClick={() =>
                setParams({
                  ...param,
                  status: "Checkedin",
                })
              }
            >
              <p className="text-black">Checked In</p>
            </MenuItem>
            <MenuItem
              onClick={() =>
                setParams({
                  ...param,
                  status: "Checkedout",
                })
              }
            >
              <p className="text-black">Checked Out</p>
            </MenuItem>
            <MenuItem
              onClick={() =>
                setParams({
                  ...param,
                  status: "Cancelled",
                })
              }
            >
              <p className="text-black">Cancelled Bookings</p>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default BookingFilter;
