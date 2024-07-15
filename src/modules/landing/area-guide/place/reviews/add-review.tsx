import Button from "@/components/Button";
import RatingComponent from "@/components/rating-component";
import TextInput, { InputType } from "@/components/TextInput";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

interface Props {
  refetch: () => void;
  close: () => void;
  id: string;
}
const AddReview: FC<Props> = ({}) => {
  const [isBusy, setIsBusy] = useState(false);
  const [rate, setRate] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = () => {
    setIsBusy(true);
  };
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Review"
              labelClassName="fw-500 lg:text-lg"
              placeholder="what are your thoughts on this reccomendation..."
              type={InputType.textarea}
              error={errors.email?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <div className="mt-5">
          <p className="fw-500 lg:text-lg mb-3">Rating</p>
          <RatingComponent value={rate} setValue={setRate} size={32} />
        </div>
        <div className="mt-9">
          <Button
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Submit"}
            type="int"
            disabled={!isValid || isBusy}
          />
        </div>
      </form>
    </div>
  );
};

export default AddReview;
