import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import useAuth from "@/hooks/authUser";
import { useToast } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";

interface Props {
  next: () => void;
  prev: () => void;
}
const SetupBio: FC<Props> = ({ next, prev }) => {
  const { kyc, saveKyc, user } = useAuth();
  const toast = useToast();
  const [bioInput, setBioInput] = useState(kyc?.bio || user?.bio || "");
  const handleNext = () => {
    if (!bioInput.length) {
      toast({
        render: () => (
          <div className="text-white w-[290px] text-center fw-600 syne bg-[#9847FE] rounded p-3">
            Please enter a bio to proceed
          </div>
        ),
        position: "top",
      });
      return;
    }
    saveKyc({
      ...kyc,
      bio: bioInput,
    });
    next();
  };
  return (
    <div>
      <p className="text-xl lg:text-4xl">Fill in a Short Bio</p>
      <div className="mt-6 flex gap-x-1">
        <BsInfoCircle className="shrink-0 text-sm relative top-[4px]" />
        <p className="fs-400">
          Details about your favorite sports team, why you love hosting a fan,
          and any personal touches you bring to the hosting experience.
        </p>
      </div>
      <div className="lg:w-9/12 mt-8">
        <TextInput
          value={bioInput}
          type={InputType.textarea}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBioInput(e.target.value)
          }
          label="Write your bio here"
          labelClassName="text-[#9F9F9F]"
          altClassName="h-32 w-full rounded-[4px] p-2"
        />
      </div>
      <div className="mt-8 flex justify-between">
        <div className="btn-primary cursor-pointer px-6 py-2" onClick={prev}>
          <BtnContent name="Prev" reverse />
        </div>
        <div
          className="btn-primary cursor-pointer px-6 py-2"
          onClick={() => handleNext()}
        >
          <BtnContent name="Continue" />
        </div>
      </div>
    </div>
  );
};

export default SetupBio;
