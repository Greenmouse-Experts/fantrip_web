import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import { FC } from "react";

interface Props {
  next: () => void;
}
const StartListing: FC<Props> = ({ next }) => {
  return (
    <div>
      <p className="text-xl lg:text-4xl">Start New Listing</p>
      <div className="mt-6">
        <div className="lg:w-9/12 mt-8 grid gap-5">
          <TextInput
            type={InputType.text}
            placeholder="e.g., 'Champion's Loft'"
            label="Enter a Sports-themed Accommodation Name"
            labelClassName="text-black fw-600 lg:text-lg block mb-3"
            borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
            altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
          />
          <div>
            <p className="text-black fw-600 lg:text-lg block mb-3">
              Type of Property
            </p>
            <div className="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none">
              <select className="w-[95%] p-3 bg-[#F9FAFC] lg:p-[15px] outline-none rounded-[10px]">
                <option value="" disabled>
                  Select type of property
                </option>
                <option value=""></option>
              </select>
            </div>
          </div>
          <TextInput
            type={InputType.text}
            placeholder="e.g., '5 min walk from Downtown Stadium'"
            label="Location Details"
            labelClassName="text-black fw-600 lg:text-lg block mb-3"
            borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
            altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
          />
          <TextInput
            type={InputType.text}
            placeholder="e.g., '1 Queen Bed'"
            label="Number and Type of Beds"
            labelClassName="text-black fw-600 lg:text-lg block mb-3"
            borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
            altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
          />
          <TextInput
            type={InputType.text}
            placeholder="e.g., 'Spectacular Stadium View'"
            label="Highlight Feature"
            labelClassName="text-black fw-600 lg:text-lg block mb-3"
            borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
            altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
          />
        </div>
      </div>
      <div className="mt-8 lg:mt-16 flex justify-end">
        <div className="btn-primary cursor-pointer px-6 py-2 lg:py-3" onClick={next}>
          <BtnContent name="Continue" />
        </div>
      </div>
    </div>
  );
};

export default StartListing;
