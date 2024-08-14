import Button from "@/components/Button";
import useAuth from "@/hooks/authUser";
import { FC, useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
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
import { uploadImage } from "@/services/api/routine";
import { BeatLoader } from "react-spinners";

interface Props {
  socket: any;
  setReload: () => void;
}
const IndexDisplayUi: FC<Props> = ({ socket, setReload }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, isLoggedIn, token } = useAuth();
  const { community } = useChat();
  const [showInput, setShowInput] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState({
    name: community.communities.length ? community.communities[0].name : "",
    id: community.communities.length ? community.communities[0].id : "",
  });
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
  const [photo, setPhoto] = useState<File[] | undefined>();

  const handlePost = () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
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
          console.log(payload);
          socket.emit("createPost", payload);
          setIsBusy(false);
          setShowInput(false);
          setReload();
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
      setShowInput(false);
      setReload();
    }
  };

  return (
    <div className="relative" ref={postRef}>
      <div
        onClick={() => setShowInput(!showInput)}
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
        <div className="" onClick={(e) => e.stopPropagation()}>
          {showInput ? (
            <Menu>
              <MenuButton>
                <div className="flex fs-400 gap-x-2 items-center">
                  {selectedChannel.name}{" "}
                  <ChevronDownIcon size={14} className="text-xs" />
                </div>
              </MenuButton>
              <MenuList className="!w-[150px]">
                {community.communities.map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={() =>
                      setSelectedChannel({ id: item.id, name: item.name })
                    }
                  >
                    <p>{item.name}</p>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
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
          className={`border-b border-x border-[#D2D2D2] absolute w-full p-2 bg-white rounded-b-xl`}
        >
          <div>
            <textarea
              placeholder="write here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full p-2 h-24 shadow-sm border-none outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex gap-x-3">
                <BsEmojiSmile className="text-[#8C8C8C] cursor-pointer text-[22px] relative top-[1px]" />
                <div className="relative overflow-hidden">
                  <IoImageOutline className="text-[#8C8C8C] cursor-pointer text-2xl" />
                  <input
                    type="file"
                    accept="image/*, .heic"
                    className="absolute top-0 left-0 opacity-0"
                    onChange={(e: any) => {
                      if (e.target.files) setPhoto(e.target.files);
                    }}
                  />
                </div>
                <IoVideocamOutline className="text-[#8C8C8C] cursor-pointer text-2xl" />
              </div>
            </div>
            <div>
              <Button
                title={isBusy ? <BeatLoader /> : "Add Post"}
                onClick={handlePost}
                altClassName="btn-int px-4 py-[8px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexDisplayUi;
