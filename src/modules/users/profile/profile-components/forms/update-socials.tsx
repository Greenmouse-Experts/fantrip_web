import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { useForm, Controller } from "react-hook-form";
import { FC, useState } from "react";
import { BeatLoader } from "react-spinners";
import { UserItem } from "@/lib/contracts/auth";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";

interface Props {
  close: () => void;
  item: UserItem;
  refetch: () => void;
}

const UpdateSocialForm: FC<Props> = ({ close, item, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      facebookUrl: item.facebookUrl || "",
      twitterUrl: item.twitterUrl || "",
      linkedinUrl: item.linkedinUrl || "",
      instagramUrl: item.instagramUrl || "",
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["profileUpdate"],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsBusy(true);
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              {data.message}
            </div>
          ),
          position: "top",
        });
        setIsBusy(false);
        refetch();
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
    <div className="lg:px-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2 mt-3">
          <Controller
            name="facebookUrl"
            control={control}
            // rules={{ required: "Facebook URL is required" }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="Facebook URL"
                labelClassName="text-black fw-600 lg:text-lg block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.facebookUrl?.message}
                {...field}
                ref={null}
              />
            )}
          />

          <Controller
            name="twitterUrl"
            control={control}
            // rules={{ required: "Twitter URL is required" }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="Twitter URL"
                labelClassName="text-black fw-600 lg:text-lg block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.twitterUrl?.message}
                {...field}
                ref={null}
              />
            )}
          />

          <Controller
            name="linkedinUrl"
            control={control}
            // rules={{ required: "LinkedIn URL is required" }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="LinkedIn URL"
                labelClassName="text-black fw-600 lg:text-lg block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.linkedinUrl?.message}
                {...field}
                ref={null}
              />
            )}
          />

          <Controller
            name="instagramUrl"
            control={control}
            // rules={{ required: "Instagram URL is required" }}
            render={({ field }) => (
              <TextInput
                type={InputType.text}
                label="Instagram URL"
                labelClassName="text-black fw-600 lg:text-lg block mb-3"
                borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
                altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
                error={errors.instagramUrl?.message}
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
  );
};

export default UpdateSocialForm;
