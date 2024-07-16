import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import { useRoutine } from "@/hooks/useRoutine";
import useStay from "@/hooks/useStay";
import { AmenityItem } from "@/lib/contracts/routine";
import {
  getCountryFromGoogle,
  getStateFromGoogle,
} from "@/lib/utils/helper-function";
import { GOOGLE_MAP_KEY } from "@/services/constant";
import { AfricanCountries } from "@/services/hard-data";
import { useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { Controller, useForm } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import { PiCaretDownThin } from "react-icons/pi";

interface Props {
  next: () => void;
}
const StartListing: FC<Props> = ({ next }) => {
  const { stay, saveStay } = useStay();
  const { properties } = useRoutine();
  const [locationError, setLocationError] = useState(false);
  const toast = useToast();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: stay.name || "",
      property: stay.property || "",
      address: stay.address || "",
      description: stay.description || "",
      state: stay.state || "",
      highlightFeature: stay.highlightFeature || "",
    },
  });
  const { ref: autoRef } = usePlacesWidget({
    apiKey: GOOGLE_MAP_KEY,
    options: {
      types: ["address"],
    },
    onPlaceSelected: (place) => {
      const state = getStateFromGoogle(place.address_components);
      const country = getCountryFromGoogle(place.address_components);
      if (AfricanCountries.includes(country)) {
        setLocationError(true);
        return;
      }
      setLocationError(false);
      setValue("state", state);
      setValue("address", place?.formatted_address);
    },
  });
  const handleNext = (data: any) => {
    if (data.state === "") {
      toast({
        title: "Plase select a state",
        isClosable: true,
        position: "top",
        status: "error",
      });
      return;
    }
    if (!isValid) return;
    saveStay({
      ...stay,
      ...data,
      // state: stateVal || stay.state
    });
    next();
  };
  return (
    <div>
      <p className="text-xl lg:text-4xl">Start New Listing</p>
      <div className="mt-6">
        <div className="lg:w-9/12 mt-8 grid gap-5">
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your stay name",
              },
            }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                placeholder="e.g., 'Champion's Loft'"
                label="Enter a Sports-themed Accommodation Name"
                labelClassName="text-black fw-600 lg:text-lg block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.name?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <div>
            <p className="text-black fw-600 lg:text-lg block mb-3">
              Type of Property
            </p>
            <Controller
              name="property"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter your stay name",
                },
              }}
              render={({ field }) => (
                <div className="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none">
                  <select
                    {...field}
                    ref={null}
                    className="w-[95%] p-3 bg-[#F9FAFC] lg:p-[15px] outline-none rounded-[10px]"
                  >
                    <option value="" disabled>
                      Select type of property
                    </option>
                    {properties?.data?.length &&
                      properties?.data.map((item: AmenityItem) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  <p>{errors && errors.property?.message}</p>
                </div>
              )}
            />
          </div>
          <div>
            <p className="text-black fw-600 lg:text-lg block mb-3">
              Stay Location
            </p>
            <Controller
              name="address"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter your stay name",
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
                <PiCaretDownThin className="absolute right-7 top-5"/>
               </div>
              )}
            />
            {locationError && (
              <div className="flex gap-x-2 items-center">
                <BsInfoCircle className="text-orange-500" />
                <p className="fs-500 text-orange-600">
                  We currently do not offer stay services in your choiced
                  location.
                </p>
              </div>
            )}
          </div>
          <Controller
            name="description"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your stay address",
              },
            }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                placeholder="e.g., '1 Queen Bed'"
                label="Number and Type of Beds"
                labelClassName="text-black fw-600 lg:text-lg block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.address?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="highlightFeature"
            control={control}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                placeholder="e.g., 'Spectacular Stadium View'"
                label="Highlight Feature"
                labelClassName="text-black fw-600 lg:text-lg block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.address?.message}
                {...field}
                ref={null}
              />
            )}
          />
        </div>
      </div>
      <div className="mt-8 lg:mt-16 flex justify-end">
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

export default StartListing;
