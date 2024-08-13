import BtnContent from "@/components/btn-content";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSpecialStay } from "@/services/api/stay-api";
import { SpecialStayItem } from "@/lib/contracts/stay";
import MeetDataSkeleton from "@/components/shimmers/meet-data";
import SpecialMeetComponent from "../extra/special-comp";

const BookSection = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-special-stay"],
    queryFn: () => getSpecialStay(),
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
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          {isLoading && <MeetDataSkeleton count={3} />}
          {!isLoading &&
            !!data?.data?.length &&
            data?.data
              .slice(0, 3)
              .map((item: SpecialStayItem, i: number) => (
                <SpecialMeetComponent item={item} key={i} />
              ))}
        </div>
        <div className="mt-12 lg:mt-24 flex justify-center">
          <Link
            to={"/find-stay"}
            className="btn-primary px-6 py-3 md:py-5 lg:px-16"
          >
            <BtnContent name="Book a stay with a fan" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookSection;
