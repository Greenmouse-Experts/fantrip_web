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
import { Tooltip } from "@/components/tooltip";
import { FaCircleInfo } from "react-icons/fa6";

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
  editAccount: Boolean;
  bankDetails: any;
  kycDetails: any;
}
const AddHostAccount: FC<Props> = ({ close, editAccount, bankDetails, kycDetails }) => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const [frontImg, setFrontImg] = useState<File[] | undefined>(
    editAccount ?
      kycDetails?.identityFront ? JSON.parse(kycDetails?.identityFront).link : null
      :
      null
  );
  const [backImg, setBackImg] = useState<File[] | undefined>(
    editAccount ?
      kycDetails?.identityBack ? JSON.parse(kycDetails?.identityBack).link : null
      :
      null
  );
  const [addressFrontImg, setAddressFrontImg] = useState<File[] | undefined>(
    editAccount ?
      kycDetails?.addressDocFront ? JSON.parse(kycDetails?.addressDocFront).link : null
      :
      null
  );
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
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      accountNumber: editAccount ? bankDetails.accountNumber : "",
      accountName: editAccount ? bankDetails.accountName : "",
      idNumber: editAccount ? kycDetails.idNumber : "",
      currency: editAccount ? bankDetails.currency : "",
      accountHolderType: editAccount ? bankDetails.accountHolderType : "individual",
      bankName: editAccount ? bankDetails.bankName : "",
      routingNumber: editAccount ? bankDetails.routingNumber : "",
      country: editAccount ? bankDetails.country : "",
      itn: ""
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
        id: editAccount ?
          kycDetails?.identityFront ? JSON.parse(kycDetails?.identityFront).id : null : "",
        link: editAccount ?
          kycDetails?.identityFront ? JSON.parse(kycDetails?.identityFront).link : null : "",
      },
      identityBack: {
        id: editAccount ?
          kycDetails?.identityBack ? JSON.parse(kycDetails?.identityBack).id : null : "",
        link: editAccount ?
          kycDetails?.identityFront ? JSON.parse(kycDetails?.identityFront).link : null : "",
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
      addressFrontImg?.length 
    ) {
      const fd = new FormData();
      fd.append("idDoc", frontImg[0]);
      fd.append("idDoc", backImg[0]);
      fd.append("idDoc", addressFrontImg[0]);
      // fd.append("purpose", "identity_document");

      console.log(fd);

      mutation.mutate(fd, {
        onSuccess: (data) => {
          const newData = {
            ...payload,
            identityFront: {
              id: editAccount ?
                kycDetails?.identityFront ? JSON.parse(kycDetails?.identityFront).id : null : data[0]?.id,
              link: editAccount ?
                kycDetails?.identityFront ? JSON.parse(kycDetails?.identityFront).link : null : data[0]?.link,
            },
            identityBack: {
              id: editAccount ?
                kycDetails?.identityBack ? JSON.parse(kycDetails?.identityBack).id : null : data[1]?.id,
              link: editAccount ?
                kycDetails?.identityBack ? JSON.parse(kycDetails?.identityBack).link : null : data[1]?.link,
            },
            addressDocFront: {
              id: editAccount ?
                kycDetails?.addressDocFront ? JSON.parse(kycDetails?.addressDocFront).id : null
                : data[2]?.id,
              link: editAccount ?
                kycDetails?.addressDocFront ? JSON.parse(kycDetails?.addressDocFront).link : null
                : data[2]?.link,
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
                  label="Account Number/IBAN"
                  labelClassName="text-[#767676] fw-500 "
                  type={InputType.text}
                  error={errors.accountNumber?.message}
                  {...field}
                  ref={null}
                  required
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
                  required
                />
              )}
            />
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
                  required
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
                      required
                    >
                      <option value="" disabled>
                        Select account holder type
                      </option>
                      <option value="individual">Individual Account</option>
                      <option value="company">Company Account</option>
                    </select>
                    <p>{errors.accountHolderType?.message?.toString()}</p>
                  </div>
                )}
              />
            </div>
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
                  label="BIC/SWIFT"
                  labelClassName="text-[#767676] fw-500 "
                  type={InputType.tel}
                  error={errors.routingNumber?.message}
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
                    required
                  >
                    <option value="" disabled selected>
                      Select Country
                    </option>
                    {Country.getAllCountries().map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
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
              }}
              render={({ field }) => (
                <TextInput
                  label="SIN/SSN/ITIN"
                  subLabel='Required for verification - [Learn More]'
                  alert='For identity verification, Stripe requires a Social Security Number for US account (SSN), Social Insurance Number for Cabnada account (SIN), or Individual Taxpayer Identification Number (ITIN) for Europe accounts.'
                  labelClassName="text-[#767676] fw-500"
                  type={InputType.tel}
                  error={errors.idNumber?.message}
                  {...field}
                  ref={null}
                />
              )}
            />


            <Controller
              name="itn"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter the correct digit",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="National ID/Passport Number"
                  subLabel='National ID / Passport Number (For Non-U.S. Accounts)'
                  alert='For global accounts, Stripe requires a National ID or Passport Number for identity verification. You will also need to upload a copy of your ID document'
                  labelClassName="text-[#767676] fw-500 "
                  required
                  type={InputType.tel}
                  error={errors.itn?.message}
                  {...field}
                  ref={null}
                />
              )}
            />
            <p className="my-2 font-bold">Upload ID Document</p>
            <SingleImageInput label="Upload ID Document (front)" editState={editAccount} uploadedImg={frontImg} alert={'Upload a clear copy of the front of your ID document. Ensure the name matches the account holder information'} setImage={setFrontImg} />
            <SingleImageInput label="Upload ID Document (back)" editState={editAccount} uploadedImg={backImg} alert={'Upload a clear copy of the back of your ID document, if applicable'} setImage={setBackImg} />

            <div className="mt-4 mb-2 flex flex-col">
              <p className="font-bold">Address Verification Document</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-[#9847FE]">
                <span>Proof of address document required</span>
                <Tooltip text={"Stripe requires proof of address to ensure the information you provide is accurate. Acceptable documents include utility bills, bank statements, government-issued letters, driver's licenses, insurance documents, employment documents, student ID, or tax documents."} position="top">
                  <FaCircleInfo className="text-xl shrink-0 cursor-pointer text-[#fc819f]" />
                </Tooltip>
              </div>
            </div>
            <SingleImageInput
              label="Address Document"
              editState={editAccount} uploadedImg={addressFrontImg}
              setImage={setAddressFrontImg}
            />
          </div>
          <div className="mt-7">
            <Button
              title={isBusy ? <BeatLoader size={12} color="white" /> : "Submit"}
              type="int"
              disabled={isBusy}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHostAccount;
