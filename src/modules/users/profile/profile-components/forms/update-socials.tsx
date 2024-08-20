import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { useForm, Controller } from "react-hook-form";
import { FC, useState } from "react";
import { BeatLoader } from "react-spinners";
import { UserItem } from "@/lib/contracts/auth";

interface Props {
  close: () => void;
  item: UserItem;
}

const UpdateSocialForm: FC<Props> = ({ close, item }) => {
  const [isBusy, setIsBusy] = useState(false);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data:any) => {
    setIsBusy(true);
    console.log("Form data:", data);
    // Perform form submission logic here
    // Example: mutation.mutate(data, { onSuccess, onError });
    setIsBusy(false);
    close();
  };

  return (
    <div className="lg:px-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2 mt-3">
          <Controller
            name="facebookUrl"
            control={control}
            rules={{ required: "Facebook URL is required" }}
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
            rules={{ required: "Twitter URL is required" }}
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
            rules={{ required: "LinkedIn URL is required" }}
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
            rules={{ required: "Instagram URL is required" }}
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
