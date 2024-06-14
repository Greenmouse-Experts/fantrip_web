import { AvailableStayItem } from "@/lib/contracts/stay";
import { getAllStay } from "@/services/api/stay-api";
import { useQuery } from "@tanstack/react-query";
import SmallMeetComponent from "../small-meet-comp";

const PreviousListing = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-all-stay"],
    queryFn: () => getAllStay(),
  });

  return (
    <div>
      <div>
        <p className="text-lg fw-600">Previous Listings</p>
      </div>
      <div className="flex w-full overflow-x-auto gap-x-2 mt-4">
        {!isLoading &&
          !!data?.data.length &&
          data?.data.slice(0, 3).map((item: AvailableStayItem, i: number) => (
            <div className="w-[350px]" key={i}>
              <div className="w-[350px] h-full">
                <SmallMeetComponent item={item} i={i} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PreviousListing;
