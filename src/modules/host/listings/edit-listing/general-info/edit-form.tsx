import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { useRoutine } from "@/hooks/useRoutine";
import { AmenityItem } from "@/lib/contracts/routine";
import { StayItem, StayItemUpdate } from "@/lib/contracts/stay";
import {
  getCountryFromGoogle,
  getStateFromGoogle,
} from "@/lib/utils/helper-function";
import { updateStay } from "@/services/api/stay-api";
import { GOOGLE_MAP_KEY } from "@/services/constant";
import { AfricanCountries } from "@/services/hard-data";
import { useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { Controller, useForm } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import { BeatLoader } from "react-spinners";

interface Props {
  data: StayItem;
  close: () => void;
  refetch: () => void;
}
const EditGeneralForm: FC<Props> = ({ data, close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const { properties } = useRoutine();
  const [locationError, setLocationError] = useState(false);
  const toast = useToast();

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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: data.name || "",
      description: data.description || "",
      property: data.property.id || "",
      address: data.address || "",
      state: data.state || "",
      price: data.price || 0,
      percentageOff: data.percentageOff || 0,
      highlightFeature: data.highlightFeature || "",
      maxNights: data.maxNights || 0,
      maxGuests: data.maxGuests || 0,
    },
  });

  const onSubmit = async (datas: StayItemUpdate) => {
    setIsBusy(true);
    const payload = {
      name: datas.name || "",
      description: datas.description || "",
      highlightFeature: datas.highlightFeature,
      price: Number(datas.price),
      maxNights: Number(datas.maxNights),
      maxGuests: Number(datas.maxGuests),
      percentageOff: Number(datas.percentageOff),
      state: datas.state,
    };
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
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid items-center lg:grid-cols-2 gap-4"
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your email",
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Stay Name"
              type={InputType.text}
              labelClassName="text-black fw-600 lg:text-lg block mb-3"
              borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] mt-0 outline-none"
              altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full mt-0"
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
            disabled
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
              label="Stay Price / Night"
              labelClassName="text-black fw-600 lg:text-lg block mb-3"
              borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
              altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
              error={errors.price?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="percentageOff"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your stay percentage off",
            },
          }}
          render={({ field }) => (
            <TextInput
              type={InputType.number}
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
        <Controller
          name="highlightFeature"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your stay highlight feature",
            },
          }}
          render={({ field }) => (
            <TextInput
              type={InputType.text}
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
        <Controller
          name="maxNights"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter max nights available to guests",
            },
          }}
          render={({ field }) => (
            <TextInput
              type={InputType.number}
              label="Maximum Nights"
              labelClassName="text-black fw-600 lg:text-lg block mb-3"
              borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
              altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
              error={errors.maxNights?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="maxGuests"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter max guests",
            },
          }}
          render={({ field }) => (
            <TextInput
              type={InputType.number}
              label="Maximum Guests"
              labelClassName="text-black fw-600 lg:text-lg block mb-3"
              borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
              altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
              error={errors.maxGuests?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <div className="lg:col-span-2 flex justify-end">
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
              disabled={!isValid || isBusy}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditGeneralForm;
