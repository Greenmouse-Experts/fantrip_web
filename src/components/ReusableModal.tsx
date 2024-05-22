import { FC } from "react";
import Button from "./Button";
import { BeatLoader } from "react-spinners";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { PiSealWarningFill } from "react-icons/pi";

interface Props {
  title: string;
  closeModal: () => void;
  action: () => void;
  cancelTitle: string;
  actionTitle: string;
  isBusy: boolean;
  type: string;
}
const ReusableModal: FC<Props> = ({
  title,
  closeModal,
  action,
  cancelTitle,
  actionTitle,
  isBusy,
  type,
}) => {
  return (
    <div className="px-4">
      {type === "warning" ? (
        <div className="bg-orange-100 w-24 h-24 circle mx-auto place-center">
          <PiSealWarningFill className="text-5xl text-orange-600" />
        </div>
      ) : (
        <div className="bg-red-100 w-24 h-24 circle mx-auto place-center">
          <RiDeleteBin5Fill className="text-3xl text-red-600" />
        </div>
      )}
      <div className="px-6 mt-3 text-black text-center">{title}</div>
      <div className="w-full mt-8 flex justify-between">
        <Button
          altClassName="py-2 px-3 lg:px-6  bg-gray-600 rounded-full text-white"
          title={cancelTitle}
          onClick={closeModal}
        />
        <Button
          altClassName="py-2 px-3 lg:px-6 rounded-full bg-primary text-white"
          title={isBusy ? <BeatLoader size={10} color="white" /> : actionTitle}
          onClick={action}
        />
      </div>
    </div>
  );
};

export default ReusableModal;
