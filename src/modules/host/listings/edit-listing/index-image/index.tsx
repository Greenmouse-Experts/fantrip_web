import { useState } from "react";
import useAuth from "@/hooks/authUser";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/api/authApi";
import { uploadImage } from "@/services/api/routine";
import { BeatLoader } from "react-spinners";

const IndexStayImage = () => {
  const { user, saveUser } = useAuth();
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const Update = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["update"],
  });
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const payload = {
        roomPicture: data.image,
      };
      Update.mutate(payload, {
        onSuccess: () => {
          saveUser({
            ...user,
            roomPicture: data.image,
          });
          toast({
            render: () => (
              <div className="text-white w-[240px] text-center fw-600 syne bg-gradient rounded p-3">
                Index stay image updated successfully
              </div>
            ),
            position: "top",
          });
          setIsUpdating(false);
        },
        onError: (error: any) => {
          toast({
            title: error.response.data.message,
            isClosable: true,
            position: "top",
            status: "error",
          });
          setIsUpdating(false);
        },
      });
    },
    onError: (error: any) => {
      toast({
        title: error.response.data.message,
        isClosable: true,
        position: "top",
        status: "error",
      });
      setIsUpdating(false);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    setIsUpdating(true);
    const files = e.target.files[0];
    const fd = new FormData();
    fd.append("image", files);
    mutation.mutate(fd);
  };
  return (
    <div>
      <p className="mb-4 fw-600 text-lg">Profile card stay image</p>
      <div className="mt-3 grid lg:grid-cols-4">
        <div className="relative">
          <img
            src={user.roomPicture}
            alt="room-picture"
            className="w-full h-36 rounded-lg object-cover"
          />
        </div>
        <div>
          <div className="w-44 flex justify-center relative cursor-pointer py-2 border border-[#9847FE] rounded-[14px]">
            <input
              type="file"
              accept="image/*, .heic"
              multiple
              onChange={(e) => handleChange(e)}
              className="opacity-0 absolute w-full h-full"
            />
            <p className="text-center text-[#9847FE] fw-500 px-5 py-1">
              {isUpdating? <BeatLoader/> : "Upload photo"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexStayImage;
