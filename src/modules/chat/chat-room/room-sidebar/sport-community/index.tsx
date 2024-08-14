import { FC } from "react";
import CommunityList from "./community-list";

interface Props {
  socket: any;
}
const SportCommunityIndex:FC<Props> = ({socket}) => {
  return (
    <div className="min-h-[170px]">
      <div>
        <p className="text-[#8C8C8C] fw-500 fs-500">Sport Communities</p>
      </div>
      <div>
        <CommunityList socket={socket} />
      </div>
    </div>
  );
};

export default SportCommunityIndex;
