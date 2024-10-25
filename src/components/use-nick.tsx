import useAuth from "@/hooks/authUser";
import { updateProfile } from "@/services/api/authApi";
import { Switch, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";

interface Props {
  reload: () => void;
}
const UseNickname: FC<Props> = ({ reload }) => {
  const { user, saveUser, isLoggedIn } = useAuth();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["profileUpdate"],
  });
  const onSubmit = async () => {
    const payload = {
      isNickname: !user.isNickname,
    };
    mutation.mutate(payload, {
      onSuccess: () => {
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              changes updated
            </div>
          ),
          position: "top",
        });
        saveUser({
          ...user,
          isNickname: payload.isNickname,
        });
        reload();
      },
      onError: (error: any) => {
        toast({
          title: error.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
      },
    });
  };
  return (
    <div>
      {isLoggedIn && (
        <div className="flex gap-x-6 items-center lg:mt-4">
          <label className="fw-500 ">Use Nickname</label>
          <div className="">
            <Switch
              isChecked={user.isNickname}
              colorScheme="pink"
              onChange={onSubmit}
              size={"md"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UseNickname;
