import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { addAccount, getDeviceIp, uploadIds } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import RadioButtonGroup from "@/components/radio-group-input";
import { Country } from "country-state-city";
import SingleImageInput from "@/components/single-image-input";

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
  {
    label: "CAD",
    value: "CAD",
    name: "currencyType",
  },
  {
    label: "GBP",
    value: "GBP",
    name: "currencyType",
  },
];
export interface KycInputForm {
  identityFront: {
    id: string;
    link: string;
  };
  identityBack: {
    id: string;
    link: string;
  };
  idNumber: string;
  deviceIp: string;
  bankAccount: {
    accountNumber: string;
    accountName: string;
    country: string;
    currency: string;
    accountHolderType: "individual" | "company"; //individual, company
    bankName: string;
    routingNumber: string; // optional
  };
}
interface Props {
  close: () => void;
}
const AddHostAccount: FC<Props> = ({ close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const [frontImg, setFrontImg] = useState<File[] | undefined>();
  const [backImg, setBackImg] = useState<File[] | undefined>();
  const [addressFrontImg, setAddressFrontImg] = useState<File[] | undefined>();
  const [addressBackImg, setAddressBackImg] = useState<File[] | undefined>();
  const [deviceIp, setDeviceIp] = useState("");

  useEffect(() => {
    const fetchDeviceIp = async () => {
      try {
        const ip = await getDeviceIp();
        setDeviceIp(ip.ip);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchDeviceIp();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      accountNumber: "",
      accountName: "",
      idNumber: "",
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
  const mutation = useMutation({
    mutationFn: uploadIds,
  });

  const handleCreateKyc = (data: any) => {
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
  const onSubmit = (data: any) => {
    setIsBusy(true);
    let payload = {
      identityFront: {
        id: "",
        link: "",
      },
      identityBack: {
        id: "",
        link: "",
      },
      idNumber: data?.idNumber || "",
      deviceIp: deviceIp,
      bankAccount: {
        accountNumber: data.accountNumber,
        accountName: data.accountName,
        country: data.country,
        currency: data.currency,
        accountHolderType: data.accountHolderType,
        bankName: data.bankName,
        routingNumber: data.routingNumber,
      },
    };
    if (
      frontImg?.length &&
      backImg?.length &&
      addressFrontImg?.length &&
      addressBackImg?.length
    ) {
      const fd = new FormData();
      fd.append("idDoc", frontImg[0]);
      fd.append("idDoc", backImg[0]);
      fd.append("idDoc", addressFrontImg[0]);
      fd.append("idDoc", addressBackImg[0]);
      // fd.append("purpose", "identity_document");

      console.log(payload);

      mutation.mutate(fd, {
        onSuccess: (data) => {
          const newData = {
            ...payload,
            identityFront: {
              id: data[0]?.id,
              link: data[0]?.link,
            },
            identityBack: {
              id: data[1]?.id,
              link: data[1]?.link,
            },
            addressDocFront: {
              id: data[2]?.id,
              link: data[2]?.link,
            },
            addressDocBack: {
              id: data[3]?.id,
              link: data[3]?.link,
            },
          };
          handleCreateKyc(newData);
        },
        onError: (err: any) => {
          setIsBusy(false);
          toast({
            title: err.response.data.message,
            isClosable: true,
            position: "top",
            status: "error",
          });
        },
      });
    } else {
      toast({
        title: "Form submission incomplete",
        isClosable: true,
        position: "top",
        status: "error",
      });
      setIsBusy(false);
    }
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
                  type={InputType.text}
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
              name="idNumber"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter the correct digit",
                },
                minLength: {
                  value: 9,
                  message: "Mininimum length of 9",
                },
                maxLength: {
                  value: 9,
                  message: "Maximum length of 9",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a number",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="ID Number"
                  labelClassName="text-[#767676] fw-500 "
                  type={InputType.tel}
                  error={errors.idNumber?.message}
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
                      <option value="company">Company Account</option>
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
                  value: false,
                  message: "Please enter routing number",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Routing Number (optional)"
                  labelClassName="text-[#767676] fw-500 "
                  type={InputType.tel}
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
                        {JSON.stringify(item)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
            <SingleImageInput label="ID Card (front)" setImage={setFrontImg} />
            <SingleImageInput label="ID Card (back)" setImage={setBackImg} />
            <SingleImageInput
              label="Address Document (front)"
              setImage={setAddressFrontImg}
            />
            <SingleImageInput
              label="Address Document (back)"
              setImage={setAddressBackImg}
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
