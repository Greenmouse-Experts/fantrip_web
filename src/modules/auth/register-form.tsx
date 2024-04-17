import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { registerUser } from "@/services/api/authApi";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import useDialog from "@/hooks/useDialog";
import RegisterSuccess from "./modals/register-success";
import BeatLoader from "react-spinners/BeatLoader";
import { AuthInputTyping } from "@/lib/contracts/auth";

const RegisterForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const { Dialog, setShowModal } = useDialog();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthInputTyping>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: registerUser,
  });
  const onSubmit = (data:AuthInputTyping) => {
    setIsBusy(true);
    mutation.mutate(data, {
      onSuccess: () => {
        setIsBusy(false);
        setShowModal(true);
      },
      onError: (error: any) => {
        toast({
          title: error.response.data.message,
          isClosable: true,
          status: "error",
          position: "top",
        });
        setIsBusy(false);
      },
    });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-2 gap-4"
      >
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your first name",
            },
          }}
          render={({ field }) => (
            <TextInput
              label="First Name"
              placeholder="Your First Name"
              type={InputType.text}
              error={errors.firstName?.message}
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
              message: "Please enter your last name",
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Last Name"
              placeholder="Your Last Name"
              type={InputType.text}
              error={errors.lastName?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your email",
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Email address"
              placeholder="email@domain.com"
              type={InputType.email}
              error={errors.email?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your password",
            },
            minLength: {
              value: 6,
              message: "Password is too short",
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Password"
              placeholder="Password"
              type={InputType.password}
              error={errors.password?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <div className="mt-9 lg:col-span-2">
          <Button
            title={isBusy ? <BeatLoader size={12} color="white"/> : "Register"}
            type="int"
            disabled={!isValid}
          />
        </div>
      </form>
      <Dialog title="" size="xl">
        <RegisterSuccess />
      </Dialog>
    </div>
  );
};

export default RegisterForm;
