import { FC, useState } from "react";
import LeaveComment from "../leave-a-comment";
import PostActions from "../post-actions";
import ProfileMore from "../profile-more";
import { PostTyping } from "@/lib/contracts/chat";
import dayjs from "dayjs";
import AltName from "@/components/alt-name";
import { ComponentModal } from "@/components/modal-component";
import ProfileModal from "../profile-more/profile-modal";
import { useNavigate } from "react-router-dom";

interface Props {
  item: PostTyping;
  socket: any;
  handleReload: () => void;
}
const ImagePostRender: FC<Props> = ({ item, socket, handleReload }) => {
  const navigate = useNavigate();
  const [profileShow, setProfileShow] = useState(false);
  const [commentCount, setCommentCount] = useState<number>(item.threads);
  const addComment = (minus?: boolean) => {
    const count = minus ? Number(commentCount) - 1 : Number(commentCount) + 1;
    setCommentCount(count);
  };
  return (
    <div className="border-b pb-3 border-[#D2D2D2]">
      <div className="">
        <div className="rounded-[12px] overflow-hidden">
          <div
            className="p-4 bg-gradient cursor-pointer rounded-t-[12px] text-white"
            onClick={() =>
              navigate(
                `/chat-room?chatpost-id=${item.id}&chatinit-id=${item.user.id}`
              )
            }
          >
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <div className="w-[35px] lg:w-[40px] h-[35px] lg:h-[40px] bg-gradient p-[1px] circle">
                  <img
                    src={
                      item?.user?.picture ||
                      "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
                    }
                    alt="profile"
                    className="w-full h-full circle object-cover"
                    onClick={() => setProfileShow(true)}
                  />
                </div>
                <div>
                  <p className="fw-500 fs-500">
                    <AltName
                      name={`${item.user?.firstName} ${item.user?.lastName}`}
                      useNick={item.user?.isNickname}
                      nick={item.user?.nickname}
                    />
                  </p>
                  <p className="opacity-80  fs-300">
                    <span className="capitalize fw-500">{item.user.role}</span>
                    {" - "}
                    <span>{dayjs(item.createdDate).fromNow()}</span>
                  </p>
                </div>
              </div>
              <ProfileMore
                socket={socket}
                id={item.id}
                user={item.user}
                openUser={() => setProfileShow(true)}
                reload={handleReload}
              />
            </div>
            <div className="mt-3">
              <p className="whitespace-pre-line">{item.message}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-[300px]">
            <img src={item.file} alt="post-image" className="h-full mx-auto" />
          </div>
        </div>
        <div className="mt-3">
          <PostActions
            id={item.id}
            like={item.upvotes}
            dislike={item.downvotes}
            comment={commentCount}
            type="image"
            socket={socket}
            reaction={item.myReaction}
            minusComment={addComment}
          />
        </div>
      </div>
      <div className="mt-3">
        <LeaveComment id={item.id} socket={socket} addComment={addComment} />
      </div>
      <ComponentModal
        title={`User Profile`}
        shouldShow={profileShow}
        onClose={() => setProfileShow(false)}
        type="more"
      >
        <ProfileModal user={item.user} close={() => setProfileShow(false)} />
      </ComponentModal>
    </div>
  );
};

export default ImagePostRender;
