import { FC } from "react";
import ExternalLinks from "./external-links";
import MakePostIndex from "./make-post";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useUtils } from "@/hooks/useUtils";
import useAuth from "@/hooks/authUser";

interface Props {
  socket: any;
  setReload: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const RoomHeaderIndex: FC<Props> = ({ socket, setReload }) => {
  const { setNewActiveModal } = useUtils();
  const { isLoggedIn } = useAuth();

  return (
    <div className="lg:flex items-center gap-x-6">
      <div className="flex gap-x-2 lg:block lg:w-[30%]">
        <button
          type="button"
          onClick={() => setNewActiveModal("sidebar")}
          className="w-[42px] h-[42px] shrink-0 lg:hidden place-center bg-[#EDEDFF] dark:bg-darkColorLight circle"
        >
          <RiArchiveDrawerLine className="text-xl text-[#9847FE]" />
        </button>
        {/* <SearchCompIndex /> */}
        {isLoggedIn && (
          <button
            type="button"
            onClick={() => {
              setNewActiveModal("chatlist");
            }}
            className="w-[42px] h-[42px] shrink-0 lg:hidden place-center bg-[#EDEDFF] dark:bg-darkColorLight circle"
          >
            <IoChatbubblesOutline className="text-xl text-[#9847FE]" />
          </button>
        )}
      </div>
      <div className="lg:w-[45%] mt-4 lg:mt-0">
        <MakePostIndex socket={socket} setReload={setReload} />
      </div>
      <div className="hidden lg:block lg:w-[25%]">
        <ExternalLinks />
      </div>
    </div>
  );
};

export default RoomHeaderIndex;
