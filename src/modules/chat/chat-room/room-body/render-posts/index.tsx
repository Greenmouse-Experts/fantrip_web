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
  handleReload: any;
}
const RenderPostsIndex: FC<Props> = ({ reload, socket, handleReload }) => {
  const { isLoggedIn, token, userId } = useAuth();
  const [page, setPage] = useState<number>(1);
  const { community } = useChat();
  const [prevPosts, setPrevPosts] = useState<PostTyping[]>([]);
  //const [newPosts, setNewPosts] = useState<PostTyping[]>([]);
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
    if (userId !== "") {
      socket.on(`unmutedPostsRetrieved:${userId}`, onListenEvent);
    } else {
      socket.on(`unmutedPostsRetrieved`, onListenEvent);
    }

    // Remove event listener on component unmount
    return () =>
      socket.off(`unmutedPostsRetrieved${userId !== "" ? `:${userId}` : ""}`);
  };

  const convertSlug = (text: string): string => {
    return text.replace(/\s+/g, "-");
  };

  useEffect(() => {
    const payload = {
      page: page,
      ...(isLoggedIn && { token: token }),
      ...(community.name !== "all" && { slug: convertSlug(community.name) }),
    };
    socket.emit("retrieveUnmutedPosts", payload);
  }, [community, reload, page]);

  useEffect(() => {
    getPosts();
  }, [socket]);

  useEffect(() => {
    if (page === 1) {
      setPostsToRender(prevPosts);
    } else {
      const posts = [...postsToRender, ...prevPosts];
      setPostsToRender(posts);
    }
  }, [prevPosts]);

  useEffect(() => {
    const onListenEventPost = (value: any) => {
      console.log(value.data);
      // setNewPosts(value.data);
      // getNewPosts(value.data);
      /*const matchingPost = postsToRender.find(
        (post) => post.user.id === value.data.user.id
      );
      console.log(postsToRender);
      value.data.user = matchingPost?.user;
      const newPosts = [value.data];
      const posts = [...newPosts, ...postsToRender];
      setPostsToRender(posts);*/
    };
    socket.on(`postCreated`, onListenEventPost);

    // Cleanup on unmount
    return () => socket.off(`postCreated`, onListenEventPost);
  }, [socket]);

  /*const getNewPosts = (data: any) => {
    const arrayData = [data];
    const posts = [...arrayData, ...postsToRender];
    setPostsToRender(posts);
  };

  console.log(postsToRender);*/

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
        {postsToRender.length > 11 && (
          <button
            className="flex items-center gap-x-2"
            onClick={() => setPage(page + 1)}
          >
            View More <FaAnglesDown />
          </button>
        )}
      </div>
    </div>
  );
};

export default RenderPostsIndex;
