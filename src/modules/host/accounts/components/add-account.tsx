import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { BankAccountItem } from "@/lib/contracts/routine";
import { addAccount } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import RadioButtonGroup from "@/components/radio-group-input";
import { Country } from "country-state-city";
import useAuth from "@/hooks/authUser";

const currencyOptions = [
  {
    label: "USD",
    value: "USD",
    name: "currencyType",
  },
  {
    label: "EURO",
    value: "EUR",
    name: "currencyType",
  },
];
interface Props {
  close: () => void;
}
const AddHostAccount: FC<Props> = ({close}) => {
  const [isBusy, setIsBusy] = useState(false);
  const {account, saveAccount} = useAuth()
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BankAccountItem>({
    mode: "onChange",
    defaultValues: {
      accountNumber: "",
      accountName: "",
      currency: "",
      accountHolderType: "individual",
      bankName: "",
      routingNumber: "",
      country: "",
    },
  });
  const addAction = useMutation({
    mutationFn: addAccount,
    mutationKey: ["add-host-account"],
  });
  const onSubmit = (data: BankAccountItem) => {
    setIsBusy(true);
    addAction.mutate(data, {
      onSuccess: (data) => {
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              {data.message}
            </div>
          ),
          position: "top",
        });
        setIsBusy(false);
        saveAccount([...account, data.data])
        close();
      },
      onError: (error: any) => {
        toast({
          title: error.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      },
    });
  };
  return (
    <div>
      <div className="mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 max-h-[360px] overflow-y-auto">
            <Controller
              name="accountNumber"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter account number",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Account Number"
                  labelClassName="text-[#767676] fw-500 "
                  type={InputType.number}
                  error={errors.accountNumber?.message}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="accountName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter account name",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Account Name"
                  labelClassName="text-[#767676] fw-500 "
                  type={InputType.text}
                  error={errors.accountName?.message}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <RadioButtonGroup
                  options={currencyOptions}
                  label="Select Account Currency"
                  mainLabelClassName="text-[#828282] block mt-[3px]"
                  altClass="grid grid-cols-2"
                  selected={field.value}
                  error={errors.currency?.message}
                  {...field}
                  ref={null}
                />
              )}
            />
            <div>
              <p className=" fw-600 lg:text-lg block mb-3">
                Account Holder Type
              </p>
              <Controller
                name="accountHolderType"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please select account holder type",
                  },
                }}
                render={({ field }) => (
                  <div className="border border-[#D2D2D2] dark:bg-darkColorLight dark:text-white rounded-[10px] outline-none">
                    <select
                      {...field}
                      ref={null}
                      className="w-[95%] p-3 dark:bg-darkColorLight dark:text-white lg:p-[15px] outline-none rounded-[10px]"
                    >
                      <option value="" disabled>
                        Select account holder type
                      </option>
                      <option value="individual">Individual Account</option>
                      <option value="company">Company Accoun</option>
                    </select>
                    <p>{errors && errors.accountHolderType?.message}</p>
                  </div>
                )}
              />
            </div>
            <Controller
              name="bankName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter bank name",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Bank Name"
                  labelClassName="text-[#767676] fw-500 "
                  type={InputType.text}
                  error={errors.bankName?.message}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="routingNumber"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter routing number",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Routing Number"
                  labelClassName="text-[#767676] fw-500 "
                  type={InputType.number}
                  error={errors.routingNumber?.message}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Value is required",
                },
              }}
              render={({ field }) => (
                <div>
                  <p className="text-[#000000B2] fw-500 mb-1">Country</p>
                  <select
                    {...field}
                    className="p-3 w-full border border-gray-400 rounded-lg outline-none dark:bg-darkColorLight dark:text-white"
                  >
                    {Country.getAllCountries().map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>
          <div className="mt-7">
            <Button
              title={isBusy ? <BeatLoader size={12} color="white" /> : "Submit"}
              type="int"
              disabled={!isValid || isBusy}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHostAccount;
