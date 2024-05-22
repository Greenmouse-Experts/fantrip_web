import useStay from "@/hooks/useStay";
import dayjs from "dayjs";
import { ChangeEvent, useState } from "react";
import Calendar from "react-calendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Availability = () => {
  const { stay, saveStay } = useStay();
  const prevValue = {
    from: stay.availableFrom ? dayjs(stay.availableFrom).toDate() : null,
    to: stay.availableTo ? dayjs(stay.availableTo).toDate() : null,
  };
  const [maxNight, setMaxNight] = useState<number | string>(stay.maxNights);

  const handleChange = (val: Value, type: string) => {
    const daet = val as any;
    saveStay({
      ...stay,
      [type]: val ? dayjs(daet).format("YYYY-MM-DD") : "",
    });
  };

  const handleMaxNight = () => {
    saveStay({
      ...stay,
      maxNights: Number(maxNight),
    });
  };
  return (
    <div className="pb-6 border-b border-[#D2D2D2]">
      <div className="mt-3 flex">
        <div className="bg-[#FFEDF2] px-3 fw-500 py-3">
          Choose accurate stay availability for fan stay booking
        </div>
      </div>
      <div>
        <div className="mt-3">
          <p className="mb-2 text-gray-600 fw-500">Available From:</p>
          <Menu>
            <MenuButton
              borderRadius={"xl"}
              className="!rounded-[10px] "
              transition="all 0.2s"
            >
              <div className="flex gap-x-4 cursor-pointer items-center">
                <FiCalendar className="text-xl" />
                {prevValue.from ? (
                  <p className="fw-500">
                    {dayjs(prevValue.from as unknown as string).format(
                      "DD - MM - YYYY"
                    )}
                  </p>
                ) : (
                  <p className="fw-500">PLease select a date</p>
                )}
              </div>
            </MenuButton>
            <MenuList className="!pt-0 !pb-0 !rounded-[10px]">
              <div className="">
                <Calendar
                  onChange={(value) => handleChange(value, "availableFrom")}
                  value={prevValue.from}
                  minDate={new Date()}
                />
              </div>
            </MenuList>
          </Menu>
        </div>
        <div className="mt-3">
          <p className="mb-2 text-gray-600 fw-500">Available Till:</p>
          {prevValue.from && (
            <Menu>
              <MenuButton
                borderRadius={"xl"}
                className="!rounded-[10px] "
                transition="all 0.2s"
              >
                <div className="flex gap-x-4 cursor-pointer items-center">
                  <FiCalendar className="text-xl" />
                  {prevValue.to ? (
                    <p className="fw-500">
                      {dayjs(prevValue.to as unknown as string).format(
                        "DD - MM - YYYY"
                      )}
                    </p>
                  ) : (
                    <p className="fw-500">Not Selected</p>
                  )}
                </div>
              </MenuButton>
              <MenuList className="!pt-0 !pb-0 !rounded-[10px]">
                <div className="">
                  <Calendar
                    onChange={(value) => handleChange(value, "availableTo")}
                    value={prevValue.to}
                    minDate={prevValue.from}
                  />
                </div>
              </MenuList>
            </Menu>
          )}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-lg fw-500 mb-4">Maximum Stay Nights</p>
        <input
          type="number"
          value={maxNight}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMaxNight(e.target.value)
          }
          onBlur={handleMaxNight}
          className="p-3 border border-gray-400 w-full outline-none rounded-[8px]"
        />
      </div>
    </div>
  );
};

export default Availability;
