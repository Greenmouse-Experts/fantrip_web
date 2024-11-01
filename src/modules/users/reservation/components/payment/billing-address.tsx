import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { Country } from "country-state-city";

interface Props {
  next: () => void;
}
const BillingAddress: FC<Props> = ({ next }) => {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  // const mutation = useMutation({
  //     mutationFn: () => void,
  //     mutationKey: ["create-billing"],
  //   });

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      address: "",
      street: "",
      country: "",
      postal: "",
      state: "",
      city: "",
      suite: "",
    },
  });

  const onSubmit = async () => {
    setIsBusy(true);
    next();
    // const payload = {
    //   country: datas.country,
    //   state: datas.state,
    //   city: datas.city,
    //   postalCode: datas.postal,
    //   street: datas.street,
    //   aptSuitUnit: datas.suite,
    // };
    // mutation.mutate(payload, {
    //   onSuccess: (data) => {
    //     setIsBusy(false);
    //     next();
    //   },
    //   onError: (error: any) => {
    //     console.log(error);
    //     setIsBusy(false);
    //   },
    // });
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
                error={errors.state?.message}
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
            name="state"
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
                error={errors.state?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="postal"
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
                error={errors.postal?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="suite"
            control={control}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="Apartment/Suite number, PO Box (optional)"
                labelClassName="text-black block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.suite?.message}
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
            altClassName={`${!isValid? "btn-disabled px-6 py-3 cursor-disabled" : "btn-int px-6 py-3"}`}
          />
        </div>
      </form>
    </div>
  );
};

export default BillingAddress;
