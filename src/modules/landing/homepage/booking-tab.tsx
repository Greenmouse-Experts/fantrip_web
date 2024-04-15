import Button from "../../../components/Button";
import { FiCalendar } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { PiCaretDownThin } from "react-icons/pi";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { Menu, MenuButton, MenuList, Select } from "@chakra-ui/react";
import CitySearch from "./booking-tab/city-search";

type ValuePiece = Date | null;
interface SearchParam {
  city: string;
  checkIn: ValuePiece | [ValuePiece, ValuePiece] | null;
  checkOut: ValuePiece | [ValuePiece, ValuePiece] | null;
  no_of_guests: number | null;
}
const BookingTab = () => {
  const [params, setParams] = useState<SearchParam>({
    city: "",
    checkIn: null,
    checkOut: null,
    no_of_guests: null,
  });
  const handleChange = (val: any, field: string) => {
    setParams({ ...params, [field]: val });
  };
  return (
    <div className="box">
      <div className="w-full bg-white lg:rounded-[100px] book-tab-border px-6 py-3 lg:pl-12">
        <div className="lg:flex w-full ">
          <div className="grid items-center gap-9 lg:gap-0 lg:grid-cols-4 lg:divide-x divide-gray-400 w-full">
            <div>
              <CitySearch/>
            </div>
            <div className="relative lg:flex justify-center">
              <Menu >
                <MenuButton borderRadius={'xl'} className="!rounded-[10px]"  transition='all 0.2s'>
                  <div className="flex gap-x-4 cursor-pointer items-center">
                    <FiCalendar className="text-xl" />
                    {params.checkIn ? (
                      <p className="fw-500">
                        {dayjs(params?.checkIn as unknown as string).format(
                          "DD - MM - YYYY"
                        )}
                      </p>
                    ) : (
                      <p className="fw-500">Check In</p>
                    )}
                  </div>
                </MenuButton>
                <MenuList className="!pt-0 !pb-0 !rounded-[10px]">
                  <div className="">
                    <Calendar
                      onChange={(value) => handleChange(value, "checkIn")}
                      value={params.checkIn}
                    />
                  </div>
                </MenuList>
              </Menu>
            </div>
            <div className="relative lg:flex justify-center">
              <Menu >
                <MenuButton borderRadius={'xl'}  transition='all 0.2s' className="!rounded-[10px]">
                  <div className="flex gap-x-4 cursor-pointer items-center">
                    <FiCalendar className="text-xl" />
                    {params.checkOut ? (
                      <p className="fw-500">
                        {dayjs(params?.checkOut as unknown as string).format(
                          "DD - MM - YYYY"
                        )}
                      </p>
                    ) : (
                      <p className="fw-500">Check Out</p>
                    )}
                  </div>
                </MenuButton>
                <MenuList className="!pt-0 !pb-0 !rounded-[10px]">
                  <div className="">
                    <Calendar
                      onChange={(value) => handleChange(value, "checkOut")}
                      value={params.checkOut}
                    />
                  </div>
                </MenuList>
              </Menu>
            </div>
            <div className="lg:flex justify-center">
              <div className="flex gap-x-6 cursor-pointer items-center">
                <FaRegUser className="text-xl" />
                <Select icon={<PiCaretDownThin />} variant='unstyled' placeholder='Guests' className="fw-500">
                  <option value="1">1 (one)</option>
                  <option value="2">2 (two)</option>
                  <option value="3">3 (three)</option>
                  <option value="4">4 (four)</option>
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <Button
              title={"Search"}
              altClassName="btn-primary w-full lg:w-auto shrink-0 py-4 lg:py-5 lg:px-16 fw-600 px-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTab;
