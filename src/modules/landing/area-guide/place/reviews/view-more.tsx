import { FC } from "react";

interface Props {
  tags: string[];
  desc: string;
  close: () => void;
}
const ViewMore: FC<Props> = ({ desc, tags }) => {
  return (
    <div className="max-h-[450px] pb-4 overflow-y-auto px-4">
      <p className="mt-5 whitespace-pre-wrap">{desc}</p>
      <div className="mt-4 grid gap-1">
        {tags.map((item: string, i: number) => (
          <div className="flex gap-x-1 items-center" key={i}>
            <p className="bg-layout-gradient w-3 h-3"></p>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMore;
