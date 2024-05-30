import useAuth from "@/hooks/authUser";
import useDialog from "@/hooks/useDialog";
import LogoutModal from "@/modules/auth/modals/logout-modal";
import { updateProfile } from "@/services/api/authApi";
import { uploadImage } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RxLink2 } from "react-icons/rx";

interface Props {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}
const SidebarLayout: FC<Props> = ({ setActive, active }) => {
  const { user, saveUser } = useAuth();
  const { Dialog, setShowModal } = useDialog();
  const toast = useToast();
  const [isUpdate, setIsUpdate] = useState(false);
  const Update = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["update"],
  });
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
  return (
    <div className="py-12">
      <div>
        <div className="w-36 relative mx-auto">
          <img
            src={user.image? user.image : "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712921717/fantrip/Ellipse_56_frahhh.png"}
            alt="profile"
            className="w-36 circle h-36 object-cover"
          />
          <div className="absolute overflow-hidden bg-white top-0 right-2 cursor-pointer w-8 h-8 circle place-center circle-shadow p-1">
            {!isUpdate && <GoPencil className="text-xl" />}
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="opacity-0 absolute object-cover"
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xl fw-600 text-center">{user.name}</p>
          <div className="flex justify-center">
            <p className="mt-2 bg-green-100 text-green-700 fw-500 px-4 py-1">
              Active
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4">
          <div
            className={`px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] flex justify-between items-center hover:border hover:border-[#9847FE] ${
              active === 1 && "border border-[#9847FE]"
            }`}
            onClick={() => setActive(1)}
          >
            <p>Account</p>
            <FaUserCircle className="text-xl" />
          </div>
          <div
            className={`px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] flex justify-between items-center hover:border hover:border-[#9847FE] ${
              active === 2 && "border border-[#9847FE]"
            }`}
            onClick={() => setActive(2)}
          >
            <p>Security</p>
            <BsGear className="text-xl" />
          </div>
          <div
            className={`px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] flex justify-between items-center hover:border hover:border-[#9847FE] ${
              active === 3 && "border border-[#9847FE]"
            }`}
            onClick={() => setActive(3)}
          >
            <p>Referral</p>
            <RxLink2 className="text-xl" />
          </div>
          <div className="px-4 cursor-pointer rounded-[10px] py-3 bg-[#F9FAFC] flex justify-between items-center hover:border hover:border-[#9847FE] text-red-600" onClick={() => setShowModal(true)}>
            <p>Logout</p>
            <BiLogOut className="text-xl" />
          </div>
        </div>
      </div>
      <Dialog title="" size="sm">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default SidebarLayout;
