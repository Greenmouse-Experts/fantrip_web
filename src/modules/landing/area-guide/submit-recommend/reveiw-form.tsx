import Button from "@/components/Button";
import { SpotCategoryItem } from "@/lib/contracts/place";
import { getSpotsCat } from "@/services/api/places-api";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { BeatLoader } from "react-spinners";

interface Props {
  getValues: any;
  tags: string[];
  images: string[];
  prev: () => void;
  isBusy: boolean;
  handleSubmit: () => void;
}
const ReviewForm: FC<Props> = ({
  prev,
  tags,
  images,
  getValues,
  handleSubmit,
  isBusy
}) => {
  const { data } = useQuery({
    queryKey: ["get-spot-categories"],
    queryFn: getSpotsCat,
  });
  const values = getValues();
  const selectedType = data?.data.filter((where:SpotCategoryItem) => where.id === values.recommend_type)
  return (
    <div>
      <div className="flex justify-between">
        <p className="fw-500 lg:text-lg">Please Review your Recommendation</p>
        <p className="text-[#9847FE] fw-500 cursor-pointer" onClick={prev}>
          Edit
        </p>
      </div>
      <div className="mt-4 bg-gradient  p-[2px] rounded-lg">
        <div className="p-4 bg-white dark:bg-darkColorLight rounded-lg grid gap-3 divide-y-2 max-h-[44vh] overflow-y-auto">
          <div>
            <p className="monts text-[#5E5E5E]">Type of Recommendation</p>
            <p className="text-[#000000] syne fw-600 text-lg">
              {selectedType[0]?.name}
            </p>
          </div>
          <div className="pt-3">
            <p className="monts text-[#5E5E5E]">Name or Location Description</p>
            <p className="text-[#000000] syne fw-600 text-lg">{values.name}</p>
          </div>
          <div className="pt-3">
            <p className="monts text-[#5E5E5E]">Address/Location</p>
            <p className="text-[#000000] syne fw-600 text-lg">
              {values.location}
            </p>
          </div>
          <div className="pt-3">
            <p className="monts text-[#5E5E5E]">Category Tags</p>
            <p className="text-[#000000] flex gap-x-2 syne fw-200">
              {tags?.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </p>
          </div>
          <div className="pt-3">
            <p className="monts text-[#5E5E5E]">Description</p>
            <p className="text-[#000000] syne fw-600 text-lg">
              {values.description}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-gradient p-2 rounded-lg">
        <div className="flex gap-x-2 overflow-x-auto scroll-pro">
          {!!images?.length &&
            images.map((item, i) => (
              <img
                src={item}
                alt="reccomend"
                className="w-[200px] h-[140px] rounded-lg"
                key={i}
              />
            ))}
        </div>
      </div>
      <div className="mt-9">
        <Button title={isBusy? <BeatLoader/> : "Submit Recommendation"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ReviewForm;
