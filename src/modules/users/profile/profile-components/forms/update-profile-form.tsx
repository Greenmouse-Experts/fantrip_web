import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import useAuth from "@/hooks/authUser";
import { updateProfile } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

interface Props{
  close: () => void
}
const UpdateProfileForm:FC<Props> = ({close}) => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const { user, firstName, lastName, saveUser } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      bio: user.bio || "",
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
        <div className="grid lg:grid-cols-2 gap-4">
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Value is required",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="First Name"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.firstName?.message}
                type={InputType.text}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Value is required",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Last Name"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.lastName?.message}
                type={InputType.text}
                {...field}
                ref={null}
              />
            )}
          />
          <div className="lg:col-span-2">
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Profile Bio"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.bio?.message}
                  type={InputType.textarea}
                  {...field}
                  ref={null}
                />
              )}
            />
          </div>
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

export default UpdateProfileForm;
