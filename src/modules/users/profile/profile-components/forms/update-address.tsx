import Button from "@/components/Button";
import useAuth from "@/hooks/authUser";
import { updateProfile } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { Country, State, City } from "country-state-city";

interface Props{
  close: () => void
}
const UpdateAddressForm:FC<Props> = ({close}) => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const { user, saveUser } = useAuth();
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      country: user.country || "",
      state: "",
      city: "",
    },
  });
  const mutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["profileUpdate"],
  });
  const onSubmit = async (datas: any) => {
    setIsBusy(true);
    const payload = {
      country: Country.getCountryByCode(datas.country)
      ?.name || '',
      state: State.getStateByCodeAndCountry(
        datas.state,
        datas.country
      )?.name || '',
      city: datas.city
    }
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
    <div className="lg:px-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
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
                  className="p-2 w-full border-2 border-gray-500 rounded-lg outline-none"
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
          <Controller
            name="state"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Value is required",
              },
            }}
            render={({ field }) => (
              <div>
                <p className="text-[#000000B2] fw-500 mb-1">State</p>
                <select
                  {...field}
                  className="p-2 w-full border-2 border-gray-500 rounded-lg outline-none"
                >
                  {watch("country") &&
                    State.getStatesOfCountry(watch("country")).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          />
          <Controller
            name="city"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Value is required",
              },
            }}
            render={({ field }) => (
              <div>
                <p className="text-[#000000B2] fw-500 mb-1">City</p>
                <select
                  {...field}
                  className="p-2 w-full border-2 border-gray-500 rounded-lg outline-none"
                >
                  {watch("country") &&
                    watch("state") &&
                    City.getCitiesOfState(
                      watch("country"),
                      watch("state")
                    ).map((item) => (
                      <option value={item.name} key={item.name}>
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
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Update"}
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateAddressForm;
