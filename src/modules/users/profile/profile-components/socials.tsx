import useDialog from "@/hooks/useDialog";
import { AiOutlineEdit } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { viewProfile } from "@/services/api/authApi";
import PyramidSpin from "@/components/loaders/pyramid-spin";
import UpdateSocialForm from "./forms/update-socials";
import useAuth from "@/hooks/authUser";


const UserSocials = () => {
  const { Dialog: Social, setShowModal: ShowSocial } = useDialog();
  const { isLoading: isGettingProfile, data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => viewProfile(),
  });
  const { isHost } = useAuth();
  console.log(profile);

  if (isGettingProfile) return <PyramidSpin size={1.8} />;
  return (
    <div>
      <div>
        <p className="hidden lg:block fw-600 lg:text-lg">My Profile</p>

        <div
          className={`border ${
            isHost ? "border-gray-600" : "border-[#E8EAED]"
          } rounded-[16px] mt-6 p-4`}
        >
          <div className="flex justify-between items-center">
            <p className="fw-600 lg:text-lg">Socials</p>
            <div
              className="flex gap-x-2 items-center border border-gray-400 px-2 text-gray-400 cursor-pointer rounded-[14px]"
              onClick={() => ShowSocial(true)}
            >
              <p>Edit</p>
              <AiOutlineEdit />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-5 items-center mt-7 pb-2">
            <div>
              <p className="fs-500 text-[#5F5F5F]">FaceBook</p>
              <a className="fw-500 mt-1" href={`${profile.facebookUrl}`}>
                {profile.facebookUrl}
              </a>
            </div>
            <div>
              <p className="fs-500 text-[#5F5F5F]">Twitter</p>
              <a className="fw-500 mt-1" href={`${profile.twitterUrl}`}>
                {profile.twitterUrl}
              </a>
            </div>
            <div>
              <p className="fs-500 text-[#5F5F5F]">LinkedIn</p>
              <a className="fw-500 mt-1" href={`${profile.linkedinUrl}`}>
                {profile.linkedinUrl}
              </a>
            </div>
            <div>
              <p className="fs-500 text-[#5F5F5F]">Instagram</p>
              <a className="fw-500 mt-1" href={`${profile.instagramUrl}`}>
                {profile.instagramUrl}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Social title="Update Social Information" size="xl">
        <UpdateSocialForm close={() => ShowSocial(false)} item={profile} />
      </Social>
    </div>
  );
};

export default UserSocials;
