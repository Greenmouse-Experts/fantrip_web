import PyramidSpin from "@/components/loaders/pyramid-spin";
import { viewProfile } from "@/services/api/authApi";
import { useQuery } from "@tanstack/react-query";

const AccountList = () => {
  const { isLoading, data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => viewProfile(),
  });

  return (
    <div>
      {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {profile && (
        <div>
          <div className="border rounded-lg border-gray-500 p-4">
            <div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountList;
