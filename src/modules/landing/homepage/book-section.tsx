import BtnContent from "@/components/btn-content";
import { Link } from "react-router-dom";
import MeetComponent from "../extra/meet-comp";
import { useQuery } from "@tanstack/react-query";
import { getAllStay } from "@/services/api/stay-api";
import { AvailableStayItem } from "@/lib/contracts/stay";
import MeetDataSkeleton from "@/components/shimmers/meet-data";

const BookSection = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-all-stay"],
    queryFn: () => getAllStay(),
  });

  return (
    <div className="section pt-4">
      <div className="box">
        <div>
          <p className="lg:w-8/12 fw-500 mx-auto text-center syne text-2xl">
            Swap those cookie-cutter hotel vibes and anonymous hosts for a home
            where the sports spirit lives! 😉 See your fan host in their proud
            team colours
          </p>
        </div>
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {isLoading && <MeetDataSkeleton count={3} />}
          {!isLoading &&
            !!data?.data?.length &&
            data?.data
              .slice(0, 3)
              .map((item: AvailableStayItem, i: number) => (
                <MeetComponent item={item} key={i} />
              ))}
        </div>
        <div className="mt-12 lg:mt-24 flex justify-center">
          <Link to={"/find-stay"} className="btn-primary px-6 py-3 md:py-5 lg:px-16">
            <BtnContent name="Book a stay with a fan" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookSection;
