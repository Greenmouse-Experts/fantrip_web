import Button from "@/components/Button";
import RatingComponent from "@/components/rating-component";
import TextInput, { InputType } from "@/components/TextInput";
import { createReview } from "@/services/api/places-api";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

interface Props {
  refetch: () => void;
  close: () => void;
  id: string;
}
const AddReview: FC<Props> = ({ id, close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [rate, setRate] = useState(0);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      review: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createReview,
  });

  const onSubmit = async (data: any) => {
    setIsBusy(true);
    const payload = {
      rating: rate,
      comment: data.review,
      reviewFor: "place",
      concern: id,
    };
    mutation.mutate(payload, {
      onSuccess: (data) => {
        toast({
          render: () => (
            <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
              {data.message}
            </div>
          ),
          position: "top",
        });
        setIsBusy(false);
        refetch();
        close();
      },
      onError: (err: any) => {
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      },
    });
  };
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="review"
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
              error={errors.review?.message}
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
