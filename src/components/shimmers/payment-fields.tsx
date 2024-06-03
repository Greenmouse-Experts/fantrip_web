import { Skeleton } from "@chakra-ui/react";

const PaymentFieldShimmer = () => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4 ">
        <div className="rounded-lg overflow-hidden">
          <Skeleton className="w-full h-12" />
        </div>
        <div className="rounded-lg overflow-hidden">
          <Skeleton className="w-full h-12" />
        </div>
      </div>
      <div className="rounded-lg overflow-hidden">
        <Skeleton className="w-full h-12" />
      </div>
      <div className="rounded-lg overflow-hidden">
        <Skeleton className="w-full h-12" />
      </div>
    </div>
  );
};

export default PaymentFieldShimmer;
