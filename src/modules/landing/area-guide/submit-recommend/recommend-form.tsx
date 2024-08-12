import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { SpotCategoryItem } from "@/lib/contracts/place";
import { removeDulicates } from "@/lib/utils/formatHelp";
import { getSpotsCat } from "@/services/api/places-api";
import { GOOGLE_MAP_KEY } from "@/services/constant";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FcCancel } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
interface InputTyping {
  recommend_type: string;
  name: string;
  location: string;
  description: string;
}
interface Props {
  control: Control<InputTyping> | any;
  errors: FieldErrors<InputTyping>;
  setValue: any;
  next: () => void;
  prev: () => void;
  setImage: React.Dispatch<React.SetStateAction<File[] | undefined>>;
  prevImage: string[] | undefined;
  image: File[];
  isValid: boolean;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}
const RecommendForm: FC<Props> = ({
  control,
  errors,
  setValue,
  image,
  setImage,
  next,
  tags,
  setTags,
  isValid,
}) => {
  const [highlights, setHighlights] = useState<string[]>([
    "Close to Stadium",
    "Public Transport Friendly",
    ...tags,
  ]);
  const [inputTags, setInputTags] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const toast = useToast();
  // const [imagesSelected, setImagesSelected] = useState<File[]>(image || []);
  const [selectedImg, setSelectedImg] = useState<File[] | undefined>();

  const { data: spots } = useQuery({
    queryKey: ["get-spot-categories"],
    queryFn: getSpotsCat,
  });

  useEffect(() => {
    if (image.length >= 4) {
      toast({
        title: "Hello, lets's have 4 for now",
        isClosable: true,
        position: "top",
        status: "info",
      });
      return;
    }
    const selected = selectedImg || [];
    const addedImages = [...image, ...selected];
    setImage(addedImages);
  }, [selectedImg]);

  const handleRemove = (file: File) => {
    const filtered = image.filter((item) => item.name !== file.name);
    setImage(filtered);
  };

  const { ref: autoRef } = usePlacesWidget({
    apiKey: GOOGLE_MAP_KEY,
    options: {
      types: ["address"],
    },
    onPlaceSelected: (place) => {
      setValue("location", place?.formatted_address);
    },
  });

  const handlePhoto = async (e: any) => {
    if (e.target.files?.length) setSelectedImg(e.target.files);
  };

  // highlights
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (e.target.checked) {
      if (!tags.includes(val)) {
        setTags([...tags, val]);
      }
    } else {
      if (tags.includes(val)) {
        const filtered = tags.filter((where) => where !== val);
        setTags(filtered);
      }
    }
  };
  const handleInputTags = () => {
    if (!inputTags.length) return;
    if (!tags.includes(inputTags)) {
      setHighlights([...highlights, inputTags]);
      setTags([...tags, inputTags]);
      setInputTags("");
      setShowAdd(false);
    }
  };

  return (
    <div>
      <p className="syne fw-600 text-lg lg:text-2xl text-center">
        Fill in Recommendation Details:
      </p>
      <div className="grid gap-5 mt-5 max-h-[60vh] overflow-y-auto">
        <div>
          <p className="text-black fw-600 lg:text-lg block mb-3">
            Type of Recommendation
          </p>
          <Controller
            name="recommend_type"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please select a recommention type",
              },
            }}
            render={({ field }) => (
              <div className="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none">
                <select
                  {...field}
                  ref={null}
                  className="w-[95%] p-3 bg-[#F9FAFC] lg:p-[15px] outline-none rounded-[10px]"
                >
                  <option value="" disabled>
                    Select type of recommendation
                  </option>
                  {spots &&
                    !!spots.data.length &&
                    spots.data.map((item: SpotCategoryItem) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                </select>
                <p>{errors && errors.recommend_type?.message}</p>
              </div>
            )}
          />
        </div>
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your recommendation name",
            },
          }}
          render={({ field }) => (
            <TextInput
              type={InputType.text}
              label="Name or Location Description"
              labelClassName="text-black fw-600 lg:text-lg block mb-3"
              borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
              altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
              error={errors.name?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <div>
          <p className="text-black fw-600 lg:text-lg block mb-3">
            Address/Location
          </p>
          <Controller
            name="location"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your stay name",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                ref={autoRef as any}
                type="text"
                className=" p-3 lg:p-4 w-full border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
              />
            )}
          />
        </div>
        <div>
          <p className="text-black fw-600 lg:text-lg block mb-3">
            Recommendation Highlights
          </p>
          <div className="grid gap-5">
            {removeDulicates(highlights).map((item, i) => (
              <div className="flex items-center gap-x-3" key={i}>
                <input
                  type="checkbox"
                  value={item}
                  checked={tags.includes(item)}
                  onChange={handleCheck}
                  className="w-4 h-4"
                />
                <p>{item}</p>
              </div>
            ))}
            <div className="lg:mt-5 flex gap-x-3 items-center">
              <div className="flex items-center gap-x-3">
                <input
                  type="checkbox"
                  checked={showAdd}
                  name="other"
                  className="w-4 h-4"
                  onChange={() => setShowAdd(!showAdd)}
                />
                <p>Others</p>
              </div>
              {showAdd && (
                <div className="lg:w-8/12 flex justify-between items-center pr-3 border rounded border-[#D2D2D2]">
                  <input
                    type="text"
                    className=" p-2 w-full outline-none"
                    value={inputTags}
                    onChange={(e) => setInputTags(e.target.value)}
                  />
                  <IoSend
                    className="text-lg text-gray-700"
                    onClick={handleInputTags}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <Controller
          name="description"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your recommendation description",
            },
          }}
          render={({ field }) => (
            <TextInput
              type={InputType.textarea}
              label="Description"
              placeholder="Include details like pricing, transport routes, and personal tips"
              labelClassName="text-black fw-600 lg:text-lg block mb-3"
              borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
              altClassName="bg-[#F9FAFC] p-3 lg:p-4 outline-none h-24 rounded-[10px] w-full"
              error={errors.description?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <div>
          <div className="flex items-center gap-x-4">
            <div className="w-44 flex justify-center relative cursor-pointer py-2 border border-[#9847FE] rounded-[14px]">
              <input
                type="file"
                accept="image/*, .heic"
                multiple
                onChange={(e) => handlePhoto(e)}
                className="opacity-0 absolute w-full h-full"
              />
              <p className="text-center text-[#9847FE] fw-500 px-5 py-1">
                Upload photos
              </p>
            </div>
            <p className="fw-600">(Optional)</p>
          </div>
          <div className="flex gap-x-2 py-2 overflow-x-auto scroll-pro mt-2">
            {!!image?.length &&
              image.map((item, i) => (
                <div className="relative" key={i}>
                  <FcCancel
                    className="absolute -top-3 -right-3 cursor-pointer text-2xl lg:text-3xl"
                    onClick={() => handleRemove(item)}
                  />
                  <img
                    src={URL.createObjectURL(item)}
                    alt="room"
                    className="lg:w-36 lg:h-36 object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-9">
        <Button
          disabled={!isValid}
          title={"Review and Submit"}
          onClick={next}
        />
      </div>
    </div>
  );
};

export default RecommendForm;
