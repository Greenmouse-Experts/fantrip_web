import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { ForgetInputTyping } from "@/lib/contracts/auth";
import { forgetPassword } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";

const ForgetForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgetInputTyping>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const mutation = useMutation({
    mutationFn: forgetPassword,
  });
  const onSubmit = (data: ForgetInputTyping) => {
    setIsBusy(true);
    mutation.mutate(data, {
      onSuccess: (data) => {
        setIsBusy(false);
        toast({
          render: () => (
            <div className="text-white fw-600 syne bg-gradient rounded p-3">
              {data.message}
            </div>
          ),
          position: "top",
          isClosable: true,
        });
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
        <div className="mt-9">
          <Button
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Continue"}
            type="int"
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default ForgetForm;
