import { FC, useEffect, useState } from "react";
import ImagePostRender from "./components/image-post-render";
import TextPostRender from "./components/text-post-render";
import VideoPostRender from "./components/video-post-render";
import { useChat } from "@/hooks/useChat";
import { PostTyping } from "@/lib/contracts/chat";
import { isImageUrl, isVideoUrl } from "@/lib/utils/helper-function";

interface Props {
  reload: string;
  socket: any;
}
const RenderPostsIndex: FC<Props> = ({ reload, socket }) => {
  const { community } = useChat();
  const [prevPosts, setPrevPosts] = useState<PostTyping[]>([]);

  const getPosts = () => {
    const onListenEvent = (value: any) => {
      setPrevPosts(value.data.result);
    };
    socket.on(`unmutedPostsRetrieved`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`unmutedPostsRetrieved`);
  };

  useEffect(() => {
    const payload = {
      page: 1,
      ...community.name !== 'all' && {slug: community.name}
    };
    socket.emit("retrieveUnmutedPosts", payload);
  }, [community, reload]);

  useEffect(() => {
    getPosts();
  }, [socket, reload]);

  
  return (
    <div className="grid mt-4 gap-4">
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
