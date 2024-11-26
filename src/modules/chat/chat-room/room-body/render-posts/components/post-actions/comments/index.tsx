import { CommentItem } from "@/lib/contracts/chat";
import { FC, useEffect, useState } from "react";
import RenderComment from "./render-comments";
import CommentsLoading from "@/components/shimmers/comments";

interface Props {
  socket: any;
  id: string;
  count: number;
  token: string;
  minusComment: (minus?: boolean) => void;
}

const ViewComments: FC<Props> = ({
  socket,
  id,
  token,
  count,
  minusComment,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [prevComments, setPrevComments] = useState<CommentItem[]>([]);

  const getComments = () => {
    setIsLoading(true);
    const payload = {
      token: token,
      postId: id, // Ensure we're requesting comments for the current post
      page: 1,
    };

    // Emit the event to retrieve comments
    socket.emit("retrievePublishedComments", payload);

    const onListenEvent = (value: any) => {
      const postIds = [
        ...new Set(
          value.data.result.map((comment: { postId: any }) => comment.postId)
        ),
      ];

      if (postIds[0] === id) {
        // Ensure the postId matches this post's id
        setPrevComments(value.data.result || []);
      }
      setIsLoading(false);
    };

    socket.on("publishedCommentsRetrieved", onListenEvent);

    // Clean up event listener on component unmount
    return () => socket.off("publishedCommentsRetrieved", onListenEvent);
  };

  useEffect(() => {
    // Initial fetch
    getComments();

    // Listen for real-time updates
    const onNewComment = (value: any) => {
      if (value?.data?.postId === id) {
        const newData = [value.data];
        // Only update if the postId matches
        setPrevComments((prev) => [...prev, ...newData]);
        setIsLoading(false);
      }
    };

    socket.on("commentCreated", onNewComment);

    // Clean up event listeners
    return () => socket.off("commentCreated", onNewComment);
  }, [socket, count, id]); // Add id as a dependency

  const handleReload = () => {
    minusComment(true);
    getComments(); // Reload comments
  };

  return (
    <>
      {count > 0 && (
        <div className="mt-2 bg-[#EDEDFF] dark:bg-darkColorLight p-3 rounded-lg">
          <div>
            <p className="fs-500 fw-500">
              {prevComments.length} Comment{prevComments.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="mt-4 grid gap-2">
            {isLoading && <CommentsLoading />}
            {!!prevComments.length &&
              prevComments.map((item) => (
                <RenderComment
                  socket={socket}
                  comment={item}
                  key={item.id}
                  reload={handleReload}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewComments;
