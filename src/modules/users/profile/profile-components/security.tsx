import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { updatePassword } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

const UserSecurity = () => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      new_password: "",
      old_password: "",
      new_password_confirmation: "",
    },
  });
  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      toast({
        render: () => (
          <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
            {data.message}
          </div>
        ),
        position: "top",
      });
      reset()
      setIsBusy(false);
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
  const onSubmit = async (data: any) => {
    setIsBusy(true);
    const payload = {
      oldPassword: data.old_password,
      newPassword: data.new_password,
      newPasswordConfirmation: data.new_password_confirmation,
    };
    mutation.mutate(payload);
  };
  return (
    <div>
      <p className="hidden lg:block fw-600 lg:text-lg">Change Password</p>
      <div className="border border-[#E8EAED] rounded-[16px] mt-6 p-4">
       <form onSubmit={handleSubmit(onSubmit)}>
       <div className="grid gap-4 py-4">
          <div className="">
            <div>
              <Controller
                name="old_password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your old password",
                  },
                  minLength: {
                    value: 5,
                    message: "Password is too short",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="Old Password"
                    type={InputType.password}
                    error={errors.old_password?.message}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
          </div>
          <div className="">
            <div>
              <Controller
                name="new_password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                  minLength: {
                    value: 5,
                    message: "Password is too short",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="New Password"
                    type={InputType.password}
                    error={errors.new_password?.message}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
          </div>
          <div className="">
            <div>
              {" "}
              <Controller
                name="new_password_confirmation"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                  validate: (val) => {
                    if (watch("new_password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="Confirm New Password"
                    type={InputType.password}
                    error={errors.new_password_confirmation?.message}
                    {...field}
                    ref={null}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex mt-8 justify-end">
            <div className="lg:w-5/12 2xl:w-4/12">
              <Button
                title={
                  isBusy ? (
                    <BeatLoader size={12} color="white" />
                  ) : (
                    "Change Password"
                  )
                }
                type="int"
                disabled={!isValid}
              />
            </div>
          </div>
        </div>
       </form>
      </div>
    </div>
  );
};

export default UserSecurity;
