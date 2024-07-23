import BtnContent from "@/components/btn-content";
import useAuth from "@/hooks/authUser";
import { uploadImage } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { BeatLoader } from "react-spinners";

interface Props {
  next: () => void;
  prev: () => void;
}
const SetupPhotos: FC<Props> = ({ next, prev }) => {
  const { kyc, saveKyc, user } = useAuth();
  const toast = useToast()
  const [profileLoading, setProfileLoading] = useState(false);
  const [roomLoading, setRoomLoading] = useState(false);
  const handleUploadProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    setProfileLoading(true);
    const files = e.target.files[0];
    const fd = new FormData();
    fd.append("image", files);
    await uploadImage(fd)
      .then((res: any) => {
        saveKyc({
          ...kyc,
          picture: res.image,
        });
        setProfileLoading(false);
      })
      .catch(() => {
        setProfileLoading(false);
      });
  };
  const handleUploadRoom = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    setRoomLoading(true);
    const files = e.target.files[0];
    const fd = new FormData();
    fd.append("image", files);
    await uploadImage(fd)
      .then((res: any) => {
        saveKyc({
          ...kyc,
          roomPicture: res.image,
        });
        setRoomLoading(false);
      })
      .catch(() => {
        setRoomLoading(false);
      });
  };
  const handleNext = () => {
    if(!user.image && !kyc.picture){
      toast({
        render: () => (
          <div className="text-white w-[290px] text-center fw-600 syne bg-[#9847FE] rounded p-3">
            Please input a profile picture
          </div>
        ),
        position: "top",
      });
      return;
    }
    next()
  }
  return (
    <div>
      <p className="text-xl lg:text-4xl lg:w-9/12">
        Upload Your Profile Picture and a Picture of the Room
      </p>
      <div className="mt-6 flex gap-x-1">
        <BsInfoCircle className="shrink-0 text-sm relative top-[4px]" />
        <p className="fs-400">
          Use a profile picture of yourself in your favorite team's jersey or at
          a stadium.
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-x-2">
          <span className="w-6 h-6 circle place-center border border-gray-400 fs-500 fw-500">
            1
          </span>
          <p className="fw-500">Profile Picture (max of 1mb)</p>
        </div>
        <div className="flex items-center gap-x-3 mt-3">
          <div className="w-44 flex justify-center relative cursor-pointer py-2 border border-[#9847FE] rounded-[14px]">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadProfile(e)}
              className="opacity-0 absolute w-full h-full"
            />
            {profileLoading ? (
              <BeatLoader color="#9847FE" />
            ) : (
              <p className="text-center text-[#9847FE] fw-500 px-5 py-1">
                Upload photos
              </p>
            )}
          </div>
          <div>
            {kyc.picture ? (
              <img
                src={kyc.picture}
                alt="profile-picture"
                className="w-24 h-12 object-cover"
              />
            ) : user.image ? (
              <img
                src={user.image}
                alt="profile-picture"
                className="w-24 h-12 object-cover"
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-7">
        <div className="flex items-center gap-x-2">
          <span className="w-6 h-6 circle place-center border border-gray-400 fs-500 fw-500">
            2
          </span>
          <p className="fw-500">Room Picture (max of 1mb)</p>
        </div>
        <div className="flex mt-3 gap-x-3">
          <div className="w-44 flex justify-center relative cursor-pointer py-2 border border-[#9847FE] rounded-[14px]">
            <input
              type="file"
              onChange={(e) => handleUploadRoom(e)}
              className="opacity-0 absolute w-full h-full"
            />
            {roomLoading ? (
              <BeatLoader color="#9847FE" />
            ) : (
              <p className="text-center text-[#9847FE] fw-500 px-5 py-1">
                Upload photos
              </p>
            )}
          </div>
          <div>
            {kyc.roomPicture && (
              <img
                src={kyc.roomPicture}
                alt="room-picture"
                className="w-24 h-12 object-cover"
              />
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <div className="btn-primary cursor-pointer px-6 py-2" onClick={prev}>
          <BtnContent name="Prev" reverse />
        </div>
        <div className="btn-primary cursor-pointer px-6 py-2" onClick={handleNext}>
          <BtnContent name="Upload & continue" />
        </div>
      </div>
    </div>
  );
};

export default SetupPhotos;
