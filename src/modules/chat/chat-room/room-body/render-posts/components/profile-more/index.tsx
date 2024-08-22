import ReusableModal from "@/components/ReusableModal";
import useAuth from "@/hooks/authUser";
import { useChat } from "@/hooks/useChat";
import useDialog from "@/hooks/useDialog";
import { useUtils } from "@/hooks/useUtils";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Props {
  user: {
    firstName: string;
    lastName: string;
    nickname: string;
    verifiedAsHost: boolean;
    role: string;
    picture: string;
    isNickname: boolean;
    id: string;
  };
  openUser: () => void;
  id: string;
  socket: any;
}
const ProfileMore: FC<Props> = ({ user, openUser, socket, id }) => {
  const { userId, token } = useAuth();
  const { saveHostInfo } = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();
  const {Dialog, setShowModal:ShowDialog} = useDialog()

  const openChatWithUser = () => {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      verifiedAsHost: user.verifiedAsHost,
      role: user.role,
      picture: user.picture,
    };
    saveHostInfo(payload);
    setShowModal(true);
    close();
  };

  const deleteUserPost = () => {
    const payload = {
      token: token,
      id: id,
    };
    socket.emit("deletePost", payload);
  }

  return (
    <div>
      <div>
      <Menu>
        <MenuButton>
          <div className="flex gap-x-2 items-center">
            <BsThreeDotsVertical size={19} className="text-2xl" />
          </div>
        </MenuButton>
        <MenuList className="text-black !w-[200px]">
          <MenuItem onClick={() => openChatWithUser()}>
            <p className="text-black fs-400">Start Chat</p>
          </MenuItem>
          <MenuItem onClick={openUser}>
            <p className="text-black fs-400">View User Profile</p>
          </MenuItem>
          <MenuItem>
            <p className="text-black fs-400">Report this user</p>
          </MenuItem>
          {user.id === userId && (
            <MenuItem onClick={() => ShowDialog(true)}>
              <p className="text-red-500 fs-400">Delete Post</p>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </div>
          <Dialog title="" size="sm">
            <ReusableModal title="Are you sure you want to delete this post" action={deleteUserPost} actionTitle="Yes, Delete" cancelTitle="No, Close" closeModal={() => ShowModal(false)} isBusy={false}/>
          </Dialog>
    </div>
  );
};

export default ProfileMore;
