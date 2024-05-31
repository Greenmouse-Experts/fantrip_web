import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { LuMinus, LuPlus } from "react-icons/lu";
import { PiCaretDownThin } from "react-icons/pi";

interface Props {
  handleChange: (val: number, type: string) => void;
  no_of_guests: number | null;
  no_of_child: number | null;
  maxGuest: number
}
const GuestNoInput: FC<Props> = ({
  handleChange,
  no_of_guests,
  no_of_child,
  maxGuest
}) => {
  const [adultVal, setAdultVal] = useState(no_of_guests || 0);
  const [childVal, setChildVal] = useState(no_of_child || 0);
  const handleAdultChange = (type: string) => {
    if (type === "add") {
      if (adultVal < maxGuest) {
        const val = adultVal + 1;
        setAdultVal(val);
        handleChange(val, "no_of_guests");
      }
    } else {
      if (adultVal > 1) {
        const val = adultVal - 1;
        setAdultVal(val);
        handleChange(val, "no_of_guests");
      }
    }
  };
  const handleChildChange = (type: string) => {
    if (type === "add") {
      if (childVal < 5) {
        const val = childVal + 1;
        setChildVal(val);
        handleChange(val, "no_of_child");
      }
    } else {
      if (childVal > 1) {
        const val = childVal - 1;
        setChildVal(val);
        handleChange(val, "no_of_child");
      }
    }
  };
  return (
    <div className="w-full">
      <Menu closeOnSelect={false}>
        <MenuButton
          borderRadius={"xl"}
          className="!rounded-[10px] w-full"
          transition="all 0.2s"
        >
          <div className="flex gap-x-4 cursor-pointer items-center">
            <FaRegUser className="text-xl" />
            {no_of_guests ? (
              <div className="w-full flex justify-between items-center">
                <p className="fw-500">
                  Guests ({no_of_guests} Adults, {no_of_child} Children)
                </p>
                <PiCaretDownThin />
              </div>
            ) : (
              <div className="w-full flex justify-between items-center">
                <p className="fw-500">Select No of Guests</p>
                <PiCaretDownThin />
              </div>
            )}
          </div>
        </MenuButton>
        <MenuList className="p-3 w-[300px] lg:w-[340px] !rounded-[10px]">
          <MenuItem className="w-full my-3 hover:bg-white">
            <div className="w-full flex items-center justify-between">
              <p className="fw-500">Adults</p>
              <div className="flex items-center gap-x-3">
                <button
                  className="bg-gray-200 p-1 rounded"
                  onClick={() => handleAdultChange("minus")}
                >
                  <LuMinus />
                </button>
                <span className="fw-600">{adultVal}</span>
                <button
                  className="bg-gray-200 p-1 rounded"
                  onClick={() => handleAdultChange("add")}
                >
                  <LuPlus />
                </button>
              </div>
            </div>
          </MenuItem>
          <MenuItem className="w-full mb-3 hover:bg-white">
            <div className="w-full flex items-center justify-between">
              <p className="fw-500">Children</p>
              <div className="flex items-center gap-x-3">
                <button
                  className="bg-gray-200 p-1 rounded"
                  onClick={() => handleChildChange("minus")}
                >
                  <LuMinus />
                </button>
                <span className="fw-600">{childVal}</span>
                <button
                  className="bg-gray-200 p-1 rounded"
                  onClick={() => handleChildChange("add")}
                >
                  <LuPlus />
                </button>
              </div>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default GuestNoInput;
