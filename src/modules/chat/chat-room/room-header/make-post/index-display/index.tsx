import { FC, useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/authUser";
import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useNavigate } from "react-router-dom";
import { uploadImage, uploadVideo } from "@/services/api/routine";
import DisplayInput from "./display-input";

interface Props {
  socket: any;
  setReload: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const IndexDisplayUi: FC<Props> = ({ socket, setReload }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, isLoggedIn, token } = useAuth();
  const { community } = useChat();
  const [showInput, setShowInput] = useState(false);
  const activeCommunity = community.activeId;
  const [selectedChannel, setSelectedChannel] = useState({
    name: community.communities.length ? community.communities[0].name : "",
    id: community.communities.length ? community.communities[0].id : "",
  });

  useEffect(() => {
    if (activeCommunity.length && community.name !== "all") {
      setSelectedChannel({
        name: community.name,
        id: activeCommunity,
      });
    }
  }, [community]);

  const postRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (postRef.current && !postRef.current.contains(event.target as Node)) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // input for post
  const [isBusy, setIsBusy] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [photo, setPhoto] = useState<File[] | undefined>([]);
  const [video, setVideo] = useState<File[] | undefined>([]);

  // handle show input
  const handleShowInput = () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    } else {
      setShowInput(!showInput);
    }
  };

  const handlePost = () => {
    setIsBusy(true);
    const payload = {
      token: token,
      message: textInput,
      file: null,
      community: selectedChannel.id,
    };
    if (photo?.length) {
      const files = photo[0];
      const fd = new FormData();
      fd.append("image", files);
      uploadImage(fd)
        .then((res) => {
          payload.file = res.image;
          socket.emit("createPost", payload);
          setIsBusy(false);
          setTextInput("");
          setPhoto([]);
          setShowInput(false);
          setReload(new Date().toISOString());
        })
        .catch((error: any) => {
          toast({
            title: error.response.data.message,
            isClosable: true,
            position: "top",
            status: "error",
          });
          setIsBusy(false);
        });
    } else if (video?.length) {
      const files = video[0];
      const fd = new FormData();
      fd.append("video", files);
      uploadVideo(fd)
        .then((res) => {
          payload.file = res.video;
          socket.emit("createPost", payload);
          setIsBusy(false);
          setTextInput("");
          setVideo([]);
          setShowInput(false);
          setReload(new Date().toISOString());
        })
        .catch((error: any) => {
          toast({
            title: error.response.data.message,
            isClosable: true,
            position: "top",
            status: "error",
          });
          setIsBusy(false);
        });
    } else {
      socket.emit("createPost", payload);
      setIsBusy(false);
      setTextInput("");
      setPhoto([]);
      setShowInput(false);
      setReload(new Date().toISOString());
    }
  };

  return (
    <div className="relative" ref={postRef}>
      <div
        onClick={() => handleShowInput()}
        className={`border border-[#D2D2D2] flex items-center justify-between cursor-pointer p-[2px] pl-1 pr-5 ${
          showInput
            ? "rounded-t-[18px] pt-[3px] border-b-white"
            : "rounded-full"
        }`}
      >
        <div className="flex gap-x-6 items-center">
          <div className="w-[32px] h-[32px] bg-gradient p-[1px] circle">
            <img
              src={
                user.image ||
                "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
              }
              alt="profile"
              className="w-full h-full circle object-cover"
            />
          </div>
          <p className="fw-500">Make a Post!!</p>
        </div>
        <div className="">
          {showInput ? (
            ""
          ) : (
            <div className="flex gap-x-3">
              <IoImageOutline className="text-[#8C8C8C] text-lg" />
              <IoVideocamOutline className="text-[#8C8C8C] text-lg" />
            </div>
          )}
        </div>
      </div>
      {showInput && (
        <div
          className={`border-b border-x border-[#D2D2D2] z-[1] absolute w-full p-2 bg-white dark:bg-darkColor rounded-b-xl`}
        >
          <div className="absolute -top-7 right-5">
            <Menu>
              <MenuButton>
                <div className="flex fs-400 gap-x-2 dark:text-white items-center">
                  {selectedChannel.name}{" "}
                  <ChevronDownIcon size={14} className="text-xs" />
                </div>
              </MenuButton>
              <MenuList className="!w-[150px] !z-20">
                {community.communities.map((item) => (
                  <MenuItem
                    key={item.id}
                    className="!z-20"
                    onClick={() =>
                      setSelectedChannel({ id: item.id, name: item.name })
                    }
                  >
                    <p className="text-black z-20">{item.name}</p>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>
          <DisplayInput
            isBusy={isBusy}
            text={textInput}
            setText={setTextInput}
            photos={photo || []}
            setImage={setPhoto}
            video={video || []}
            setVideo={setVideo}
            handlePost={handlePost}
          />
        </div>
      )}
    </div>
  );
};

export default IndexDisplayUi;
