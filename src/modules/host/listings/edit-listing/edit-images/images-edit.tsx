import Button from "@/components/Button";
import { uploadImage } from "@/services/api/routine";
import { updateStay } from "@/services/api/stay-api";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React, { FC, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import { BeatLoader } from "react-spinners";

interface Props {
  images: string[];
  id: string;
  close: () => void;
  refetch: () => void;
}
const EditImages: FC<Props> = ({ images, id, refetch, close }) => {
  const [selected, setSelected] = useState<string[]>(images);
  const toast = useToast();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const handleRemove = (item: string) => {
    const filtered = selected.filter((where) => where !== item);
    setSelected(filtered);
  };

  const mutation = useMutation({
    mutationFn: uploadImage,
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
  const saveChanges = async () => {
    setIsBusy(true);
    const payload = {
      photos: selected,
    };
    await updateStay(id, payload)
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
      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        {selected.map((item, i) => (
          <div className="w-full relative h-[150px]" key={i}>
            <div onClick={() => handleRemove(item)} className="absolute -top-3 -right-2 cursor-pointer bg-white w-9 h-9 circle place-center">
              <FcCancel className="text-2xl " />
            </div>
            <img src={item} alt="stay" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="relative place-center w-full bg-gray-800 h-[150px] rounded-lg">
          <input
            type="file"
            onChange={handleChange}
            className="w-full h-full absolute top-0 left-0 z-10 opacity-0"
          />
          {!isUpdate? <IoMdAddCircle className="text-3xl text-gray-400" /> : <BeatLoader color="white"/>}
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          title={isBusy?  <BeatLoader color="white"/> : "Save Changes"}
          onClick={saveChanges}
          altClassName="btn-int px-5 py-3 "
        />
      </div>
    </div>
  );
};

export default EditImages;
