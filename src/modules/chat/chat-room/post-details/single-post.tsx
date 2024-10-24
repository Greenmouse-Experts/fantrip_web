import { PostTyping } from "@/lib/contracts/chat";
import { FC } from "react";
import TextPostRender from "../room-body/render-posts/components/text-post-render";
import { isImageUrl, isVideoUrl } from "@/lib/utils/helper-function";
import ImagePostRender from "../room-body/render-posts/components/image-post-render";
import VideoPostRender from "../room-body/render-posts/components/video-post-render";

interface Props {
  item: PostTyping;
  socket: any;
  handleReload: () => void;
}
const SinglePost: FC<Props> = ({ item, socket, handleReload }) => {
  if (item.file === null)
    return (
      <TextPostRender
        item={item}
        key={0}
        socket={socket}
        handleReload={handleReload}
      />
    );
  else if (isImageUrl(item.file))
    return (
      <ImagePostRender
        item={item}
        key={0}
        socket={socket}
        handleReload={handleReload}
      />
    );
  else if (isVideoUrl(item.file))
    return (
      <VideoPostRender
        item={item}
        key={0}
        socket={socket}
        handleReload={handleReload}
      />
    );
  else return <></>;
};

export default SinglePost;
