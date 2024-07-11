import { getMyPlaces } from "@/services/api/places-api";
import { useQuery } from "@tanstack/react-query";
import ReccomendationListing from "./components/reccomendation-listing";

const ReccomendationsIndex = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-my-places"],
    queryFn: getMyPlaces,
  });
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-8 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              My Reccomendations
            </p>
          </div>
        </div>
      </div>
      <div className="box py-6 min-h-[70vh]">
        {!isLoading && <ReccomendationListing refetch={refetch} data={data.data} />}
      </div>
    </div>
  );
};

export default ReccomendationsIndex;
