import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EmptyStay from "@/components/empty-states/empty-stay";
import MeetDataSkeleton from "@/components/shimmers/meet-data";
import { AvailableStayItem } from "@/lib/contracts/stay";
import MeetComponent from "@/modules/landing/extra/meet-comp";
import { getAllHostStays } from "@/services/api/stay-api";

const HostStays = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["get-host-stays", id],
    queryFn: () => getAllHostStays(`${id}`),
  });

  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-8 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              {data ? `${data.user.firstName} ${data.user.lastName}` : ""}
            </p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="box pb-12 lg:pb-20">
        <div className="mt-12 items-stretch grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:gap-8">
          {isLoading && <MeetDataSkeleton count={2} />}
          {!isLoading &&
            !!data?.results?.length &&
            data?.results?.map((item: AvailableStayItem, i: number) => (
              <MeetComponent item={item} key={i} />
            ))}
        </div>
        {!isLoading && !data?.results?.length && <EmptyStay />}
      </div>
    </div>
  );
};

export default HostStays;
