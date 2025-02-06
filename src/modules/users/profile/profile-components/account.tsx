import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import dayjs from "dayjs";
import { formatPhoneNumber } from "react-phone-number-input";
import Cookies from "js-cookie";
import useAuth from "@/hooks/authUser";
import useDialog from "@/hooks/useDialog";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateProfileForm from "./forms/update-profile-form";
import UpdateAddressForm from "./forms/update-address";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateProfile, viewProfile } from "@/services/api/authApi";
import { uploadImage } from "@/services/api/routine";
import FirstTimeInfo from "./first-time-info";
import SecondTimeInfo from "./second-time-info";
import { RiDeleteBin5Fill } from "react-icons/ri";
import DeleteAccount from "./modal/delete-account";
import EmailUpdate from "./forms/email-update";
import PhoneUpdate from "./forms/phone-update";

const UserAccount = () => {
  const { Dialog: ProfileInfo, setShowModal: ShowProfile } = useDialog();
  const { Dialog: LocationInfo, setShowModal: ShowLocation } = useDialog();
  const { Dialog: EmailInfo, setShowModal: ShowEmail } = useDialog();
  const { Dialog: PhoneInfo, setShowModal: ShowPhone } = useDialog();
  const { Dialog: FirstDialog, setShowModal: ShowFirstDialog } = useDialog();
  const { Dialog: SecondDialog, setShowModal: ShowSecondDialog } = useDialog();
  const { Dialog: Delete, setShowModal: ShowDelete } = useDialog();

  const { firstName, lastName, user, isHost, saveUser } = useAuth();
  const toast = useToast();
  const [isUpdate, setIsUpdate] = useState(false);
  const email = Cookies.get("fantrip_user");


  const { data: profile, } = useQuery({
    queryKey: ["profile"],
    queryFn: () => viewProfile(),
  });

  const kyc = profile && profile.kycInfo.length ? profile.kycInfo[0] : null;

  console.log(kyc)


  useEffect(() => {
    Cookies.set("fantrip_user", `${user.email}`);
    if (user.loginTimes <= 1) {
      if (user.email !== email) {
        ShowFirstDialog(true);
      }
    }
  }, []);

  const handleOpenEdit = () => {
    ShowFirstDialog(false);
    ShowProfile(true);
  };

  const handleNextNavigate = () => {
    ShowProfile(false);
    ShowEmail(false);
    ShowPhone(false);
    if (user.loginTimes <= 1) {
      ShowSecondDialog(true);
    }
  };

  const Update = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["update"],
  });
  // const country = Country.getCountryByCode(`${user.country}`);

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const payload = {
        picture: data.image,
      };
      Update.mutate(payload, {
        onSuccess: () => {
          saveUser({
            ...user,
            image: data.image,
          });
          toast({
            render: () => (
              <div className="text-white w-[240px] text-center fw-600 syne bg-gradient rounded p-3">
                Profile Photo Updated Successfully
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
    const files = e.target.files[0];
    const fd = new FormData();
    fd.append("image", files);
    mutation.mutate(fd);
  };

  const closeDelete = () => {
    ShowDelete(false);
    toast({
      render: () => (
        <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
          Thanks for giving us another chance. Please contact us with any
          feedback.
        </div>
      ),
      position: "top",
    });
  };

  return (
    <div>
      <div>
        <p className="hidden lg:block fw-600 lg:text-lg">My Profile</p>
        <div
          className={`border lg:flex justify-between items-start ${isHost ? "border-gray-600" : "border-[#E8EAED]"
            } rounded-[16px] mt-6`}
        >
          <div className="flex items-center gap-x-4 p-4">
            <div className="relative w-[70px]">
              <img
                src={
                  user.image
                    ? user.image
                    : "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
                }
                alt="profile"
                className="w-[70px] h-[70px] circle object-cover"
              />
              {isHost && (
                <div className="absolute overflow-hidden bg-white top-0 -right-2 cursor-pointer w-6 h-6 circle place-center circle-shadow p-1">
                  {!isUpdate && <GoPencil className="text-sm text-black" />}
                  <input
                    type="file"
                    accept="image/*, .heic"
                    onChange={handleChange}
                    className="opacity-0 absolute object-cover"
                  />
                </div>
              )}
            </div>
            <div>
              <p className="fw-600">{user.name}</p>
              <p className="mt-1 fs-500">{isHost ? "Host" : "Guest"}</p>
            </div>
          </div>
          <div
            className="flex justify-end items-center gap-x-2 m-4 cursor-pointer text-red-600"
            onClick={() => ShowDelete(true)}
          >
            <RiDeleteBin5Fill className="" />
            <p>Delete Account</p>
          </div>
        </div>
        <div
          className={`border ${isHost ? "border-gray-600" : "border-[#E8EAED]"
            } rounded-[16px] mt-6 p-4`}
        >
          <div className="flex justify-between items-center">
            <p className="fw-600 lg:text-lg">Personal Information</p>
            <div
              className="flex gap-x-2 items-center border border-gray-400 px-2 rounded-[14px] text-gray-400 cursor-pointer"
              onClick={() => ShowProfile(true)}
            >
              <p>Edit</p>
              <AiOutlineEdit />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-5 items-center mt-7 pb-2">
            <div>
              <p className="fs-500 text-[#5F5F5F]">First Name</p>
              <p className="fw-500 mt-1">{firstName}</p>
            </div>
            <div>
              <p className="fs-500 text-[#5F5F5F]">Last Name</p>
              <p className="fw-500 mt-1">{lastName}</p>
            </div>
            <div>
              <div className="flex gap-3">
                <p className="fs-500 text-[#5F5F5F]">Email</p>
                {/*<div
                  className="flex gap-x-2 items-center px-2 rounded-[14px] text-gray-400 cursor-pointer"
                  onClick={() => ShowEmail(true)}
                >
                  <AiOutlineEdit />
        </div>*/}
              </div>
              <p className="fw-500 mt-1">{user.email}</p>
            </div>
            <div>
              <div className="flex gap-3">
                <p className="fs-500 text-[#5F5F5F]">Phone</p>
                <div
                  className="flex gap-x-2 items-center px-2 rounded-[14px] text-gray-400 cursor-pointer"
                  onClick={() => ShowPhone(true)}
                >
                  <AiOutlineEdit />
                </div>
              </div>
              <p className="fw-500 mt-1">{formatPhoneNumber(user.phone)}</p>
            </div>
            <div>
              <p className="fs-500 text-[#5F5F5F]">Nickname</p>
              <p className="fw-500 mt-1">{user.nickname}</p>
            </div>
            <div>
              <p className="fs-500 text-[#5F5F5F]">Joined On</p>
              <p className="fw-500 mt-1">
                {dayjs(user.joined).format("DD-MMMM-YYYY")}
              </p>
            </div>
            <div>
              <p className="fs-500 text-[#5F5F5F]">Favourite Team</p>
              <p className="fw-500 mt-1">{user.favTeam}</p>
            </div>
            <div className="lg:col-span-2">
              <p className="fs-500 text-[#5F5F5F]">Bio</p>
              <p className="fw-500 mt-1">{user.bio}</p>
            </div>
          </div>
        </div>
        {isHost && (
          <div
            className={`border ${isHost ? "border-gray-600" : "border-[#E8EAED]"
              } rounded-[16px] mt-6 p-4`}
          >
            <div className="flex justify-between items-center">
              <p className="fw-600 lg:text-lg">Address</p>
              <div
                className="flex gap-x-2 items-center border border-gray-400 px-2 text-gray-400 cursor-pointer rounded-[14px]"
                onClick={() => ShowLocation(true)}
              >
                <p>Edit</p>
                <AiOutlineEdit />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-5 items-center mt-7 pb-2">
              <div>
                <p className="fs-500 text-[#5F5F5F]">Country</p>
                <p className="fw-500 mt-1">{user?.country}</p>
              </div>
              <div>
                <p className="fs-500 text-[#5F5F5F]">Street</p>
                <p className="fw-500 mt-1">{user.street}</p>
              </div>
              <div>
                <p className="fs-500 text-[#5F5F5F]">City</p>
                <p className="fw-500 mt-1">{user.city}</p>
              </div>
              <div>
                <p className="fs-500 text-[#5F5F5F]">Region</p>
                <p className="fw-500 mt-1">{user.state}</p>
              </div>
              <div>
                <p className="fs-500 text-[#5F5F5F]">Postal Code</p>
                <p className="fw-500 mt-1">{user.postalCode}</p>
              </div>
              <div>
                <p className="fs-500 text-[#5F5F5F]">Apartment/Suite number</p>
                <p className="fw-500 mt-1">{user.aptSuitUnit}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <PhoneInfo title="Update Email Address" size="xl">
        <PhoneUpdate close={() => handleNextNavigate()} />
      </PhoneInfo>
      <EmailInfo title="Update Email Address" size="xl">
        <EmailUpdate close={() => handleNextNavigate()} />
      </EmailInfo>
      <ProfileInfo title="Update Profile Information" size="xl">
        <UpdateProfileForm close={() => handleNextNavigate()} />
      </ProfileInfo>
      <LocationInfo title="Update Location Information" size="xl">
        <UpdateAddressForm close={() => ShowLocation(false)} />
      </LocationInfo>
      <FirstDialog title="" size="md" noClose>
        <FirstTimeInfo next={handleOpenEdit} />
      </FirstDialog>
      <SecondDialog title="" size="md">
        <SecondTimeInfo />
      </SecondDialog>
      <Delete title="Delete Account" size="md">
        <DeleteAccount close={closeDelete} />
      </Delete>
    </div>
  );
};

export default UserAccount;
