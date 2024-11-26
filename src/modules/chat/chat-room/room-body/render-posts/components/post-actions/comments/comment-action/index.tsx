import useAuth from "@/hooks/authUser";
import { FC, useEffect, useState } from "react";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";

interface Props {
  type: string;
  like: number;
  dislike: number;
  comment: number;
  id: string;
  reaction: any;
  socket: any;
}
const CommentAction: FC<Props> = ({
  type,
  like,
  dislike,
  comment,
  reaction,
  id,
  socket,
}) => {
  const { token } = useAuth();
  const formatReaction = {
    upvote: "like",
    downvote: "dislike",
  };

  const [statCount, setStatCount] = useState({
    initLike: like,
    initDislike: dislike,
    initComment: comment,
  });
  //   const [showComment, setShowComment] = useState(false);
  const [likeAction, setLikeAction] = useState(
    reaction ? formatReaction[reaction as keyof typeof formatReaction] : ""
  );

  const handleLike = () => {
    if (likeAction === "like") {
      setLikeAction("");
      return;
    }
    setLikeAction("like");
  };

  const handleDisike = () => {
    if (likeAction === "dislike") {
      setLikeAction("");
      return;
    }
    setLikeAction("dislike");
  };

  const handleAction = (type: string) => {
    const payload = {
      token: token,
      reaction: type, // options: upvote, downvote
      reactionFor: "comment", // options: post, comment, reply, poll, quiz
      concernId: id,
    };
    socket.emit("react", payload);
    if (type === "upvote") {
      handleLike();
    } else if (type === "downvote") {
      handleDisike();
    } else {
    }
  };

  useEffect(() => {
    setStatCount({
      initLike: like,
      initDislike: dislike,
      initComment: comment,
    });
    setLikeAction(
      reaction ? formatReaction[reaction as keyof typeof formatReaction] : ""
    );
  }, [id]);

  const getReactions = () => {
    const onListenEvent = (value: any) => {
      if (id === value.data.commentId) {
        setStatCount({
          ...statCount,
          initLike: value.data.full.upvotes,
          initDislike: value.data.full.downvotes,
        });
      }
    };
    socket.on(`reacted`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`reacted`);
  };

  useEffect(() => {
    getReactions();
  }, [id]);

  return (
    <div className="flex justify-end">
      <div className="flex justify-between items-center gap-x-3">
        <button
          type="button"
          className={`${
            type === "text"
              ? `${
                  likeAction === "like"
                    ? "bg-green-600 text-white"
                    : "bg-white "
                }`
              : `${
                  likeAction === "like"
                    ? "bg-green-600 text-white"
                    : "bg-[#EDEDFF] dark:bg-darkColor"
                }`
          } flex items-center gap-x-1 rounded-full px-2 py-[2px]`}
          onClick={() => handleAction("upvote")}
        >
          <TbArrowBigUp size={13} className="dark:text-white" />
          <p className="fs-400 ">{statCount.initLike}</p>
        </button>
        <button
          type="button"
          className={`${
            type === "text"
              ? `${
                  likeAction === "dislike"
                    ? "bg-red-600 text-white"
                    : "bg-white "
                }`
              : `${
                  likeAction === "dislike"
                    ? "bg-red-600 text-white"
                    : "bg-[#EDEDFF] dark:bg-darkColor"
                }`
          } flex items-center gap-x-1 rounded-full px-2 py-[2px]`}
          onClick={() => handleAction("downvote")}
        >
          <TbArrowBigDown size={14} className="dark:text-white" />
          <p className="fs-400 ">{statCount.initDislike}</p>
        </button>
      </div>
    </div>
  );
};

export default CommentAction;
