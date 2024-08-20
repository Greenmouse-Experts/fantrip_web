import { useChat } from "@/hooks/useChat";
import { useUtils } from "@/hooks/useUtils";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Props{
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
}
const ProfileMore:FC<Props> = ({user, openUser}) => {
  const { saveHostInfo } = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();

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

  return (
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
        </MenuList>
      </Menu>
    </div>
  );
};

export default ProfileMore;
