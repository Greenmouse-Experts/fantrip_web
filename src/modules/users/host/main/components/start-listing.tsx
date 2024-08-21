import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import { useRoutine } from "@/hooks/useRoutine";
import useStay from "@/hooks/useStay";
import { AmenityItem } from "@/lib/contracts/routine";
import {
  getCityFromGoogle,
  getCountryFromGoogle,
  getStateFromGoogle,
} from "@/lib/utils/helper-function";
import { GOOGLE_MAP_KEY } from "@/services/constant";
import { AfricanCountries } from "@/services/hard-data";
import { Tooltip, useToast } from "@chakra-ui/react";
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
  const [addressType, setAddressType] = useState("manual");
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
      city: stay.city || "",
      highlightFeature: stay.highlightFeature || "",
      street: stay.street || "",
      country: stay.country || "",
      postal: stay.postal || "",
      suite: stay.suite || "",
    },
  });

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
  const handleNext = (data: any) => {
    if (data.state === "" || data.city === "") {
      toast({
        title: "Plase select a Stay location",
        isClosable: true,
        position: "top",
        status: "error",
      });
      return;
    }
    if (!isValid) return;

    const address = `${data.suite && `${data.suite},`} ${
      data.street && `${data.street},`
    } ${data.city}, ${data.state}, ${data.postal}, ${data.country}`;

    const payload = {
      name: data.name,
      property: data.property,
      address: address,
      description: data.description,
      state: data.state,
      city: data.city,
      highlightFeature: data.highlightFeature,
      country: data.country,
      street: data.street,
      postal: data.postal,
      suite: data.suite,
    };
    saveStay({
      ...stay,
      ...payload,
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
                <div className="border border-[#D2D2D2] bg-[#F9FAFC] dark:bg-darkColorLight rounded-[10px] outline-none">
                  <select
                    {...field}
                    ref={null}
                    className="w-[95%] p-3 bg-[#F9FAFC] lg:p-[15px] outline-none rounded-[10px] dark:bg-darkColorLight dark:text-white "
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
            <div className="text-black dark:text-white flex items-center gap-x-2 fw-600 lg:text-lg mb-1">
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
                <input
                  type="radio"
                  name="addresstype"
                  checked={addressType === "autocomplete"}
                  onChange={() => setAddressType("autocomplete")}
                  className="w-4 h-4"
                />
                <label className="fw-500">Autocomplete</label>
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
                          message: "Please enter your stay price",
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
                          message: "Please enter your stay price",
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
                          message: "Please enter your stay price",
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
                          message: "Please enter your stay price",
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
                          message: "Please enter your stay price",
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
                error={errors.description?.message}
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
                error={errors.highlightFeature?.message}
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
