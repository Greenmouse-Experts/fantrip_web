import { ComponentModal } from "@/components/modal-component";
import { FC, useState } from "react";
import { BiMessageAdd } from "react-icons/bi";
import AddReview from "./add-review";
import { useQuery } from "@tanstack/react-query";
import { getPublicReviews } from "@/services/api/places-api";
import ReviewList from "./review-list";

interface Props {
  id: string;
}
const PlacesReviews: FC<Props> = ({id}) => {
  const [showAdd, setShowAdd] = useState(false);
  const {isLoading, data, refetch} = useQuery({
    queryKey: ['get-public-reviews', id],
    queryFn: () => getPublicReviews(id)
  })
  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="fw-600 text-lg lg:text-2xl">Reviews({data?.count || 0})</p>
        <button className="flex items-center gap-x-2" onClick={() => setShowAdd(true)}>
          <BiMessageAdd />
          <span>Add Review</span>
        </button>
      </div>
      <div>
        {!isLoading && data && <ReviewList data={data.data}/>}
      </div>
      <ComponentModal
        title="Submit A Review"
        shouldShow={showAdd}
        onClose={() => setShowAdd(false)}
        type="recommend"
      >
        <AddReview id={id} refetch={refetch} close={() => setShowAdd(false)}/>
      </ComponentModal>
    </div>
  );
};

export default PlacesReviews;
