import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import { FC, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import InfoText from "./pricing/info-text";
import useStay from "@/hooks/useStay";
import { Controller, useForm } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  next: () => void;
  prev: () => void;
}
const Pricing: FC<Props> = ({ next, prev }) => {
  const { stay, saveStay } = useStay();
  const [selectedCurr, setSelectedCurr] = useState(stay.currency || "€");
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      price: stay.price || "",
    },
  });
  const handleNext = (data: any) => {
    if (!isValid) return;
    saveStay({
      ...stay,
      price: Number(data.price),
      currency: selectedCurr,
    });
    next();
  };
  return (
    <div>
      {" "}
      <p className="text-xl lg:text-4xl fw-500">Pricing</p>
      <div className="mt-6 flex gap-x-1">
        <BsInfoCircle className="shrink-0 text-sm lg:text-[17px] relative top-[4px]" />
        <p className="fs-400 lg:fs-600">
          Note: Fantrip charges a 3% service fee.
        </p>
      </div>
      <div className="mt-12">
        <p className="fw-500 lg:text-lg">Standard Rate Per Night</p>
        <div className="lg:w-9/12 grid gap-5">
          <Controller
            name="price"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your stay price",
              },
            }}
            render={({ field }) => (
              <TextInput
                type={InputType.number}
                label=""
                labelClassName=""
                borderClass="flex items-center pl-3 border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full outline-none"
                icon={
                  <Menu>
                    <MenuButton>
                      <div className="flex gap-x-2 items-center">
                        <p className="fw-500 text-xl cviop_sdr text-gray-600">
                          {selectedCurr}
                        </p>
                        <ChevronDownIcon size={14} className="text-xs" />
                      </div>
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => setSelectedCurr("€")}>
                        <p className="dark:text-white">Euro (€)</p>
                      </MenuItem>
                      {/* <MenuItem onClick={() => setSelectedCurr("$")}>
                        Dollar ($)
                      </MenuItem> */}
                    </MenuList>
                  </Menu>
                }
                error={errors.price?.message}
                {...field}
                ref={null}
              />
            )}
          />
        </div>
        <div className="mt-7 lg:mt-12">
          <InfoText />
        </div>
      </div>
      <div className="mt-8 lg:mt-16 flex justify-between items-center">
        <div
          className="btn-primary cursor-pointer px-6 py-2 lg:py-3"
          onClick={prev}
        >
          <BtnContent name="Prev" reverse />
        </div>
        <div
          className={`${
            isValid
              ? "btn-primary"
              : "bg-gray-300 rounded-full cursor-not-allowed"
          } cursor-pointer px-6 py-2 lg:py-3`}
          onClick={handleSubmit(handleNext)}
        >
          <BtnContent name="Continue" />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
