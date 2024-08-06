import { FC, useEffect, useState } from "react";
import SelectNaming from "./select-name";
import ReviewForm from "./reveiw-form";
import RecommendForm from "./recommend-form";
// import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createPlace } from "@/services/api/places-api";
import { uploadImages } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { CreatePlaceInput } from "@/lib/contracts/place";
import SubmitSuccess from "./submit-success";
export enum NAME_CHOICE {
  REAL = "real",
  NICK = "nick",
}
interface Props {
  close: () => void;
}
const SubmitRecommendIndex: FC<Props> = ({ close }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [nameChoice, setNameChoice] = useState(NAME_CHOICE.REAL);
  const [tags, setTags] = useState<string[]>([]);
  const nameOptions = [
    {
      name: "Use my real name",
      value: NAME_CHOICE.REAL,
    },
    {
      name: "Use my nick name",
      value: NAME_CHOICE.NICK,
    },
  ];
  const handleNext = () => setActiveTab(activeTab + 1);
  const handlePrev = () => setActiveTab(activeTab - 1);
  const [isBusy, setIsBusy] = useState(false);
  const [photos, setPhotos] = useState<File[] | undefined>();
  const [prevImgs, setPreviewImgs] = useState<string[]>([]);

  console.log(photos);
  

  useEffect(() => {
    if (!!photos?.length) {
      const urls = Array.from(photos).map((file) => URL.createObjectURL(file));
      setPreviewImgs(urls);
    }
  }, [photos]);

  const toast = useToast();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      recommend_type: "",
      name: "",
      location: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: uploadImages,
  });

  const handleAction = async (id: string, payload: CreatePlaceInput) => {
    await createPlace(id, payload)
      .then((res) => {
        setIsBusy(false);
        toast({
          render: () => (
            <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
              {res.message}
            </div>
          ),
          position: "top",
        });
        setActiveTab(4)
      })
      .catch((err: any) => {
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
      });
  };

  const submitAction = (data: any) => {
    setIsBusy(true);
    const payload = {
      name: data.name,
      location: data.location,
      tags: tags,
      description: data.description,
      isDisclosed: true,
    };
    const id = data.recommend_type;
    if(!photos?.length){
      toast({
        title: 'Add images to complement your reccomendations',
        isClosable: true,
        position: "top",
        status: "error",
      });
      return;
    }
    const fd = new FormData();
    Array.from(photos).map((file) => {
      fd.append(`images`, file);
    });
    mutation.mutate(fd, {
      onSuccess: (data) => {
        const payloadWithImage = {
          ...payload,
          photos: data,
        };
        handleAction(id, payloadWithImage);
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
    <div className="p-3 lg:p-6 ">
      {activeTab === 1 && (
        <SelectNaming
          nameOptions={nameOptions}
          nameChoice={nameChoice}
          setNameChoice={setNameChoice}
          next={handleNext}
        />
      )}
      {activeTab === 2 && (
        <RecommendForm
          control={control}
          errors={errors}
          setValue={setValue}
          next={handleNext}
          prev={handlePrev}
          image={photos || []}
          setImage={setPhotos}
          prevImage={prevImgs}
          tags={tags}
          setTags={setTags}
          isValid={isValid}
        />
      )}
      {activeTab === 3 && (
        <ReviewForm
          getValues={getValues}
          images={prevImgs}
          tags={tags}
          prev={handlePrev}
          isBusy={isBusy}
          handleSubmit={handleSubmit(submitAction)}
        />
      )}
      {activeTab === 4 && (
        <SubmitSuccess close={close}/>
      )}
    </div>
  );
};

export default SubmitRecommendIndex;
