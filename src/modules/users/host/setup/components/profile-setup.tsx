import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import useAuth from "@/hooks/authUser";
import { ChangeEvent, FC, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import dayjs from "dayjs";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
interface Props {
  next: () => void;
}
const ProfileSetup: FC<Props> = ({ next }) => {
  const { kyc, saveKyc, user } = useAuth();
  const toast = useToast()
  const [fullname, setFullname] = useState(`${user.name}` || kyc?.fullName || "");
  const dob = kyc.dob || kyc.dob
  const handleChange = (val: Value) => {
    const daet = val as any;
    saveKyc({
      ...kyc,
      dob: val ? dayjs(daet).format("YYYY-MM-DD") : "",
    });
  };
  const handleNext = () => {
    if(!kyc.dob){
      toast({
        render: () => (
          <div className="text-white w-[290px] text-center fw-600 syne bg-[#9847FE] rounded p-3">
            Please select your date of birth
          </div>
        ),
        position: "top",
      });
      return;
    }
    saveKyc({
      ...kyc,
      fullName: fullname,
    });
    next();
  };
  return (
    <div>
      <p className="text-xl lg:text-4xl">Host profile set up</p>
      <div className="mt-6 flex gap-x-1">
        <BsInfoCircle className="shrink-0 relative top-[4px]" />
        <p className="fs-400">
          Please note, for safety and verification purposes, your real name is
          required to list your accommodation. This information will be used
          solely for booking transactions and will not be visible in other parts
          of the app.
        </p>
      </div>
      <div className="lg:w-7/12 mt-8">
        <TextInput
          type={InputType.text}
          value={fullname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFullname(e.target.value)
          }
          label="Enter Full Legal Names"
          labelClassName="text-[#9F9F9F]"
        />
      </div>
      <div className="mt-3">
          <p className="mb-2 text-[#9F9F9F]">Date of Birth</p>
          <Menu closeOnSelect={false}>
            <MenuButton
              borderRadius={"xl"}
              className="!rounded-[6px] p-3 w-full lg:w-7/12 border border-gray-400"
              transition="all 0.2s"
            >
              <div className="flex gap-x-4 cursor-pointer items-center">
                <FiCalendar className="text-xl" />
                {dob ? (
                  <p className="fw-500">
                    {dayjs(dob as unknown as string).format(
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
                  onChange={(value) => handleChange(value)}
                  value={dob}
                  maxDate={new Date()}
                />
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      <div className="mt-8 flex gap-x-1 text-[#E50038]">
        <BsInfoCircle className="text-sm shrink-0 relative top-[4px]" />
        <p className="fs-400 ">Users must be 18 and above to use Fantrip</p>
      </div>
      <div className="mt-8 flex justify-end">
        <div
          className="btn-primary cursor-pointer px-6 py-2"
          onClick={() => handleNext()}
        >
          <BtnContent name="Continue to photos" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
