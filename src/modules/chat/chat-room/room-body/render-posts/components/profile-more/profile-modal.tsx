import AltName from "@/components/alt-name";
import { useChat } from "@/hooks/useChat";
import { useUtils } from "@/hooks/useUtils";
import { FC } from "react";
import { BsChatDots } from "react-icons/bs";

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
  close: () => void;
}
const ProfileModal: FC<Props> = ({ user, close }) => {
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
      <div className="lg:m-2 p-4 meet-drop rounded-[23px] bg-white">
        <div className="flex">
          <div className="w-5/12 text-center">
            <div className="w-7/12 mx-auto aspect-square rounded-full bg-gray-400">
              {user?.picture && (
                <img
                  src={user?.picture}
                  alt="profile"
                  className="w-full h-full object-cover circle"
                />
              )}
            </div>
            <p className="fw-600  lg:text-xl my-1">
              <AltName
                name={`${user?.firstName} ${user?.lastName}`}
                nick={user.nickname}
                useNick={user.isNickname}
              />
            </p>
            <p className="fw-600 text-orange-600 fs-500">Manchester United</p>
          </div>
          <div className="w-7/12 flex justify-center">
            <div className="w-10/12 grid divide-y-2">
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus saepe consectetur odio voluptatum. Eaque neque nihil
                  reprehenderit, quis.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <button
            onClick={() => openChatWithUser()}
            className="flex gap-x-2 p-2 fs-400 md:fs-600 items-center fw-500"
          >
            <BsChatDots />
            Chat with{" "}
            <AltName
              name={`${user?.firstName} ${user?.lastName}`}
              nick={user.nickname}
              useNick={user.isNickname}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
