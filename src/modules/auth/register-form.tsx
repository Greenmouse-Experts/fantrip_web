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
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_KEY } from "@/services/constant";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { useSearchParams } from "react-router-dom";

const RegisterForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const { Dialog, setShowModal } = useDialog();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("referralCode");
  const toast = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<AuthInputTyping>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      confirm_password: "",
      captchaKey: "",
      platform: "web",
    },
  });

  const handleRecaptcha = (value: string | null) => {
    if (value) setValue("captchaKey", value);
  };

  const mutation = useMutation({
    mutationFn: registerUser,
  });

  const onSubmit = (data: AuthInputTyping) => {
    setIsBusy(true);
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      platform: data.platform,
      captchaKey: data.captchaKey,
    };
    mutation.mutate(
      { payload: payload, code: code },
      {
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
      }
    );
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-2 gap-4 items-center"
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
        <div className="mt-[1px]">
          <label className="mb-1 block fw-500 text-[#000000B2]">
            Phone Number
          </label>
          <PhoneInputWithCountry
            international
            name="phone"
            control={control}
            rules={{
              required: true,
              validate: isPossiblePhoneNumber,
              pattern: {
                value:
                  /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
                message: "Please Enter A Valid Number",
              },
            }}
            className="border p-[11px] border-gray-400 rounded outline-none"
          />
          {errors.phone && (
            <p className="error text-red-400 text-sm">Invalid Phone Number</p>
          )}
        </div>

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

        <Controller
          name="confirm_password"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your password",
            },
            validate: (val) => {
              if (watch("password") != val) {
                return "Your passwords do no match";
              }
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Confirm New Password"
              type={InputType.password}
              error={errors.confirm_password?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <div className="lg:mt-2">
          <ReCAPTCHA sitekey={`${RECAPTCHA_KEY}`} onChange={handleRecaptcha} />
        </div>
        <div className="mt-8 lg:col-span-2">
          <Button
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Register"}
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
