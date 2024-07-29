import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FC } from "react";
import { FiCalendar } from "react-icons/fi";
import Calendar from "react-calendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { PiCaretDownThin } from "react-icons/pi";

type ValuePiece = Date | null;
interface Props {
  value: ValuePiece | [ValuePiece, ValuePiece] | null;
  handleChange: (
    val: ValuePiece | [ValuePiece, ValuePiece],
    type: string
  ) => void;
  from: string;
  to: string;
}
const CheckInInput: FC<Props> = ({ value, handleChange, from, to }) => {
  const getStart = () => {
    const now = dayjs();
    const diff = dayjs(from).diff(now, "hour");
    if (diff > 1) {
      return dayjs(from).toDate();
    } else return new Date();
  };
  
  return (
    <div className="w-full">
      <Menu>
        <MenuButton
          borderRadius={"xl"}
          className="!rounded-[10px] w-full"
          transition="all 0.2s"
        >
          <div className="flex gap-x-4 cursor-pointer items-center">
            <FiCalendar className="text-xl" />
            {value ? (
              <p className="fw-500">
                {dayjs(value as unknown as string).format("DD - MM - YYYY")}
              </p>
            ) : (
              <div className="w-full flex justify-between items-center">
                <p className="fw-500">Check In</p>
                <PiCaretDownThin />
              </div>
            )}
          </div>
        </MenuButton>
        <MenuList className="!pt-0 !pb-0 !rounded-[10px]">
          <div className="">
            <Calendar
              onChange={(value) => handleChange(value, "checkIn")}
              value={value}
              minDate={getStart()}
              maxDate={dayjs(to).toDate()}
            />
          </div>
        </MenuList>
      </Menu>
    </div>
  );
};

export default CheckInInput;
