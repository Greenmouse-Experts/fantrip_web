import ImageInput from "@/components/ImageInput";
import BtnContent from "@/components/btn-content";
import useStay from "@/hooks/useStay";
import { uploadImages } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";

interface Props {
  next: () => void;
  prev: () => void;
}
const StayPhotos: FC<Props> = ({ next, prev }) => {
  const { stay, saveStay } = useStay();
  const [selectedImg, setSelectedImg] = useState<File[] | undefined>();
  const [preview, setPreview] = useState<string[] | undefined>([]);
  const toast = useToast();
  useEffect(() => {
    const selected = selectedImg?.map((item) => URL.createObjectURL(item));
    setPreview(selected);
  }, [selectedImg]);
  const mutation = useMutation({
    mutationFn: uploadImages,
  });

  const handleAddImages = () => {
    if (!selectedImg?.length) {
      if (!!stay.photos.length) {
        next();
        return;
      } else return;
    }
    const fd = new FormData();
    selectedImg.forEach((item) => {
      fd.append(`images`, item);
    });
    mutation.mutate(fd, {
      onSuccess: (data) => {
        saveStay({
          ...stay,
          photos: data,
        });
        next();
      },
      onError: (err: any) => {
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
      },
    });
  };
  return (
    <div>
      <p className="text-xl lg:text-4xl lg:w-9/12">Upload More Photos</p>
      <div className="mt-6 flex gap-x-1">
        <BsInfoCircle className="shrink-0 text-sm lg:text-[17px] relative top-[4px]" />
        <p className="fs-400 lg:fs-600">
          Hosts are encouraged to upload high-quality images of their
          accommodation.
        </p>
      </div>
      <div className="mt-8">
        <div className="w-[280px] lg:w-10/12 place-center rounded-[14px]">
          <ImageInput
            label="Stay Imgaes"
            setImage={setSelectedImg}
            containerClass="w-full"
          />
        </div>
        <div className="grid grid-cols-2 md:flex gap-4 mt-2">
          {preview &&
            !!preview.length &&
            preview.map((item, i) => (
              <div key={i}>
                <img src={item} alt="room" className="h-32 lg:w-36 lg:h-36 object-cover" />
              </div>
            ))}
        </div>
        <div className="grid grid-cols-2 md:flex gap-4 mt-2">
          {stay &&
            !!stay.photos.length &&
            stay.photos.map((item, i) => (
              <div key={i}>
                <img src={item} alt="room" className="lg:w-36 lg:h-36 object-cover" />
              </div>
            ))}
        </div>
      </div>
      <div className="mt-8 lg:mt-16 flex justify-between items-center">
        <div
          className="btn-primary cursor-pointer px-6 py-2 lg:py-3"
          onClick={prev}
        >
          <BtnContent name="Prev" reverse />
        </div>
        <div
          className={`${
            !!selectedImg?.length || !!stay.photos.length
              ? "btn-primary"
              : "bg-gray-300 rounded-full cursor-not-allowed"
          } cursor-pointer px-6 py-2 lg:py-3`}
          onClick={handleAddImages}
        >
          <BtnContent name="Continue" />
        </div>
      </div>
    </div>
  );
};

export default StayPhotos;
