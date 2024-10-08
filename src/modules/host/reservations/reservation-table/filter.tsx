import React, { FC } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { formatStatus } from "@/lib/utils/formatHelp";
import { FetchParam } from "@/lib/contracts/routine";
import { RESERVATION_STATUS } from "@/lib/contracts/enums";
import { FaChevronDown } from "react-icons/fa6";

interface Props {
  setParams: React.Dispatch<React.SetStateAction<any>>;
  param: FetchParam;
}
const ReservationFilter: FC<Props> = ({ setParams, param }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="border px-4 py-3 border-gray-700 rounded-lg">
          <Menu>
            <MenuButton>
              <div className="flex gap-x-2 items-center">
                <p>Status:</p>
                {formatStatus[param.status as keyof typeof formatStatus]}
                <FaChevronDown className="ml-2 opacity-70 relative -top-[1px]"/>
              </div>
            </MenuButton>
            <MenuList className="">
            <MenuItem
                onClick={() =>
                  setParams({
                    ...param,
                    status: RESERVATION_STATUS.ALL,
                  })
                }
              >
                <p className="text-black">All Reservations</p>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  setParams({
                    ...param,
                    status: RESERVATION_STATUS.PENDING,
                  })
                }
              >
                <p className="text-black">Pending Reservations</p>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  setParams({
                    ...param,
                    status: RESERVATION_STATUS.CONFIRMED,
                  })
                }
              >
                <p className="text-black">Confirmed Reservations</p>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  setParams({
                    ...param,
                    status: RESERVATION_STATUS.CANCELLED,
                  })
                }
              >
                <p className="text-black">Cancelled Reservations</p>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default ReservationFilter;
