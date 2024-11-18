import useAuth from "@/hooks/authUser";
import { useChat } from "@/hooks/useChat";
import { FC, useState } from "react";
import { IoSend } from "react-icons/io5";

interface Props {
  socket: any;
}
const ChatFooterIndex: FC<Props> = ({ socket }) => {
  const { guestInfo } = useChat();
  const { token } = useAuth();
  const [msgInput, setMsgInput] = useState("");
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(guestInfo);

    if (msgInput === "") {
      return;
    }
    socket.emit("sendMessage", {
      chatBuddy: guestInfo.id,
      message: msgInput,
      file: null,
      token: `${token}`,
    });
    setMsgInput("");
  };
  return (
    <div className="p-2 w-full">
      <form
        onSubmit={handleSend}
        className="border border-gray-700 rounded-full flex"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="p-3 dark:bg-darkColorLight pl-4 w-full rounded-l-full outline-none"
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
        />
        <button className="w-16 shrink-0 place-center bg-[#9847fe] rounded-r-full">
          <IoSend className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatFooterIndex;
