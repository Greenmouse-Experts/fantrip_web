import ProfileAvatar from "@/components/ProfileAvatar";
import { CommentItem } from "@/lib/contracts/chat";
import { FC } from "react";
import CommentAction from "../comment-action";

interface Props {
  comment: CommentItem;
  socket: any;
}
const RenderComment: FC<Props> = ({ comment, socket }) => {
  return (
    <div className="flex gap-x-1">
      <div className="w-[40px] mt-[2px] shrink-0">
        <ProfileAvatar
          url={comment.user.picture}
          name={`${comment.user.firstName} ${comment.user.lastName}`}
          size={40}
          font={18}
        />
      </div>
      <div className="w-full bg-white bg-opacity-30 px-2 py-1 shadow-sm">
        <p className="fw-500 fs-500">{`${comment.user.firstName} ${comment.user.lastName}`}</p>
        <p className="fs-500">{comment.message}</p>
        <div className="mt-2">
          <CommentAction
            socket={socket}
            like={comment.upvotes}
            dislike={comment.downvotes}
            id={comment.id}
            type="post"
            comment={comment.totalReplies}
          />
        </div>
      </div>
    </div>
  );
};

export default RenderComment;
