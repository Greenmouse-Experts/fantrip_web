import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineEuro } from "react-icons/md";
import InfoText from "./pricing/info-text";

interface Props {
  next: () => void;
  prev: () => void;
}
const Pricing: FC<Props> = ({ next, prev }) => {
  return (
    <div>
      {" "}
      <p className="text-xl lg:text-4xl fw-500">Pricing</p>
      <div className="mt-6 flex gap-x-1">
        <BsInfoCircle className="shrink-0 text-sm lg:text-[17px] relative top-[4px]" />
        <p className="fs-400 lg:fs-600">
          Note: Fantrip charges a 15% service fee.
        </p>
      </div>
      <div className="mt-12">
        <p className="fw-500 lg:text-lg">Standard Rate Per Night</p>
        <div className="lg:w-9/12 grid gap-5">
          <TextInput
            type={InputType.text}
            label=""
            labelClassName=""
            borderClass="flex items-center pl-3 border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
            altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full outline-none"
            icon={
              <MdOutlineEuro className="text-[#9F9F9F] shrink-0 lg:text-lg" />
            }
          />
        </div>
        <div className="mt-7 lg:mt-12">
          <InfoText />
        </div>
      </div>
      <div className="mt-8 lg:mt-16 flex justify-between items-center">
        <div className="btn-primary cursor-pointer px-6 py-2 lg:py-3" onClick={prev}>
          <BtnContent name="Prev" reverse/>
        </div>
        <div className="btn-primary cursor-pointer px-6 py-2 lg:py-3" onClick={next}>
          <BtnContent name="Continue" />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
