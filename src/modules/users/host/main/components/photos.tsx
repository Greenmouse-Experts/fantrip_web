import ImageInput from "@/components/ImageInput";
import BtnContent from "@/components/btn-content";
import useStay from "@/hooks/useStay";
import { uploadImages } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { BeatLoader } from "react-spinners";

interface Props {
  next: () => void;
  prev: () => void;
}
const StayPhotos: FC<Props> = ({ next, prev }) => {
  const { stay, saveStay } = useStay();
  const [prevPhotos, setPrevPhotos] = useState<string[]>(stay.photos);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesSelected, setImagesSelected] = useState<File[]>([]);
  const [selectedImg, setSelectedImg] = useState<File[] | undefined>();
  const toast = useToast();

  useEffect(() => {
    if (imagesSelected.length >= 4) {
      toast({
        title: "Hello, lets's have 4 for now",
        isClosable: true,
        position: "top",
        status: "info",
      });
      return;
    }
    const selected = selectedImg || [];
    const addedImages = [...imagesSelected, ...selected];
    setImagesSelected(addedImages);
  }, [selectedImg]);

  const handleRemove = (file: File) => {
    const filtered = imagesSelected.filter((item) => item.name !== file.name);
    setImagesSelected(filtered);
  };

  const handlePrevRemove = (file: string) => {
    const filtered = prevPhotos.filter((item) => item !== file);
    setPrevPhotos(filtered);
  };

  const mutation = useMutation({
    mutationFn: uploadImages,
  });

  const handleAddImages = () => {
    if (!imagesSelected?.length) {
      if (!!stay.photos.length) {
        saveStay({
          ...stay,
          photos: prevPhotos,
        });
        next();
        return;
      } else return;
    }
    setIsLoading(true);
    const fd = new FormData();
    imagesSelected.forEach((item) => {
      fd.append(`images`, item);
    });
    mutation.mutate(fd, {
      onSuccess: (data) => {
        saveStay({
          ...stay,
          photos: [...prevPhotos, ...data],
        });
        setIsLoading(false);
        next();
      },
      onError: (err: any) => {
        setIsLoading(false);
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
        <div className="grid grid-cols-2 md:flex gap-4 mt-4">
          {imagesSelected &&
            !!imagesSelected.length &&
            imagesSelected.map((item, i) => (
              <div className="relative" key={i}>
                <FcCancel
                  className="absolute -top-3 -right-3 cursor-pointer text-2xl lg:text-3xl"
                  onClick={() => handleRemove(item)}
                />
                <img
                  src={URL.createObjectURL(item)}
                  alt="room"
                  className="h-32 lg:w-36 lg:h-36 object-cover"
                />
              </div>
            ))}
        </div>
        <div className="grid grid-cols-2 md:flex gap-4 mt-2">
          {stay &&
            !!prevPhotos.length &&
            prevPhotos.map((item, i) => (
              <div className="relative" key={i}>
                <FcCancel
                  className="absolute -top-3 -right-3 cursor-pointer text-2xl lg:text-3xl"
                  onClick={() => handlePrevRemove(item)}
                />
                <img
                  src={item}
                  alt="room"
                  className="lg:w-36 lg:h-36 object-cover"
                />
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
          {isLoading ? <BeatLoader /> : <BtnContent name="Continue" />}
        </div>
      </div>
    </div>
  );
};

export default StayPhotos;
