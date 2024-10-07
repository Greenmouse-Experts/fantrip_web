import { AnalyticItem } from "@/lib/contracts/routine";
import BoxAnalyysis from "@/modules/host/dashbooard/box-analysis";
import TotalRevenue from "@/modules/host/dashbooard/total-revenue";
import { getAnalytics } from "@/services/api/routine";
import { useQuery } from "@tanstack/react-query";

const UserDashboard = () => {
  const { data } = useQuery<AnalyticItem>({
    queryKey: ["get-dashboard-stat"],
    queryFn: getAnalytics,
  });
  return (
    <div className="pt-4">
      <BoxAnalyysis
        total={data?.totalListings || 0}
        available={data?.availableListings || 0}
        booked={data?.booked || 0}
        reviews={data?.reviews || 0}
      />
      <div className="mt-8 lg:flex border border-[#343B4F] rounded-[16px]">
        <div className="w-full px-4 py-8">
          <TotalRevenue
            revenue={data?.revenuesChart?.revenues || []}
            months={data?.revenuesChart?.months || []}
            total={0}
          />
        </div>
        {/* <div className="lg:w-[33%]">
          <div className="bordr-b border-[#343B4F]">
            <TotalProfit />
          </div>
          <div>
            <TotalListing />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserDashboard;
