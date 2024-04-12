import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";

interface Props{
    next: () => void
}
const SetupSocials:FC<Props> = ({next}) => {
  return (
    <div>
      <p className="text-xl lg:text-4xl">Link Social Media</p>
      <div className="mt-6 flex gap-x-1">
        <BsInfoCircle className="shrink-0 text-sm relative top-[4px]" />
        <p className="fs-400">
          Your social media is only visible to Fantrip for verification
          purposes.
        </p>
      </div>
      <div className="mt-5">
        <p className="fw-500 fs-500">Social Media Accounts</p>
        <div className="mt-4 grid gap-4 lg:w-8/12">
          <TextInput
            type={InputType.text}
            label="Facebook"
            labelClassName="text-[#9F9F9F]"
          />
          <TextInput
            type={InputType.text}
            label="Twitter"
            labelClassName="text-[#9F9F9F]"
          />
          <TextInput
            type={InputType.text}
            label="Instagram"
            labelClassName="text-[#9F9F9F]"
          />
          <TextInput
            type={InputType.text}
            label="Linkedin"
            labelClassName="text-[#9F9F9F]"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <div className="btn-primary cursor-pointer px-6 py-2" onClick={next}>
          <BtnContent name="Continue" />
        </div>
      </div>
    </div>
  );
};

export default SetupSocials;
