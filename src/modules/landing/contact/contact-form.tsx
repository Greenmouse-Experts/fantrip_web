import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { contactUs } from "@/services/api/routine";
import Button from "@/components/Button";
import { BeatLoader } from "react-spinners";
import TextInput, { InputType } from "@/components/TextInput";

export interface ContactInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
const ContactForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subject: ""
    },
  });
  const mutation = useMutation({
    mutationFn: contactUs,
  });
  const onSubmit = (data: ContactInput) => {
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
        reset()
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
    <div className="bg-gradient p-[1px] rounded-[20px]">
      <div className="bg-[#F2F4FF] dark:bg-darkColorLight w-full h-full rounded-[20px] p-5 lg:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your name",
              },
            }}
            render={({ field }) => (
              <TextInput
                label=""
                placeholder="Your Name *"
                altClassName="w-full p-3 rounded-[10px] outline-none"
                borderClass="border border-[#D4D1D1] rounded-[10px] overflow-hidn"
                type={InputType.text}
                error={errors.email?.message}
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
                label=""
                placeholder="Email Address"
                altClassName="w-full p-3 rounded-[10px] outline-none"
                borderClass="border border-[#D4D1D1] rounded-[10px] overflow-hidn"
                type={InputType.email}
                error={errors.email?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <TextInput
                label=""
                placeholder="Subject"
                altClassName="w-full p-3 rounded-[10px] outline-none"
                borderClass="border border-[#D4D1D1] rounded-[10px] overflow-hidn"
                type={InputType.text}
                error={errors.email?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <Controller
            name="message"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter a message",
              },
            }}
            render={({ field }) => (
              <TextInput
                label=""
                placeholder="Message"
                type={InputType.textarea}
                altClassName="w-full p-3 h-32 rounded-[10px] outline-none"
                borderClass="border border-[#D4D1D1] dark:bg-darkColorLight bg-white rounded-[10px] overflow-hidn"
                error={errors.email?.message}
                {...field}
                ref={null}
              />
            )}
          />
          <div className="mt-4">
            <Button
              title={
                isBusy ? <BeatLoader size={12} color="white" /> : "Continue"
              }
              type="int"
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
