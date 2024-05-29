import { FC } from "react";
import img from "@/assets/images/empty-net.png";

interface Props {
  text: string;
}
const EmptyNetState: FC<Props> = ({ text }) => {
  return (
    <div>
      <div className="flex justify-center">
        <img src={img} alt="empty-post" className="w-[200px] lg:w-[300px]" />
      </div>
      <div className="flex text-center justify-center">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default EmptyNetState;
