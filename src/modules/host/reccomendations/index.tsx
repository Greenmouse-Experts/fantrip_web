import { getMyPlaces } from "@/services/api/places-api";
import { useQuery } from "@tanstack/react-query";
import ReccomendationListing from "./components/reccomendation-listing";
import { BiMessageAdd } from "react-icons/bi";
import { ComponentModal } from "@/components/modal-component";
import SubmitRecommendIndex from "@/modules/landing/area-guide/submit-recommend";
import { useState } from "react";

const ReccomendationsIndex = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-my-places"],
    queryFn: getMyPlaces,
  });
    const [showSubmit, setShowSubmit] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl syne fw-600 text-white">Host Recommendations</p>
        <button
          className="flex items-center gap-x-2"
          onClick={() => setShowSubmit(true)}
        >
          <BiMessageAdd />
          <span>Add New</span>
        </button>
      </div>
      <div className="py-6 min-h-[70vh]">
        {!isLoading && <ReccomendationListing data={data.data} />}
      </div>
      <div className="text-black">
        <ComponentModal
          title="Submit a Recommendation"
          shouldShow={showSubmit}
          onClose={() => setShowSubmit(false)}
          type="recommend"
        >
          <SubmitRecommendIndex close={() => setShowSubmit(false)} />
        </ComponentModal>
      </div>
    </div>
  );
};

export default ReccomendationsIndex;
