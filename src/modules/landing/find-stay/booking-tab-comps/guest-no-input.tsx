import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC } from "react";
import { FaRegUser } from "react-icons/fa6";
import { PiCaretDownThin } from "react-icons/pi";

interface Props {
  handleChange: (val: number, type: string) => void;
  no_of_guests: number | null;
}
const GuestNoInput: FC<Props> = ({ handleChange, no_of_guests }) => {
  const val = Array(6).fill("");
  return (
    <div className="w-full">
      <Menu>
        <MenuButton
          borderRadius={"xl"}
          className="!rounded-[10px] w-full"
          transition="all 0.2s"
        >
          <div className="flex gap-x-4 cursor-pointer items-center">
            <FaRegUser className="text-xl" />
            {no_of_guests ? (
              <div className="w-full flex justify-between items-center">
                <p className="fw-500">Guests ({no_of_guests} Adults)</p>
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
        <MenuList className="!pt-0 !pb-0 !rounded-[10px]">
          {val.map((_, i: number) => (
            <MenuItem onClick={() => handleChange(i + 1, "no_of_guests")}>
              {i + 1}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default GuestNoInput;
