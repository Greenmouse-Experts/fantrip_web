import BtnContent from "@/components/btn-content";
import useAuth from "@/hooks/authUser";
import useDialog from "@/hooks/useDialog";
import { updateProfile } from "@/services/api/authApi";
import { uploadImage } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FC, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa6";
import { BeatLoader } from "react-spinners";
import SubmissionAlert from "../modal/submission-alert";

interface Props {
  prev: () => void;
}
const SetupVerification: FC<Props> = ({ prev }) => {
  const { kyc, saveKyc, saveUser, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    setLoading(true);
    const files = e.target.files[0];
    const fd = new FormData();
    fd.append("image", files);
    await uploadImage(fd)
      .then((res: any) => {
        saveKyc({
          ...kyc,
          governmentID: res.image,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setLoading(false);
      });
  };
  const { Dialog, setShowModal } = useDialog();
  const mutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["profileUpdate"],
  });
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const handleSubmitKyc = () => {
    const splitName = kyc.fullName.split(" ");

    const payload = {
      firstName: splitName[0],
      lastName: splitName.length > 1 && splitName[1],
      picture: kyc.picture? kyc.picture : user.image,
      roomPicture: kyc.roomPicture,
      facebookUrl: kyc.facebookUrl,
      twitterUrl: kyc.twitterUrl,
      linkedinUrl: kyc.linkedinUrl,
      instagramUrl: kyc.instagramUrl,
      bio: kyc.bio,
      governmentID: kyc.governmentID,
    };
    setIsBusy(true);
    mutation.mutate(payload, {
      onSuccess: (data) => {
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              {data.message}
            </div>
          ),
          position: "top",
        });
        setIsBusy(false);
        sessionStorage.setItem('fantrip_token', data.accessToken)
        saveUser({
          ...user,
          name: kyc.fullName,
          bio: kyc.bio,
          ...(kyc.picture && {image: kyc.picture}),
          account: 'host',
          token: data.accessToken
        })
        setShowModal(true);
      },
      onError: (error: any) => {
        toast({
          title: error.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      },
    });
  };
  return (
    <div>
      <p className="text-xl lg:text-4xl lg:w-9/12">
        Government ID for Verification
      </p>
      <div className="mt-6 flex gap-x-1">
        <BsInfoCircle className="shrink-0 text-sm relative top-[4px]" />
        <p className="fs-400">
          To ensure the safety and trust of our community, we require a
          government-issued ID for verification.
        </p>
      </div>
      <div className="mt-4 flex">
        <div className="flex items-center gap-x-3 mt-3">
          <div className="relative cursor-pointer flex justify-center min-w-[200px] py-2 border border-[#9847FE] rounded-[14px]">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e)}
              className="opacity-0 absolute w-full h-full"
            />
            {loading ? (
              <BeatLoader color="#9847FE" />
            ) : (
              <p className="text-center text-[#9847FE] fw-500 px-5 py-1">
                Upload photos
              </p>
            )}
          </div>
          <div>
            {kyc.governmentID && (
              <img
                src={kyc.governmentID}
                alt="profile-picture"
                className="w-24 h-12 object-cover"
              />
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="w-44 lg:w-96 h-44 place-center rounded-[14px] border border-[#D2D2D2] border-dashed">
          <div className="text-center">
            <FaRegImage className="text-[#D2D2D2] text-xl mx-auto mb-1" />
            <p className="text-[#9847FE] fs-400">Upload more photos</p>
            <p className="fs-500">or drag and drop them here</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-x-1 text-[#E50038]">
        <BsInfoCircle className="text-sm shrink-0 relative top-[4px]" />
        <p className="fs-400 ">
          Please upload a photo or scanned copy of your government-issued ID.
        </p>
      </div>
      <div className="mt-8 flex justify-between">
        <div className="btn-primary cursor-pointer px-6 py-2" onClick={prev}>
          <BtnContent name="Prev" reverse />
        </div>
        <div
          className="btn-primary cursor-pointer px-6 py-2"
          onClick={handleSubmitKyc}
        >
          {isBusy ? (
            <BeatLoader color="white" />
          ) : (
            <BtnContent name="Create Host Profile" />
          )}
        </div>
      </div>
      <Dialog title="" size="lg">
        <SubmissionAlert close={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default SetupVerification;
