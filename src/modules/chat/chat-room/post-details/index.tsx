import ScrollToTop from "@/lib/utils/scrollTop";
import { FC } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  socket: any;
}
const PostDetails: FC<Props> = ({}) => {
  const navigate = useNavigate();
  return (
    <div>
      <ScrollToTop/>
      {/* return button */}
      <div className="flex mt-2">
        <div
          className="bg-[#EDEDFF] rounded-full flex items-center shadow-lg px-3 py-1 hover:fw-600 cursor-pointer gap-x-2"
          onClick={() => navigate("/chat-room")}
        >
          <TbArrowBackUp className="fs-400" />
          <span className="fs-400">Return</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
