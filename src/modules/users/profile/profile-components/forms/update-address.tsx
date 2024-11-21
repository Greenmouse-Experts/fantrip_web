import Button from "@/components/Button";
import useAuth from "@/hooks/authUser";
import { updateProfile } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { usePlacesWidget } from "react-google-autocomplete";
import { GOOGLE_MAP_KEY } from "@/services/constant";
import {
  getCityFromGoogle,
  getCountryFromGoogle,
  getPostalFromGoogle,
  getStateFromGoogle,
  getStreetFromGoogle,
} from "@/lib/utils/helper-function";
import TextInput, { InputType } from "@/components/TextInput";
import { Country } from "country-state-city";

interface Props {
  close: () => void;
}
const UpdateAddressForm: FC<Props> = ({ close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const { user, saveUser } = useAuth();
  const {} = usePlacesWidget({
    apiKey: GOOGLE_MAP_KEY,
    options: {
      types: ["address"],
    },
    onPlaceSelected: (place) => {
      const state = getStateFromGoogle(place.address_components);
      const country = getCountryFromGoogle(place.address_components);
      const postal = getPostalFromGoogle(place.address_components);
      const city = getCityFromGoogle(place.address_components);
      const street = getStreetFromGoogle(place.address_components);

      setValue("state", state);
      setValue("country", country);
      setValue("state", state);
      setValue("address", place?.formatted_address);
      setValue("postal", postal);
      setValue("city", city);
      setValue("street", street);
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      address: user.address || "",
      street: user.street || "",
      country: user.country || "",
      postal: user.postalCode || "",
      state: user.state || "",
      city: user.city || "",
      suite: user.aptSuitUnit || "",
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["profileUpdate"],
  });

  const onSubmit = async (datas: any) => {
    setIsBusy(true);
    const payload = {
      country: datas.country,
      state: datas.state,
      city: datas.city,
      postalCode: datas.postal,
      street: datas.street,
      aptSuitUnit: datas.suite,
    };
    mutation.mutate(payload, {
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
        saveUser({
          ...user,
          ...payload,
        });
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
    <div className="lg:px-2">
      {/* <div>
        <p className="text-[#000000B2] fw-500">
          Please enter your address (Google Autocomplete)
        </p>
        <input
          ref={autoRef as any}
          type="text"
          className="mt-1 p-3 relative z-[4000] lg:p-4 w-full border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
        />
      </div> */}
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
                <p className="text-black fw-600 lg:text-lg block mb-3">
                  Country
                </p>
                <div className="border border-[#D2D2D2] bg-[#F9FAFC] dark:bg-darkColorLight rounded-[10px] outline-none">
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
                message: "Please enter your stay state",
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
                message: "Please enter your stay postal",
              },
            }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="Postal Code"
                labelClassName="text-black fw-600 lg:text-lg block mb-3"
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
        <div className="mt-7">
          <Button
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Update"}
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateAddressForm;
