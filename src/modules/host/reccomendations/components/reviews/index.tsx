import { FC } from "react";
import EmptyNetState from "@/components/empty-states/empty-net";
import PyramidSpin from "@/components/loaders/pyramid-spin";
import { getMyReviews } from "@/services/api/places-api";
import { useQuery } from "@tanstack/react-query";
import ReviewList from "./review-list";

interface Props{
    id: string ;
    close:() => void;
    refetch: () => void
}
const RecommendationReviews:FC<Props> = ({id,}) => {
    const {isLoading, data} = useQuery({
        queryFn: () => getMyReviews(id),
        queryKey: [`get-my-reviews`, id]
    })
  return (
    <div>
      {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {!isLoading && !!data?.data.results.length && (
        <ReviewList data={data?.data} count={data.count} />
      )}
      {!isLoading && !data?.data?.results.length && (
        <div>
          <EmptyNetState text="No reviews submitted yet." />
        </div>
      )}
    </div>
  );
}

export default RecommendationReviews