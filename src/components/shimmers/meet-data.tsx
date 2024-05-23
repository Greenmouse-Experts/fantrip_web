import { Skeleton } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  count: number;
}
const MeetDataSkeleton: FC<Props> = ({ count }) => {
  const arr = new Array(count).fill(null);
  return (
    <>
      {arr.map((_, i: number) => (
        <div className="grid grid-cols-2 gap-3" key={i}>
          <div className="row-span-2 w-full h-full rounded-[15px] overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="w-full h-44 rounded-[15px] overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="w-full h-44 rounded-[15px] overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export default MeetDataSkeleton;
