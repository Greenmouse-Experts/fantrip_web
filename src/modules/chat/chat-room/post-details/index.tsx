import PostLoader from "@/components/shimmers/chat-load";
import useAuth from "@/hooks/authUser";
import { PostTyping } from "@/lib/contracts/chat";
import ScrollToTop from "@/lib/utils/scrollTop";
import { FC, useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import SinglePost from "./single-post";

interface Props {
  id: any;
  socket: any;
  userId: string;
}
const PostDetails: FC<Props> = ({ socket, id, userId }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<PostTyping>();
  const [reload, setRelaod] = useState<string>();

  const getPost = () => {
    const onListenEvent = (value: any) => {
      setPost(value.data);
      setIsLoading(false);
    };
    socket.on(`postRetrieved:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    //  return () => socket.off("postRetrieved");
  };

  useEffect(() => {
    const payload = {
      token: token,
      id: id,
    };
    socket.emit("retrievePost", payload);
  }, []);

  useEffect(() => {
    getPost();
  }, [socket, reload]);

  const handleReload = () => {
    setRelaod(new Date().toISOString);
  };

  return (
    <div>
      <ScrollToTop />
      {/* return button */}
      <div className="flex mt-2">
        <div
          className="bg-[#EDEDFF] dark:bg-gray-800 dark:text-white rounded-full flex items-center shadow-lg px-3 py-1 hover:fw-600 cursor-pointer gap-x-2"
          onClick={() => navigate("/chat-room")}
        >
          <TbArrowBackUp className="fs-400" />
          <span className="fs-400">Return</span>
        </div>
      </div>
      <div className="mt-4">
        {isLoading && <PostLoader count={1} />}
        {post && (
          <SinglePost item={post} socket={socket} handleReload={handleReload} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;
