import { CommentItem } from "@/lib/contracts/chat";
import { FC, useEffect, useState } from "react";
import RenderComment from "./render-comments";

interface Props {
  socket: any;
  id: string;
  count: number;
  token: string;
}
const ViewComments: FC<Props> = ({ socket, id, token, count }) => {
  const [prevComments, setPrevComments] = useState<CommentItem[]>([]);

  const getComments = () => {
    const onListenEvent = (value: any) => {
      setPrevComments(value.data.result);
    };
    socket.on(`publishedCommentsRetrieved`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`publishedCommentsRetrieved`);
  };

  useEffect(() => {
    const payload = {
      token: token,
      postId: id,
      page: 1,
    };
    socket.emit("retrievePublishedComments", payload);
  }, []);

  useEffect(() => {
    getComments();
  }, [socket]);

  return (
    <div className="mt-2 bg-[#EDEDFF] p-3 rounded-lg">
      <div>
        <p className="fs-500 fw-500">{count} Comments</p>
      </div>
      <div className="mt-4 grid gap-2">
        {!!prevComments.length &&
          prevComments.map((item) => (
            <RenderComment socket={socket} comment={item} key={item.id} />
          ))}
      </div>
    </div>
  );
};

export default ViewComments;
