import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import useStay from "@/hooks/useStay";
import { removeDulicates } from "@/lib/utils/formatHelp";
import { ChangeEvent, FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";

interface Props {
  next: () => void;
  prev: () => void;
}
const SpecialOffer: FC<Props> = ({ next, prev }) => {
  const { stay, saveStay } = useStay();
  const [initListing, setInitLisitng] = useState([
    "Stay for 7 nights, get one night free",
    "Complimentary breakfast for two",
    ...stay.specialOffers,
  ]);
  const [selectedSpecial, setSelectedSpecial] = useState<string[]>(
    stay.specialOffers
  );
  const [specialInput, setSpecialInput] = useState("");
  const [showOther, setShowOther] = useState(false);

  const handleSpecialCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (e.target.checked) {
      if (!selectedSpecial.includes(val)) {
        setSelectedSpecial([...selectedSpecial, val]);
      }
    } else {
      if (selectedSpecial.includes(val)) {
        const filtered = selectedSpecial.filter((where) => where !== val);
        setSelectedSpecial(filtered);
      }
    }
  };

  const handleSpecialInput = () => {
    if (!specialInput.length) return;
    if (!selectedSpecial.includes(specialInput)) {
      setInitLisitng([...initListing, specialInput]);
      setSelectedSpecial([...selectedSpecial, specialInput]);
      setSpecialInput("");
    }
  };

  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      percentageOff: stay.percentageOff || null,
    },
  });

  const handleNext = () => {
    if (!isValid) return;
    const payload = {
      ...stay,
      specialOffers: selectedSpecial,
      percentageOff: Number(watch("percentageOff")),
    };
    saveStay(payload);
    next();
  };

  return (
    <div>
      <p className="text-xl lg:text-4xl fw-500">Special Offers</p>
      <div className="mt-6">
        <p className="fs-400 lg:fs-600">
          Hosts can add special offers to attract more guests.
        </p>
      </div>
      <div className="mt-8">
        <p className="mb-7 fw-500">Deals</p>
        <div className="lg:w-6/12 grid gap-5">
          {removeDulicates(initListing).map((item, i) => (
            <div className="flex items-center gap-x-3" key={i}>
              <input
                type="checkbox"
                value={item}
                checked={selectedSpecial.includes(item)}
                onChange={handleSpecialCheck}
                className="w-4 h-4"
              />
              <p>{item}</p>
            </div>
          ))}
          <div className="lg:mt-5 flex gap-x-3 items-center">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                checked={showOther}
                name="other"
                className="w-4 h-4"
                onChange={() => setShowOther(!showOther)}
              />
              <p>Others</p>
            </div>
            {showOther && (
              <div className="lg:w-10/12 flex justify-between items-center pr-3 border rounded border-[#D2D2D2]">
                <input
                  type="text"
                  className=" p-2 w-full outline-none"
                  value={specialInput}
                  onChange={(e) => setSpecialInput(e.target.value)}
                />
                <IoSend
                  className="text-lg text-gray-700"
                  onClick={handleSpecialInput}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-7 lg:mt-12 lg:w-7/12">
        <Controller
          name="percentageOff"
          control={control}
          rules={{
            min: {
              value: 0,
              message: "Percentage Off number should be greater than 1",
            },
            max: {
              value: 99,
              message: "Percentage Off number should not be greater than 99",
            },
            pattern: {
              value: /^[0-9]+$/,
              message: "Please enter a number",
            },
          }}
          render={({ field }) => (
            <TextInput
              type={InputType.text}
              placeholder="e.g., 10% off for game weekends'"
              label="Percentage Off"
              labelClassName="text-black fw-600 lg:text-lg block mb-3"
              borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
              altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
              error={errors.percentageOff?.message}
              {...field}
              ref={null}
            />
          )}
        />
      </div>
      <div className="mt-8 lg:mt-16 flex justify-between items-center">
        <div
          className="btn-primary cursor-pointer px-6 py-2 lg:py-3"
          onClick={prev}
        >
          <BtnContent name="Prev" reverse />
        </div>
        <div
          className="btn-primary cursor-pointer px-6 py-2 lg:py-3"
          onClick={handleNext}
        >
          <BtnContent name="Preview Listing" />
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
