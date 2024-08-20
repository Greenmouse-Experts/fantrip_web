import useAuth from "@/hooks/authUser";
import { FC, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCameraOutline, IoSend } from "react-icons/io5";

interface Props {
  socket: any;
  id: string;
}
const CommentInput: FC<Props> = ({ socket, id }) => {
  const {token} = useAuth()
  const [msgInput, setMsgInput] = useState('')
  const handleAddComment = () => {
    const payload = {
      token: token,
      message: msgInput,
      postId: id,
    };
    socket.emit("createComment", payload);
    setMsgInput('')
  };

  return (
    <div className="bg-[#EFEFEF] flex items-center w-full rounded-full overflow-hidden">
      <input
        type="textarea"
        value={msgInput}
        className={`w-full border-none outline-none bg-transparent p-2 pl-4`}
        placeholder="Leave a comment..."
        onChange={(e) => setMsgInput(e.target.value)}
      />
      <div className="flex items-center gap-x-2 justify-end pr-2 shrink-0">
        <BsEmojiSmile className="text-[#8C8C8C] fs-500 cursor-pointer" />
        <IoCameraOutline className="text-[#8C8C8C] text-xl cursor-pointer" />
        {!!msgInput.length && <IoSend onClick={handleAddComment} className="text-prima shrink-0 ml-2 text-2xl cursor-pointer"/>}
      </div>
    </div>
  );
};

export default CommentInput;
