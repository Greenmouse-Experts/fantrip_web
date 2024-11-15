import ReusableModal from "@/components/ReusableModal";
import useAuth from "@/hooks/authUser";
import { useChat } from "@/hooks/useChat";
import useDialog from "@/hooks/useDialog";
import { useUtils } from "@/hooks/useUtils";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReportUser from "./report-user";
import SharePost from "./share-post";

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
    favTeam: string;
    bio: string;
  };
  openUser: () => void;
  id: string;
  socket: any;
  reload: () => void;
  type?: string;
  title?: string;
}
const ProfileMore: FC<Props> = ({
  user,
  openUser,
  socket,
  id,
  reload,
  type,
  title,
}) => {
  const { userId, token } = useAuth();
  const { saveHostInfo } = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();
  const { Dialog, setShowModal: ShowDialog } = useDialog();
  const { Dialog: Report, setShowModal: ShowReport } = useDialog();
  const { Dialog: Share, setShowModal: ShowShare } = useDialog();

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

  const deleteUserPost = (payload: { id: string; token: string }) => {
    socket.emit("deletePost", payload);
    ShowDialog(false);
    reload();
  };

  const deleteUserCooment = (payload: { id: string; token: string }) => {
    socket.emit("deleteComment", payload);
    ShowDialog(false);
    reload();
  };

  const handleDelete = () => {
    const payload = {
      token: token || "",
      id: id,
    };
    if (type === "comment") {
      deleteUserCooment(payload);
    } else {
      deleteUserPost(payload);
    }
  };

  return (
    <div>
      <div className="relative">
        <Menu placement="end" direction="rtl">
          <MenuButton>
            <div className="flex gap-x-2 items-center dark:text-white">
              <BsThreeDotsVertical
                size={19}
                className={`${type ? "text-[14px]" : "text-2xl"}`}
              />
            </div>
          </MenuButton>
          <MenuList className="text-black !w-[180px] relative chat-pope">
            {user?.id !== userId && (
              <>
                {userId && (
                  <MenuItem onClick={() => openChatWithUser()}>
                    <p className="text-black fs-400">Start Chat</p>
                  </MenuItem>
                )}
                <MenuItem onClick={openUser}>
                  <p className="text-black fs-400">View User Profile</p>
                </MenuItem>
                {userId && (
                  <MenuItem onClick={() => ShowReport(true)}>
                    <p className="text-black fs-400">Report this user</p>
                  </MenuItem>
                )}
              </>
            )}
            <MenuItem onClick={() => ShowShare(true)}>
              <p className="text-black fs-400">Share Post</p>
            </MenuItem>
            {user?.id === userId && (
              <MenuItem onClick={() => ShowDialog(true)}>
                <p className="!text-red-500 fs-400">
                  {type === "comment" ? "Delete Comment" : "Delete Post"}
                </p>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </div>
      <Dialog title="" size="sm">
        <ReusableModal
          type=""
          title={`Are you sure you want to delete this ${
            type === "comment" ? "comment" : "post"
          }`}
          action={handleDelete}
          actionTitle="Yes, Delete"
          cancelTitle="No, Close"
          closeModal={() => ShowDialog(false)}
          isBusy={false}
        />
      </Dialog>
      <Report title="" size="md">
        <ReportUser
          socket={socket}
          userId={user.id}
          close={() => ShowReport(false)}
        />
      </Report>
      <Share title="Share Post" size="md">
        <SharePost id={id} title={title} userId={user.id} />
      </Share>
    </div>
  );
};

export default ProfileMore;
