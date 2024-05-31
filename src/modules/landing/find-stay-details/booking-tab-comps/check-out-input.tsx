import { Menu, MenuButton, MenuList, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FC } from "react";
import { FiCalendar } from "react-icons/fi";
import Calendar from "react-calendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { PiCaretDownThin } from "react-icons/pi";
import { convertDaysToMilliSeconds } from "@/lib/utils/helper-function";

const DAYS_IN_MS = 86400000;
type ValuePiece = Date | null;
interface Props {
  value: ValuePiece | [ValuePiece, ValuePiece] | null;
  checkin: ValuePiece | [ValuePiece, ValuePiece] | null;
  handleChange: (
    val: ValuePiece | [ValuePiece, ValuePiece],
    type: string
  ) => void;
  to: string;
  maxNight: number;
}
const CheckOutInput: FC<Props> = ({
  value,
  handleChange,
  to,
  checkin,
  maxNight,
}) => {
  const fromDate = dayjs(checkin as unknown as string).valueOf() + DAYS_IN_MS;
  const maxSelection = () => {
    const fromInUnix = dayjs(checkin as unknown as string).valueOf();
    const AddMaxToFrom = fromInUnix + convertDaysToMilliSeconds(maxNight);
    const ToInUnix = dayjs(to as unknown as string).valueOf();
    if (AddMaxToFrom > ToInUnix) {
      return dayjs(to).toDate();
    } else return dayjs(AddMaxToFrom).toDate();
  };
  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Please select a check in date",
      isClosable: true,
      position: "top",
      status: "error",
    });
  };
  return (
    <div className="w-full">
      {checkin ? (
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
                onChange={(value) => handleChange(value, "checkOut")}
                value={value}
                minDate={dayjs(fromDate).toDate()}
                maxDate={maxSelection()}
              />
            </div>
          </MenuList>
        </Menu>
      ) : (
        <div
          className="flex gap-x-4 cursor-pointer items-center"
          onClick={() => showToast()}
        >
          <FiCalendar className="text-xl" />
          <div className="w-full flex justify-between items-center">
            <p className="fw-500">Check Out</p>
            <PiCaretDownThin />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutInput;
