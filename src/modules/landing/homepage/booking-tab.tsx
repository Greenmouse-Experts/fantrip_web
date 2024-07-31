import Button from "../../../components/Button";
import { FiCalendar } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { PiCaretDownThin } from "react-icons/pi";
import { FC, useState } from "react";
import Calendar from "react-calendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { Menu, MenuButton, MenuList, Select } from "@chakra-ui/react";
import CitySearch from "./booking-tab/city-search";
import { useUtils } from "@/hooks/useUtils";
import { useNavigate } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";

// type ValuePiece = Date | null;
interface SearchParam {
  name: string;
  state: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}
interface Props {
  home?: boolean;
}
const BookingTab: FC<Props> = ({ home }) => {
  const navigate = useNavigate();
  const { stayParams, saveStayParam, resetParams } = useUtils();
  const [params, setParams] = useState<SearchParam>({
    name: stayParams.name || "",
    state: stayParams.city || stayParams.state || "",
    checkIn: stayParams.checkIn || "",
    checkOut: stayParams.checkOut || "",
    guests: stayParams.guests || 1,
  });

  const handleChange = (val: any, field: string) => {
    setParams({ ...params, [field]: val });
  };

  const checkField = () => {
    if (stayParams.state || stayParams.checkIn || stayParams.checkOut) {
      return true;
    } else return false;
  };

  const handleSearch = () => {
    const payload = {
      ...stayParams,
      ...params,
    };
    saveStayParam(payload);
    if (home) {
      navigate("/find-stay", { state: { targetId: "results" } });
    }
  };

  return (
    <div className="box">
      <div className="w-full bg-white lg:rounded-[100px] book-tab-border px-6 py-3 lg:pl-12">
        <div className="lg:flex w-full ">
          <div className="grid items-center gap-9 md:p-3 md:grid-cols-2 lg:gap-0 lg:grid-cols-4 lg:divide-x divide-gray-400 w-full">
            <div className="w-full">
              <CitySearch handleChange={handleChange} prevValue={params.name} />
            </div>
            <div className="relative lg:flex justify-center">
              <Menu>
                <MenuButton
                  borderRadius={"xl"}
                  className="!rounded-[10px]"
                  transition="all 0.2s"
                >
                  <div className="flex gap-x-4 cursor-pointer items-center">
                    <FiCalendar className="text-xl" />
                    {params.checkIn ? (
                      <p className="fw-500">{params?.checkIn}</p>
                    ) : (
                      <p className="fw-500">Check In</p>
                    )}
                  </div>
                </MenuButton>
                <MenuList className="overflow-hidden !pt-0 !pb-0 !rounded-[10px]">
                  <div className="w-full">
                    <Calendar
                      onChange={(value) =>
                        handleChange(
                          dayjs(value as unknown as string).format(
                            "YYYY-MM-DD"
                          ),
                          "checkIn"
                        )
                      }
                      value={
                        params.checkIn
                          ? dayjs(params.checkIn).toDate()
                          : dayjs().toDate()
                      }
                    />
                  </div>
                </MenuList>
              </Menu>
            </div>
            <div className="relative lg:flex justify-center">
              <Menu>
                <MenuButton
                  borderRadius={"xl"}
                  transition="all 0.2s"
                  className="!rounded-[10px]"
                >
                  <div className="flex gap-x-4 cursor-pointer items-center">
                    <FiCalendar className="text-xl" />
                    {params.checkOut ? (
                      <p className="fw-500">{params?.checkOut}</p>
                    ) : (
                      <p className="fw-500">Check Out</p>
                    )}
                  </div>
                </MenuButton>
                <MenuList className="overflow-hidden !pt-0 !pb-0 !rounded-[10px]">
                  <div className="w-full">
                    <Calendar
                      onChange={(value) =>
                        handleChange(
                          dayjs(value as unknown as string).format(
                            "YYYY-MM-DD"
                          ),
                          "checkOut"
                        )
                      }
                      value={
                        params.checkOut
                          ? dayjs(params.checkOut).toDate()
                          : dayjs().toDate()
                      }
                    />
                  </div>
                </MenuList>
              </Menu>
            </div>
            <div className="lg:flex justify-center">
              <div className="flex gap-x-6 cursor-pointer items-center">
                <FaRegUser className="text-xl" />
                <Select
                  icon={<PiCaretDownThin />}
                  value={params.guests}
                  onChange={(value) => handleChange(value, "no_of_guests")}
                  variant="unstyled"
                  placeholder="Guests"
                  className="fw-500"
                >
                  <option value="1">1 (one)</option>
                  <option value="2">2 (two)</option>
                  <option value="3">3 (three)</option>
                  <option value="4">4 (four)</option>
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:mt-0 flex items-center gap-x-2">
            <Button
              title={"Search"}
              altClassName="btn-primary w-full lg:w-auto shrink-0 py-4 lg:py-5 lg:px-16 fw-600 px-12"
              onClick={handleSearch}
            />
            {checkField() && (
              <div
                className="w-12 h-12 bg-red-600 text-white cursor-pointer place-center circle"
                onClick={() => resetParams()}
              >
                <LiaTimesSolid />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTab;
