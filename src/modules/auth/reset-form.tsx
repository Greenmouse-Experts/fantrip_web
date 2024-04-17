import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { ResetInputTyping } from "@/lib/contracts/auth";
import { BASE_URL } from "@/services/constant";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const ResetForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const token = new URLSearchParams(location.search).get("token");
  const navigate = useNavigate();
  const toast = useToast();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetInputTyping>({
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      newPasswordConfirmation: "",
    },
  });
  const onSubmit = async (data: ResetInputTyping) => {
    setIsBusy(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.statusCode === 200) {
        toast({
          render: () => (
            <div className="text-white fw-600 syne bg-gradient rounded p-3">
              Password updated successfully
            </div>
          ),
          position: "top",
        });
        setIsBusy(false);
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      }
    } catch (error: any) {
      setIsBusy(false);
      toast({
        title: error.response.data.message,
        isClosable: true,
        status: "error",
        position: "top",
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Controller
          name="newPassword"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 6,
              message: "Password is too short",
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Password"
              labelClassName="text-[#000000B2] fw-500"
              placeholder="*********"
              error={errors.newPassword?.message}
              type={InputType.password}
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="newPasswordConfirmation"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your password",
            },
            validate: (val) => {
              if (watch("newPassword") != val) {
                return "Your passwords do no match";
              }
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Confirm Password"
              labelClassName="text-[#000000B2] fw-500"
              placeholder="*********"
              error={errors.newPasswordConfirmation?.message}
              type={InputType.password}
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

export default ResetForm;
