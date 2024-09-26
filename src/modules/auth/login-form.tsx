// import Button from "@/components/Button";
import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import useAuth from "@/hooks/authUser";
import { AuthInputTyping } from "@/lib/contracts/auth";
import { loginUser } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const { saveUser, saveAccount } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthInputTyping>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: loginUser,
  });
  const onSubmit = (data: AuthInputTyping) => {
    setIsBusy(true);
    mutation.mutate(data, {
      onSuccess: (data) => {
        setIsBusy(false);
        toast({
          render: () => (
            <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
              Login successfully
            </div>
          ),
          position: "top",
        });
        sessionStorage.setItem("fantrip_token", data.accessToken);
        saveUser({
          name: `${data.data.firstName} ${data.data.lastName}`,
          email: data.data.email,
          token: data.accessToken,
          image: data.data.picture,
          address: data.data.address,
          phone: data.data.phone,
          id: data.data.id,
          account: data.data.role,
          joined: data.data.createdDate,
          bio: data.data.bio,
          city: data.data.city,
          state: data.data.state,
          country: data.data.country,
          nickname: data.data.nickname,
          isNickname: data.data.isNickname,
          dob: data.data.dob,
          isVerified: data.data.verifiedAsHost,
          favTeam: data.data.favTeam,
          roomPicture: data.data.roomPicture,
          street: data.data.street,
          postalCode: data.data.postalCode,
          aptSuitUnit: data.data.aptSuitUnit,
          loginTimes: data.data.loginTimes,
          points: data?.data?.reward?.point || 0,
        });
        saveAccount(data.data.bankAccounts);
        if (data.data.role === "host") {
          navigate("/host");
        }
        if (data.data.role === "guest") {
          navigate("/user/profile");
        }
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
        <div className="relative">
          <Controller
            name="password"
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
                label="Password"
                placeholder="Password"
                type={InputType.password}
                error={errors.password?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <div className="absolute top-0 right-0">
            <Link to={"/auth/forget"} className="text-[#9847fe]">
              Forget Password?
            </Link>
          </div>
        </div>
        <div className="mt-9">
          <Button
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Login"}
            type="int"
            disabled={!isValid || isBusy}
           
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
