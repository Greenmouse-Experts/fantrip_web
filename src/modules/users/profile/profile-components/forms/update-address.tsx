import Button from "@/components/Button"
import TextInput, { InputType } from "@/components/TextInput"
import useAuth from "@/hooks/authUser"
import { updateProfile } from "@/services/api/authApi"
import { useToast } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { BeatLoader } from "react-spinners"

const UpdateAddressForm = () => {
    const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const { user, saveUser } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      country:  "",
      state:  "",
      city: "",
    },
  });
  const mutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["profileUpdate"],
  });
  const onSubmit = async (datas: any) => {
    setIsBusy(true);
    mutation.mutate(datas, {
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
          ...datas,
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
              <TextInput
                label="Country"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.country?.message}
                type={InputType.text}
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
                message: "Value is required",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="State"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.state?.message}
                type={InputType.text}
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
                message: "Value is required",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="City"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.city?.message}
                type={InputType.text}
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
  )
}

export default UpdateAddressForm