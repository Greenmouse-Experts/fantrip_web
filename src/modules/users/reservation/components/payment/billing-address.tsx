import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { Country } from "country-state-city";
import { useMutation } from "@tanstack/react-query";
import { createBilling } from "@/services/api/booking-api";

interface Props {
  next: () => void;
}
const BillingAddress: FC<Props> = ({ next }) => {
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: createBilling,
    mutationKey: ["create-billing"],
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      country: "",
      street: "",
      city: "",
      postalCode: "",
      region: "",
      areaNumber: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsBusy(true);
    const payload = {
      country: data.country,
      street: data.street,
      city: data.city,
      postalCode: data.postalCode,
      region: data.region,
      areaNumber: data.areaNumber,
    };
    mutation.mutate(payload, {
      onSuccess: (data) => {
        setIsBusy(false);
        console.log(data);
        next();
      },
      onError: (error: any) => {
        console.log(error);
        setIsBusy(false);
      },
    });
  };

  return (
    <div>
      <div>
        <p className="fw-600 text-lg">Billing Address</p>
        {/* <div className="mt-2 flex space-x-3">
          <div className="border shadow-md rounded-lg p-1 w-[200px] cursor-pointer">
            <p className="fs-400">Gracee land, firmacity city</p>
            <p className="fs-400">County</p>
          </div>
        </div> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2 items-end mt-3">
          <Controller
            name="country"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your stay country",
              },
            }}
            render={({ field }) => (
              <div>
                <p className="text-black block mb-3">Country</p>
                <div className="border border-[#D2D2D2] bg-[#F9FAFC] dark:bg-darkColorLight rounded-[10px] outline-none h-[60px] grid">
                  <select
                    {...field}
                    ref={null}
                    className="w-[95%] p-3 bg-[#F9FAFC] lg:p-[15px] outline-none rounded-[10px] dark:bg-darkColorLight dark:text-white "
                  >
                    <option value="" disabled>
                      Select country
                    </option>
                    {Country.getAllCountries().map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <p>{errors && errors.country?.message}</p>
                </div>
              </div>
            )}
          />
          <Controller
            name="street"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your stay street",
              },
            }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="Street"
                labelClassName="text-black block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.street?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your stay city",
              },
            }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="City"
                labelClassName="text-black block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.city?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="region"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your stay state",
              },
            }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="Region"
                labelClassName="text-black block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.region?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="postalCode"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your stay postal",
              },
            }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="Postal Code"
                labelClassName="text-black block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.postalCode?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="areaNumber"
            control={control}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="Apartment/Suite number, PO Box (optional)"
                labelClassName="text-black block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.areaNumber?.message}
                {...field}
                ref={null}
              />
            )}
          />
        </div>
        <div className="mt-7 flex justify-end">
          <Button
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Continue"}
            disabled={!isValid}
            altClassName={`${
              !isValid
                ? "btn-disabled px-6 py-3 cursor-disabled"
                : "btn-int px-6 py-3"
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default BillingAddress;
