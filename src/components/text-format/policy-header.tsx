import { FC } from "react";

interface Props {
  text: string;
}
const PolicyHeader: FC<Props> = ({ text }) => {
  return <p className="syne fw-600 text-[20px] mb-2 lg:mb-4">{text}</p>;
};

export default PolicyHeader;
