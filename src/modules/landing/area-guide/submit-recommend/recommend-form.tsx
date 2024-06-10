import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { GOOGLE_MAP_KEY } from "@/services/constant";
import { FC } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { Control, Controller, FieldErrors } from "react-hook-form";
interface InputTyping {
  recommend_type: string;
  name: string;
  location: string;
  close_to_stadium: boolean;
  public_transport: boolean;
  description: string;
}
interface Props {
  control: Control<InputTyping> | any;
  errors: FieldErrors<InputTyping>;
  setValue: any;
  next: () => void;
  prev: () => void;
  setImage: React.Dispatch<React.SetStateAction<File[] | undefined>>;
  prevImage: File[] | undefined;
  isValid: boolean
}
const RecommendForm: FC<Props> = ({
  control,
  errors,
  setValue,
  setImage,
  next,
  isValid,
}) => {
  const { ref: autoRef } = usePlacesWidget({
    apiKey: GOOGLE_MAP_KEY,
    onPlaceSelected: (place) => {
      setValue("location", place?.formatted_address);
    },
  });
  const handlePhoto = async (e: any) => {
    if (e.target.files?.length) 
    setImage(e.target.files);
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
            name="property"
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: "Please select a recommention type",
            //   },
            // }}
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
            name="address"
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
        <div className="flex gap-x-5 px-3">
          <Controller
            name="close_to_stadium"
            control={control}
            render={({ field }) => (
              <div className="flex gap-x-4 items-center">
                <div className="pt-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </div>
                <label className="text-[#121212] fw-500 ">
                  Close to Stadium”
                </label>
              </div>
            )}
          />
          <Controller
            name="public_transport"
            control={control}
            render={({ field }) => (
              <div className="flex gap-x-4 items-center">
                <div className="pt-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </div>
                <label className="text-[#121212] fw-500 ">
                  Public Transport Friendly
                </label>
              </div>
            )}
          />
        </div>
        <Controller
          name="description"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter your recommendation name",
            },
          }}
          render={({ field }) => (
            <TextInput
              type={InputType.textarea}
              label="Description"
              placeholder="Include details like pricing, transport routes, and personal tips"
              labelClassName="text-black fw-600 lg:text-lg block mb-3"
              borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
              altClassName="bg-[#F9FAFC] p-3 lg:p-4 h-24 rounded-[10px] w-full"
              error={errors.description?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <div className="flex items-center gap-x-4">
          <div className="w-44 flex justify-center relative cursor-pointer py-2 border border-[#9847FE] rounded-[14px]">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhoto(e)}
              className="opacity-0 absolute w-full h-full"
            />
            <p className="text-center text-[#9847FE] fw-500 px-5 py-1">
              Upload photos
            </p>
          </div>
          <p className="fw-600">(Optional)</p>
        </div>
      </div>
      <div className="mt-9">
        <Button disabled={!isValid} title={'Review and Submit'} onClick={next}/>
      </div>
    </div>
  );
};

export default RecommendForm;
