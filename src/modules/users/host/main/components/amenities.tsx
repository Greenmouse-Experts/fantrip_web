import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import { FC } from "react";

interface Props {
  next: () => void;
  prev: () => void;
}
const Amenities: FC<Props> = ({ next, prev }) => {
  return (
    <div>
      <p className="text-xl lg:text-4xl fw-500">
        Amenities and Unique Features
      </p>
      <div className="mt-6">
        <p className="fs-400 lg:fs-600">
          Hosts provide details about standard amenities and unique,
          sports-related features.
        </p>
      </div>
      <div className="mt-8">
        <div className="lg:w-6/12 grid gap-5 grid-cols-2">
          <div className="flex items-center gap-x-3">
            <input type="checkbox" name="" id="" />
            <p>Wi-Fi</p>
          </div>
          <div className="flex items-center gap-x-3">
            <input type="checkbox" name="" id="" />
            <p>Parking</p>
          </div>
          <div className="flex items-center gap-x-3">
            <input type="checkbox" name="" id="" />
            <p>Tv</p>
          </div>
          <div className="flex items-center gap-x-3">
            <input type="checkbox" name="" id="" />
            <p>Air Conditioning</p>
          </div>
          <div className="col-span-2 lg:mt-5 flex gap-x-3 items-center">
            <div className="flex items-center gap-x-3">
              <input type="checkbox" name="" id="" />
              <p>Others</p>
            </div>
            <div>
              <input
                type="text"
                className="border rounded border-[#D2D2D2] p-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-7 lg:mt-12 lg:w-7/12">
        <TextInput
          type={InputType.text}
          placeholder="e.g., 'Autographed memorabilia display'"
          label="Unique Features and Sports-Related Amenities"
          labelClassName="text-black fw-600 lg:text-lg block mb-3"
          borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
          altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
        />
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

export default Amenities;
