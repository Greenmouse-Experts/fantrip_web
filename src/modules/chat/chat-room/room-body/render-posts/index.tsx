import { FC, useEffect, useState } from "react";
import ImagePostRender from "./components/image-post-render";
import TextPostRender from "./components/text-post-render";
import VideoPostRender from "./components/video-post-render";
import { useChat } from "@/hooks/useChat";
import { PostTyping } from "@/lib/contracts/chat";
import { isImageUrl, isVideoUrl } from "@/lib/utils/helper-function";
import useAuth from "@/hooks/authUser";
import PostLoader from "@/components/shimmers/chat-load";
import { FaAnglesDown } from "react-icons/fa6";

interface Props {
  reload: string;
  socket: any;
  handleReload: () => void;
}
const RenderPostsIndex: FC<Props> = ({ reload, socket, handleReload }) => {
  const { isLoggedIn, token } = useAuth();
  const [page, setPage] = useState<number>(1);
  const { community } = useChat();
  const [prevPosts, setPrevPosts] = useState<PostTyping[]>([]);
  const [postsToRender, setPostsToRender] = useState<PostTyping[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const getPosts = () => {
    const onListenEvent = (value: any) => {
      setPrevPosts(value.data.result);
      setIsLoading(false);
    };
    socket.on(`unmutedPostsRetrieved`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`unmutedPostsRetrieved`);
  };

  useEffect(() => {
    const payload = {
      page: page,
      ...(isLoggedIn && { token: token }),
      ...(community.name !== "all" && { slug: community.name }),
    };
    socket.emit("retrieveUnmutedPosts", payload);
  }, [community, reload, page]);

  useEffect(() => {
    getPosts();
  }, [socket, reload]);

  useEffect(() => {
    if (page === 1) {
      setPostsToRender(prevPosts);
    } else {
      const posts = [...postsToRender, ...prevPosts];
      setPostsToRender(posts);
    }
  }, [prevPosts]);

  return (
    <div className="grid mt-4 gap-4">
      {isLoading && <PostLoader count={3} />}
      {postsToRender.map((item, i) => {
        if (item.file === null)
          return (
            <TextPostRender
              item={item}
              key={i}
              socket={socket}
              handleReload={handleReload}
            />
          );
        if (isImageUrl(item.file))
          return (
            <ImagePostRender
              item={item}
              key={i}
              socket={socket}
              handleReload={handleReload}
            />
          );
        if (isVideoUrl(item.file))
          return (
            <VideoPostRender
              item={item}
              key={i}
              socket={socket}
              handleReload={handleReload}
            />
          );
      })}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-x-2"
          onClick={() => setPage(page + 1)}
        >
          View More <FaAnglesDown />
        </button>
      </div>
    </div>
  );
};

export default RenderPostsIndex;
