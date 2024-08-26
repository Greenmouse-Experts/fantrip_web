import { FC, useState } from "react";
import useAuth from "@/hooks/authUser";
import { useChat } from "@/hooks/useChat";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import PollInput from "./poll-input";
import Button from "@/components/Button";

interface Props {
  socket: any;
  reload: () => void;
  close: () => void;
}
const CreatePoll: FC<Props> = ({ socket, reload, close }) => {
  const { token } = useAuth();
  const { community } = useChat();
  const [selectedChannel, setSelectedChannel] = useState({
    name: community.communities.length ? community.communities[0].name : "",
    id: community.communities.length ? community.communities[0].id : "",
  });

  //   poll input
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [multiVote, setMultivote] = useState<boolean>(false);

  const onSubmit = () => {
    const payload = {
      token: token,
      message: question,
      file: "",
      community: selectedChannel.id,
      chatType: "poll",
      pollQuestion: {
        question: question,
        options: options,
        expiryDate: expiresAt,
        multipleVote: multiVote,
      },
    };
    socket.emit("createPost", payload);
    reload();
    setTimeout(() => {
      close();
    }, 300);
  };

  return (
    <div className="relative">
      {" "}
      <div className="absolute -top-8 right-0">
        <Menu>
          <MenuButton>
            <div className="flex fs-400 gap-x-2 items-center">
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
                <p className="!text-black z-20">{item.name}</p>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <PollInput
        question={question}
        setQuestion={setQuestion}
        options={options}
        setOption={setOptions}
        multiVote={multiVote}
        setMultiVote={setMultivote}
        expiresAt={expiresAt}
        setExpiresAt={setExpiresAt}
      />
      <div className="mt-6">
        <Button title="Post" type="int" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default CreatePoll;
