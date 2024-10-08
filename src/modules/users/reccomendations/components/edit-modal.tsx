import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { PlaceItem } from "@/lib/contracts/place";
import { removeDulicates } from "@/lib/utils/formatHelp";
import { updatePlace } from "@/services/api/places-api";
import { uploadImages } from "@/services/api/routine";
import { Switch, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FcCancel } from "react-icons/fc";
import { IoMdAddCircle } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { BeatLoader } from "react-spinners";

interface Props {
  item: PlaceItem;
  close: () => void;
  refetch: () => void;
}
const EditRecommendation: FC<Props> = ({ item, close, refetch }) => {
  const { id, description, name, isDisclosed, tags, photos, location } = item;
  const parseTags = JSON.parse(tags);
  const parsedPhotos = JSON.parse(photos);
  const [isBusy, setIsBusy] = useState(false);
  const [initListing, setInitLisitng] = useState([...parseTags]);
  const [selectedSpecial, setSelectedSpecial] = useState<string[]>([
    ...parseTags,
  ]);
  const [specialInput, setSpecialInput] = useState("");
  const [showOther, setShowOther] = useState(false);
  const toast = useToast();

  const handleSpecialCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (e.target.checked) {
      if (!selectedSpecial.includes(val)) {
        setSelectedSpecial([...selectedSpecial, val]);
      }
    } else {
      if (selectedSpecial.includes(val)) {
        const filtered = selectedSpecial.filter((where) => where !== val);
        setSelectedSpecial(filtered);
      }
    }
  };

  const handleSpecialInput = () => {
    if (!specialInput.length) return;
    if (!selectedSpecial.includes(specialInput)) {
      setInitLisitng([...initListing, specialInput]);
      setSelectedSpecial([...selectedSpecial, specialInput]);
      setSpecialInput("");
    }
  };

  //   for images
  const [selected, setSelected] = useState<string[]>(parsedPhotos);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleRemove = (item: string) => {
    const filtered = selected.filter((where) => where !== item);
    setSelected(filtered);
  };

  const mutation = useMutation({
    mutationFn: uploadImages,
    onSuccess: (data) => {
      setSelected([...selected, data.image]);
      toast({
        render: () => (
          <div className="text-white w-[240px] text-center fw-600 syne bg-gradient rounded p-3">
            Photo Added Successfully
          </div>
        ),
        position: "top",
      });
      setIsUpdate(false);
    },
    onError: (error: any) => {
      toast({
        title: error.response.data.message,
        isClosable: true,
        position: "top",
        status: "error",
      });
      setIsUpdate(false);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    setIsUpdate(true);
    const files = e.target.files[0];
    const fd = new FormData();
    fd.append("image", files);
    mutation.mutate(fd);
  };

  //   control for description and isDisclosed status
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: name || "",
      isPublished: isDisclosed,
      description: description,
    },
  });

  const onSubmit = async (data: any) => {
    setIsBusy(true);
    const payload = {
      isDisclosed: data.isPublished,
      description: data.description,
      tags: selectedSpecial,
      photos: selected,
      location: location,
    };
    await updatePlace(id, payload)
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
        refetch();
        close();
      })
      .catch((err) => {
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      });
  };
  return (
    <div>
      <div className="lg:max-h-[450px] overflow-y-auto mt-5">
        <p className="text-[#767676] fw-500">Photos</p>
        <div className="grid grid-cols-2 lg:grid-cols-5 items-center gap-3">
          {selected.map((item, i) => (
            <div className="w-full relative h-[90px]" key={i}>
              <div
                onClick={() => handleRemove(item)}
                className="absolute -top-3 -right-2 cursor-pointer bg-white w-9 h-9 circle place-center"
              >
                <FcCancel className="text-2xl " />
              </div>
              <img
                src={item}
                alt="stay"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="relative place-center w-full bg-gray-800 h-[90px] rounded-lg">
            <input
              type="file"
              onChange={handleChange}
              className="w-full h-full absolute top-0 left-0 z-10 opacity-0"
            />
            {!isUpdate ? (
              <IoMdAddCircle className="text-3xl text-gray-400" />
            ) : (
              <BeatLoader color="white" />
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 mt-4 gap-4"
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter Recommendation name",
              },
            }}
            disabled
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
          <Controller
            name="isPublished"
            control={control}
            render={({ field }) => (
              <div className="flex gap-x-4 items-center">
                <label className="text-[#767676] fw-500 ">Published</label>
                <div className="pt-1">
                  <Switch
                    isChecked={field.value}
                    colorScheme="pink"
                    onChange={field.onChange}
                  />
                </div>
              </div>
            )}
          />
          <div className="lg:col-span-2">
            <Controller
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter description",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Description"
                  labelClassName="text-[#767676] fw-500 "
                  type={InputType.textarea}
                  error={errors.name?.message}
                  {...field}
                  ref={null}
                />
              )}
            />
          </div>
        </form>
        <p className="mb-3 mt-5 text-[#767676] fw-500">Features Tags</p>
        <div className="grid lg:grid-cols-2 gap-5">
          {removeDulicates(initListing).map((item, i) => (
            <div className="flex items-center gap-x-3" key={i}>
              <input
                type="checkbox"
                value={item}
                checked={selectedSpecial.includes(item)}
                onChange={handleSpecialCheck}
                className="w-4 h-4"
              />
              <p>{item}</p>
            </div>
          ))}
          <div className="mt-2 flex gap-x-3 items-center">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                checked={showOther}
                name="other"
                className="w-4 h-4"
                onChange={() => setShowOther(!showOther)}
              />
              <p>Others</p>
            </div>
            {showOther && (
              <div className="lg:w-10/12 flex justify-between items-center pr-3 border rounded border-[#D2D2D2]">
                <input
                  type="text"
                  className=" p-2 w-full outline-none"
                  value={specialInput}
                  onChange={(e) => setSpecialInput(e.target.value)}
                />
                <IoSend
                  className="text-lg text-gray-700"
                  onClick={handleSpecialInput}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-7 flex justify-end">
        <div className="w-7/12 lg:w-6/12">
          <Button
            title={
              isBusy ? (
                <BeatLoader size={12} color="white" />
              ) : (
                "Update Recommendation"
              )
            }
            type="int"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isBusy}
          />
        </div>
      </div>
    </div>
  );
};

export default EditRecommendation;
