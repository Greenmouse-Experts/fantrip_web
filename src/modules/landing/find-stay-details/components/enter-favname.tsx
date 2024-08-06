import Button from "@/components/Button";
import useAuth from "@/hooks/authUser";
import { updateProfile } from "@/services/api/authApi";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { BeatLoader } from "react-spinners";

interface Props {
  close: () => void;
  handleReserve: () => void;
}
const EnterFaveName: FC<Props> = ({ close, handleReserve }) => {
  const { saveUser, user } = useAuth();
  const [isBusy, setisBusy] = useState(false);
  const [name, setName] = useState("");
  const toast = useToast();

  const Update = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["update"],
  });

  const handleSave = () => {
    if (!name.length) return;
    setisBusy(true);
    const payload = {
      favTeam: name,
    };
    Update.mutate(payload, {
      onSuccess: () => {
        saveUser({
          ...user,
          favTeam: name,
        });
        setTimeout(() => {
          close();
        }, 500);
        handleReserve();
      },
      onError: (error: any) => {
        toast({
          title: error.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setisBusy(false);
      },
    });
  };

  const handleSkip = () => {
    setTimeout(() => {
      close();
    }, 500);
    handleReserve();
  };

  return (
    <div>
      <div className="flex gap-x-4">
        <div className="w-[230px] relative">
          <img
            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1722949534/fantrip/support-removebg-preview_l3bmek.png"
            alt="football"
            className="absolute w-full -top-16"
          />
        </div>
        <div className="w-full">
          <p className="text-3xl fw-600">Hey sport fan!</p>
          <p>
            share your favorite sports teams with your host to spark a fun
            conversation.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <div className="border border-[#9847FE] flex pl-2 rounded-lg">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 py-4 border-0 outline-none"
          />
          <button
            className="cursor-pointer text-lg fw-500 bg-gradient text-white px-4 shrink-0 rounded-r-lg"
            onClick={handleSave}
          >
            {isBusy ? <BeatLoader /> : "Submit"}
          </button>
        </div>
      </div>
      <div className="flex mt-10 items-center justify-between">
        <Button
          title="close"
          altClassName="border border-[#9847FE] px-6 py-3 text-lg fw-500 rounded-lg text-prima"
          onClick={close}
        />
        <Button
          title="Skip & Reserve"
          altClassName="btn-int text-lg px-6 fw-500 py-3"
          onClick={handleSkip}
        />
      </div>
    </div>
  );
};

export default EnterFaveName;
