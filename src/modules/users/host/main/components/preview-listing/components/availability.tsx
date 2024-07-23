import useStay from "@/hooks/useStay";
import dayjs from "dayjs";
import { ChangeEvent, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import Button from "@/components/Button";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Availability = () => {
  const { stay, saveStay } = useStay();
  const prevValue = {
    from: stay.availableFrom ? dayjs(stay.availableFrom).toDate() : null,
    to: stay.availableTo ? dayjs(stay.availableTo).toDate() : null,
  };
  const [maxNight, setMaxNight] = useState<number | string>(stay.maxNights);
  const [maxGuests, setMaxGuests] = useState<number | string>(stay.maxGuests);

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

  const handleMaxGuests = () => {
    saveStay({
      ...stay,
      maxGuests: Number(maxGuests),
    });
  };

  const toast = useToast()
  const handleAllAdd = () => {
    if(!maxGuests || !maxNight || !stay.availableTo){
      toast({
        render: () => (
          <div className="text-white text-center fw-600 syne bg-[#9847FE] rounded p-3">
            All fields in this section are compulsory
          </div>
        ),
        position: "top",
      });
      return;
    }
    saveStay({
      ...stay,
      maxGuests: Number(maxGuests),
      maxNights: Number(maxNight),
    });
    toast({
      render: () => (
        <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
          Info added Successfully
        </div>
      ),
      position: "top",
    });
  }
  return (
    <div className="pb-6 border-b border-[#D2D2D2]">
      <div className="mt-3 flex">
        <div className="bg-[#FFEDF2] px-3 fw-500 py-3">
          Choose the dates when you can welcome a fellow fan!
        </div>
      </div>
      <div>
        <div className="mt-3">
          <p className="mb-2 text-gray-600 fw-500">Available From:</p>
          <Menu closeOnSelect={false}>
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
              <MenuItem className="rounded-[10px]">
                <Calendar
                  onChange={(value) => handleChange(value, "availableFrom")}
                  value={prevValue.from}
                  minDate={new Date()}
                />
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="mt-3">
          <p className="mb-2 text-gray-600 fw-500">Available Till:</p>
          {prevValue.from && (
            <Menu closeOnSelect={false}>
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
                <MenuItem className="rounded-[10px]">
                  <Calendar
                    onChange={(value) => handleChange(value, "availableTo")}
                    value={prevValue.to}
                    minDate={prevValue.from}
                  />
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-lg fw-500 mb-3">Maximum Guest(s)</p>
        <input
          type="number"
          value={maxGuests}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMaxGuests(e.target.value)
          }
          onBlur={handleMaxGuests}
          className="p-3 border border-gray-400 w-full outline-none rounded-[8px]"
        />
      </div>
      <div className="mt-4">
        <p className="text-lg fw-500 mb-3">Maximum Stay Nights</p>
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
      <div className="flex justify-end mt-5">
        <Button title={'Save'} altClassName="btn-int px-4 py-2" onClick={handleAllAdd}/>
      </div>
    </div>
  );
};

export default Availability;
