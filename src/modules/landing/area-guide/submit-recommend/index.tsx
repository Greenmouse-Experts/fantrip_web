import { FC, useState } from "react";
import SelectNaming from "./select-name";
import ReviewForm from "./reveiw-form";
import RecommendForm from "./recommend-form";
// import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
export enum NAME_CHOICE {
  REAL = "real",
  NICK = "nick",
}
interface Props{
    close: () => void
}
const SubmitRecommendIndex:FC<Props> = ({close}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [nameChoice, setNameChoice] = useState(NAME_CHOICE.REAL);
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
  const [photos, setPhotos] = useState<Array<File>>();
//   const toast = useToast();
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
      close_to_stadium: false,
      public_transport: false,
      description: "",
    },
  });
  const submitAction = (data:any) => {
    setIsBusy(true)
    const payload = {
        name: data.name
    }
    console.log(payload);
    close()
  }
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
          setImage={setPhotos}
          prevImage={photos}
          isValid={isValid}
        />
      )}
      {activeTab === 3 && <ReviewForm getValues={getValues} prev={handlePrev} isBusy={isBusy} handleSubmit={handleSubmit(submitAction)}/>}
    </div>
  );
};

export default SubmitRecommendIndex;
