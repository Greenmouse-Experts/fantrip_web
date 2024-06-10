import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { AmenityItemInput } from "@/lib/contracts/routine";
import { addAmenity, uploadImage } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import TextInput, { InputType } from "@/components/TextInput";
import ImageInput from "@/components/ImageInput";
import Button from "@/components/Button";

interface Props {
  close: () => void;
  refetch: () => void;
}
const AddAmenityModal: FC<Props> = ({ close, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [selectedImg, setSelectedImg] = useState<File[] | undefined>();
  const toast = useToast();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AmenityItemInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const addAction = useMutation({
    mutationFn: addAmenity,
    mutationKey: ["add-amenity"],
  });
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const payload = {
        name: watch("name"),
        imageUrl: data.image,
      };
      addAction.mutate(payload, {
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

  const onSubmit = (data: AmenityItemInput) => {
    setIsBusy(true);
    if (selectedImg?.length) {
      const files = selectedImg[0];
      const fd = new FormData();
      fd.append("image", files);
      mutation.mutate(fd);
    } else {
      addAction.mutate(data, {
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
    }
  };
  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter amenity name",
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Name"
              labelClassName="text-[#767676] fw-500 "
              type={InputType.text}
              error={errors.name?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <ImageInput label="Amenity Image/Icon" setImage={setSelectedImg} />
        <div className="mt-7">
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

export default AddAmenityModal;
