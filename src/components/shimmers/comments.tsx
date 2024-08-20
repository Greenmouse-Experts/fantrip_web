import { Skeleton } from "@chakra-ui/react";

const CommentsLoading = () => {
  return (
    <div className="flex gap-x-2">
      <div className="circle w-[40px] h-[40px] shrink-0 overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="w-full grid gap-2 mt-[2px]">
        <div className="rounded-lg overflow-hidden w-full h-16">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default CommentsLoading;
