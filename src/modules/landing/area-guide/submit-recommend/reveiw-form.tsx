import Button from "@/components/Button";
import { FC } from "react";

interface Props {
  getValues: any;
  prev: () => void;
  isBusy: boolean;
  handleSubmit: () => void;
}
const ReviewForm: FC<Props> = ({ prev, getValues, handleSubmit}) => {
  const values = getValues();
  return (
    <div>
      <div className="flex justify-between">
        <p className="fw-500 lg:text-lg">Please Review your Recommendation</p>
        <p className="text-[#9847FE] fw-500 cursor-pointer" onClick={prev}>
          Edit
        </p>
      </div>
      <div className="mt-4 bg-gradient p-[2px] rounded-lg">
        <div className="p-4 bg-white rounded-lg grid gap-3 divide-y-2 max-h-[44vh] overflow-y-auto">
          <div>
            <p className="monts text-[#5E5E5E]">Type of Recommendation</p>
            <p className="text-[#000000] syne fw-600 text-lg">
              {values.recommend_type}
            </p>
          </div>
          <div className="pt-3">
            <p className="monts text-[#5E5E5E]">Name or Location Description</p>
            <p className="text-[#000000] syne fw-600 text-lg">{values.name}</p>
          </div>
          <div className="pt-3">
            <p className="monts text-[#5E5E5E]">Address/Location</p>
            <p className="text-[#000000] syne fw-600 text-lg">{values.name}</p>
          </div>
          <div className="pt-3">
            <p className="monts text-[#5E5E5E]">Category Tags</p>
            <p className="text-[#000000] syne fw-600 text-lg">{values.name}</p>
          </div>
          <div className="pt-3">
            <p className="monts text-[#5E5E5E]">Description</p>
            <p className="text-[#000000] syne fw-600 text-lg">{values.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-gradient p-[2px] rounded-lg">
        <div className="p-3 bg-white rounded-lg grid gap-3">
          <div className="w-36 h-16 border-2 rounded-lg"></div>
        </div>{" "}
      </div>
      <div className="mt-9">
        <Button title="Submit Recommendation" onClick={handleSubmit}/>
      </div>
    </div>
  );
};

export default ReviewForm;
