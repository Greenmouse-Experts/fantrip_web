import HueSpinner from "@/components/loaders/hue-spinner";
import { getTransaction } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TransactionTableListing from "./table-listing";

const TransactionIndex = () => {
  const [params, setParams] = useState({
    status: "all",
    page: 1,
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-transactions"],
    queryFn: getTransaction,
  });

  const toast = useToast();
  const count = data?.count;

  const handleNext = () => {
    if (params.page * 10 >= count) {
      toast({
        title: "This is the last page",
        isClosable: true,
        position: "top",
        status: "info",
      });
    } else {
      setParams({
        ...params,
        page: params.page + 1,
      });
    }
  };

  const handlePrev = () => {
    if (params.page === 1) {
      toast({
        title: "This is the first page",
        isClosable: true,
        position: "top",
        status: "info",
      });
    } else {
      setParams({
        ...params,
        page: params.page - 1,
      });
    }
  };
  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <div className="mt-4">
          <TransactionTableListing
            data={data?.data}
            refetch={refetch}
            next={handleNext}
            prev={handlePrev}
            count={count}
            page={params.page}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionIndex;
