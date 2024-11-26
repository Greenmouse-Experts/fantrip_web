import TextInput, { InputType } from "@/components/TextInput";
import useAuth from "@/hooks/authUser";
import { updateEmail } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { BeatLoader } from "react-spinners";

interface Props {
  close: () => void;
}
const EmailUpdate: FC<Props> = ({ close }) => {
  const toast = useToast();
  const { user, saveUser } = useAuth();
  const [isBusy, setIsBusy] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: user.email || "",
    },
  });

  const mutation = useMutation({
    mutationFn: updateEmail,
    mutationKey: ["emailUpdate"],
  });

  const onSubmit = async (datas: any) => {
    setIsBusy(true);
    const payload = {
      email: datas.email,
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
    <>
      <div className="lg:px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-1 items-end mt-3">
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter your email address",
                },
              }}
              render={({ field }) => (
                <TextInput
                  type={InputType.text}
                  label="Email"
                  labelClassName="text-black fw-600 lg:text-lg block mb-3"
                  borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                  altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                  error={errors.email?.message}
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
    </>
  );
};

export default EmailUpdate;
