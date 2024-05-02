import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import useAuth from "@/hooks/authUser";
import { ChangeEvent, FC, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";

interface Props {
  next: () => void;
}
const ProfileSetup: FC<Props> = ({ next }) => {
  const { kyc, saveKyc, user } = useAuth();
  const [fullname, setFullname] = useState(`${user.name}` || kyc?.fullName || "");
  const handleNext = () => {
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
