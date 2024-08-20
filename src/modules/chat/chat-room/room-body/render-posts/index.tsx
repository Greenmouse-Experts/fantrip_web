import { FC, useEffect, useState } from "react";
import ImagePostRender from "./components/image-post-render";
import TextPostRender from "./components/text-post-render";
import VideoPostRender from "./components/video-post-render";
import { useChat } from "@/hooks/useChat";
import { PostTyping } from "@/lib/contracts/chat";
import { isImageUrl, isVideoUrl } from "@/lib/utils/helper-function";
import useAuth from "@/hooks/authUser";
import PostLoader from "@/components/shimmers/chat-load";

interface Props {
  reload: string;
  socket: any;
}
const RenderPostsIndex: FC<Props> = ({ reload, socket }) => {
  const {isLoggedIn, token} = useAuth()
  const { community } = useChat();
  const [prevPosts, setPrevPosts] = useState<PostTyping[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getPosts = () => {
    const onListenEvent = (value: any) => {
      setPrevPosts(value.data.result);
      setIsLoading(false)
    };
    socket.on(`unmutedPostsRetrieved`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`unmutedPostsRetrieved`);
  };

  useEffect(() => {
    const payload = {
      page: 1,
      ...isLoggedIn && {token: token},
      ...community.name !== 'all' && {slug: community.name}
    };
    socket.emit("retrieveUnmutedPosts", payload);
    setIsLoading(true)
  }, [community, reload]);

  useEffect(() => {
    getPosts();
  }, [socket, reload]);
  
  return (
    <div className="grid mt-4 gap-4">
      {isLoading && <PostLoader count={3}/>}
      {prevPosts.map((item, i) => {
        if (item.file === null) return <TextPostRender item={item} key={i} socket={socket}/>;
        if (isImageUrl(item.file))
          return <ImagePostRender item={item} key={i} socket={socket} />;
        if (isVideoUrl(item.file))
          return <VideoPostRender item={item} key={i} socket={socket} />;
      })}
    </div>
  );
};

export default RenderPostsIndex;
