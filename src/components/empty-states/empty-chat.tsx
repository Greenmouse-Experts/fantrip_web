import { FC } from "react";
import { HiOutlineChatAlt2 } from "react-icons/hi";

interface Props {
  bg: string;
}
const EmptyChat: FC<Props> = ({ bg }) => {
  return (
    <div className="h-full">
      <div className="h-full w-full place-center">
        <div className="bg-gradient p-[1px] rounded-lg">
          <div className={`${bg} rounded-lg p-10`}>
            <HiOutlineChatAlt2 className="text-prima text-6xl lg:text-9xl" />
            <p className="text-pri syne text-center fw-600">Start Your Chat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
