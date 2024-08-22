import { FC, useState } from "react";
import { StayItem } from "@/lib/contracts/stay";
import { Tooltip, useToast } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import { PiCaretDownThin } from "react-icons/pi";
import TextInput, { InputType } from "@/components/TextInput";
import {
  getCityFromGoogle,
  getCountryFromGoogle,
  getStateFromGoogle,
} from "@/lib/utils/helper-function";
import { AfricanCountries } from "@/services/hard-data";
import { GOOGLE_MAP_KEY } from "@/services/constant";
import { usePlacesWidget } from "react-google-autocomplete";
import { updateStay } from "@/services/api/stay-api";
import Button from "@/components/Button";
import { BeatLoader } from "react-spinners";

interface Props {
  data: StayItem;
  close: () => void;
  refetch: () => void;
}
const EditAddressModal: FC<Props> = ({ data, refetch, close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [addressType, setAddressType] = useState("manual");
  const toast = useToast();

  const { ref: autoRef } = usePlacesWidget({
    apiKey: GOOGLE_MAP_KEY,
    options: {
      types: ["address"],
    },
    onPlaceSelected: (place) => {
      const city = getCityFromGoogle(place.address_components);
      const state = getStateFromGoogle(place.address_components);
      const country = getCountryFromGoogle(place.address_components);
      if (AfricanCountries.includes(country)) {
        setLocationError(true);
        return;
      }
      setLocationError(false);
      setValue("state", state);
      setValue("city", city);
      setValue("address", place?.formatted_address);
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      address: data.address || "",
      state: data.state || "",
      city: data.city || "",
      street: data.street || "",
      country: data.country || "",
      postal: data.postal || "",
      suite: data.suite || "",
    },
  });

  const handleUpdate = async (field: any) => {
    const address = `${field.suite && `${field.suite},`} ${
      field.street && `${field.street},`
    } ${field.city}, ${field.state}, ${field.postal}, ${field.country}`;
    const payload = {
      address: address,
      state: field.state,
      city: field.city,
      country: field.country,
      street: field.street,
      postal: field.postal,
      suite: field.suite,
    };
    setIsBusy(true)
    await updateStay(data.id, payload)
      .then((res) => {
        setIsBusy(false);
        toast({
          render: () => (
            <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
              {res.message}
            </div>
          ),
          position: "top",
        });
        refetch();
        close();
      })
      .catch((err) => {
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      });
  };

  return (
    <div className="p-4">
      <div>
        <div className="text-black flex items-center gap-x-2 fw-600 lg:text-lg mb-1">
          Address{" "}
          <Tooltip
            shouldWrapChildren
            textColor={"black"}
            bg="gray.50"
            fontWeight={300}
            fontSize={13}
            padding={4}
            label="Begin typing your address to see autocomplete suggestions. Select the correct option from the list to ensure accurate details."
            aria-label="A tooltip"
          >
            <BsInfoCircle className="text-[#FC819F] cursor-pointer" />
          </Tooltip>
        </div>
        <div className="mt-2 mb-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <input
              type="radio"
              name="addresstype"
              checked={addressType === "manual"}
              onChange={() => setAddressType("manual")}
              className="w-4 h-4"
            />
            <label className="fw-500">Manual Input</label>
          </div>
          <div className="flex items-center gap-x-2">
            {/* <input
              type="radio"
              name="addresstype"
              disabled
              checked={addressType === "autocomplete"}
              onChange={() => setAddressType("autocomplete")}
              className="w-4 h-4"
            />
            <label className="fw-500">Autocomplete</label> */}
          </div>
        </div>
        <div>
          {addressType === "autocomplete" && (
            <div>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your stay address",
                  },
                }}
                render={({ field }) => (
                  <div className="relative">
                    <input
                      {...field}
                      ref={autoRef as any}
                      type="text"
                      placeholder="Input and Select your Stay Location"
                      className=" p-3 lg:p-4 w-full border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                    />
                    <PiCaretDownThin className="absolute right-7 top-5" />
                  </div>
                )}
              />
            </div>
          )}
          {addressType === "manual" && (
            <div>
              <div className="grid gap-4 grid-cols-2 mt-3">
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
                    <TextInput
                      type={InputType.text}
                      label="Country"
                      labelClassName="text-black fw-600 lg:text-lg block mb-3"
                      borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                      altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                      error={errors.country?.message}
                      {...field}
                      ref={null}
                    />
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
                      labelClassName="text-black fw-600 lg:text-lg block mb-3"
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
                      labelClassName="text-black fw-600 lg:text-lg block mb-3"
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
                      message: "Please enter your stay region",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      type={InputType.text}
                      label="Region"
                      labelClassName="text-black fw-600 lg:text-lg block mb-3"
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
                      message: "Please enter your stay postal code",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      type={InputType.text}
                      label="Postal Code"
                      labelClassName="text-black fw-600 lg:text-lg block lg:mt-[26px] mb-3"
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
                      labelClassName="text-black fw-600 lg:text-lg block mb-3"
                      borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                      altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                      error={errors.suite?.message}
                      {...field}
                      ref={null}
                    />
                  )}
                />
              </div>
            </div>
          )}
        </div>
        {locationError && (
          <div className="flex gap-x-2 items-center">
            <BsInfoCircle className="text-orange-500" />
            <p className="fs-500 text-orange-600">
              We currently do not offer stay services in your choiced location.
            </p>
          </div>
        )}
      </div>
      <div className="lg:col-span-2 flex justify-end mt-8">
          <div className="lg:w-6/12">
            <Button
              title={
                isBusy ? (
                  <BeatLoader size={12} color="white" />
                ) : (
                  "Update Stay Info"
                )
              }
              type="int"
              onClick={handleSubmit(handleUpdate)}
              disabled={!isValid || isBusy}
            />
          </div>
        </div>
    </div>
  );
};

export default EditAddressModal;
