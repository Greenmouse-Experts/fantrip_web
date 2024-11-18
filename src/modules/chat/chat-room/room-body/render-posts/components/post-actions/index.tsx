import { FC, useEffect, useState } from "react";
import { GoComment } from "react-icons/go";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import ViewComments from "./comments";
import useAuth from "@/hooks/authUser";
import { useNavigate } from "react-router-dom";

interface Props {
  type: string;
  like: number;
  dislike: number;
  comment: number;
  id: string;
  socket: any;
  reaction: string | undefined;
  minusComment: (minus?: boolean) => void;
}
const PostActions: FC<Props> = ({
  type,
  like,
  dislike,
  comment,
  id,
  socket,
  reaction,
  minusComment,
}) => {
  const navigate = useNavigate();
  const { token, isLoggedIn } = useAuth();

  const formatReaction = {
    upvote: "like",
    downvote: "dislike",
  };

  const [statCount, setStatCount] = useState({
    initLike: like,
    initDislike: dislike,
    initComment: comment,
  });

  const [showComment, setShowComment] = useState("");
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
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
    const payload = {
      token: token,
      reaction: type, // options: upvote, downvote
      reactionFor: "post", // options: post, comment, reply, poll, quiz
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

  const handleShowComment = (id: string) => {
    if (id === showComment) {
      setShowComment("");
    } else setShowComment(id);
  };

  const getReactions = () => {
    const onListenEvent = (value: any) => {
      if (id === value.data.postId) {
        console.log(value.data);
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
  }, [socket]);

  // console.log(id, 'init id');
  // console.log(showComment, 'show comment');

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-x-3">
          <button
            type="button"
            className={`${
              type === "text"
                ? `${
                    likeAction === "like"
                      ? "bg-green-600 text-white"
                      : "bg-white dark:bg-darkColor"
                  }`
                : `${
                    likeAction === "like"
                      ? "bg-green-600 text-white"
                      : "bg-[#EDEDFF] dark:bg-darkColorLight"
                  }`
            } flex items-center gap-x-1 rounded-full px-4 py-[2px]`}
            onClick={() => handleAction("upvote")}
          >
            <TbArrowBigUp className="dark:text-white" />
            <p>{statCount.initLike}</p>
          </button>
          <button
            type="button"
            className={`${
              type === "text"
                ? `${
                    likeAction === "dislike"
                      ? "bg-red-600 text-white"
                      : "bg-white dark:bg-darkColor"
                  }`
                : `${
                    likeAction === "dislike"
                      ? "bg-red-600 text-white"
                      : "bg-[#EDEDFF] dark:bg-darkColorLight"
                  }`
            } flex items-center gap-x-1 rounded-full px-4 py-[2px]`}
            onClick={() => handleAction("downvote")}
          >
            <TbArrowBigDown className="dark:text-white" />
            <p>{statCount.initDislike}</p>
          </button>
        </div>
        <button
          type="button"
          className={`${
            type === "text"
              ? `${
                  showComment
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-darkColor"
                }`
              : `${
                  showComment
                    ? "bg-blue-600 text-white"
                    : "bg-[#EDEDFF] dark:bg-darkColorLight"
                }`
          } flex items-center gap-x-1 rounded-full px-4 py-[2px]`}
          onClick={() => handleShowComment(id)}
        >
          <GoComment className="dark:text-white" />
          <p>{statCount.initComment || 0}</p>
        </button>
      </div>
      {showComment === id && (
        <ViewComments
          socket={socket}
          id={id}
          count={comment || 0}
          token={token || ""}
          minusComment={minusComment}
        />
      )}
    </div>
  );
};

export default PostActions;
