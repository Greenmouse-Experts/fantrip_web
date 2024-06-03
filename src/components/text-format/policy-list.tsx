import { FC } from "react";
import GradientListBox from "./gradient-list-box";

interface Props {
  text: string;
  head?: string;
}
const PolicyList: FC<Props> = ({ text, head }) => {
  return (
    <div className="relative flex gap-x-2 items-start">
      <div className="relative top-[5px] w-[12px] shrink-0">
        <GradientListBox />
      </div>
      <div>
        <p className="inline fw-500">{head}</p>
        <p className="inline">{text}</p>
      </div>
    </div>
  );
};

export default PolicyList;
