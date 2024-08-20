import { Skeleton } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  count: number;
}
const PostLoader: FC<Props> = ({ count }) => {
  const arr = new Array(count).fill(null);
  return (
    <>
      {arr.map((_, i: number) => (
        <div className="grid gap-2" key={i}>
          <div className="w-full h-[300px] rounded-[15px] overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex mx-1 mr-2 justify-between items-center">
            <div className="flex items-center gap-x-3">
              <div className="w-10 h-7 rounded-[15px] overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="w-10 h-7 rounded-[15px] overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
            <div>
              <div className="w-10 h-7 rounded-[15px] overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className="flex mx-1 gap-x-2">
            <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="w-full h-10 rounded-[15px] overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostLoader;
