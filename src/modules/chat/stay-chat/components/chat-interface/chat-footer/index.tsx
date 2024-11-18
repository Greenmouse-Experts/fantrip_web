import useAuth from "@/hooks/authUser";
import { useChat } from "@/hooks/useChat";
import { FC, useState } from "react";
import { IoSend } from "react-icons/io5";

interface Props {
  socket: any;
  type: "host" | "guest";
  handleReload: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const ChatFooter: FC<Props> = ({ socket, type, handleReload }) => {
  const { hostId, miniId } = useChat();
  const { token } = useAuth();
  const idToRender = type === "guest" ? hostId : miniId;
  const [msgInput, setMsgInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (msgInput === "") {
      return;
    }
    socket.emit("sendMessage", {
      chatBuddy: idToRender,
      message: msgInput,
      file: null,
      token: `${token}`,
    });
    setMsgInput("");
    handleReload(new Date().toISOString());
  };

  return (
    <div className="p-2">
      <form
        onSubmit={handleSend}
        className="border border-gray-500 rounded-full flex"
      >
        <input
          type="text"
          value={msgInput}
          placeholder="Type a message..."
          className="p-2 pl-4 w-full bg-transparent rounded-l-full outline-none"
          onChange={(e) => setMsgInput(e.target.value)}
        />
        <button
          className="w-16 shrink-0 place-center bg-[#9847fe] rounded-r-full text-white"
          onClick={handleSend}
        >
          <IoSend className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
