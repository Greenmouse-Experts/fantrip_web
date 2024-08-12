import MeetDataSkeleton from "@/components/shimmers/meet-data";
import BookingTab from "../../homepage/booking-tab";
import MeetComponent from "../../extra/meet-comp";
import { AvailableStayItem } from "@/lib/contracts/stay";
import { useQuery } from "@tanstack/react-query";
import { getAllStay } from "@/services/api/stay-api";
import { useUtils } from "@/hooks/useUtils";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import EmptyStay from "@/components/empty-states/empty-stay";
import PaginationIndex from "./pagination";

const FetchStayComponent = () => {
  const { state } = useLocation();
  const { targetId } = state || {};
  const resultRef = useRef<any>();
  const [page, setPage] = useState(1)

  useEffect(() => {
    const el = resultRef.current;
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [targetId]);
  const { stayParams } = useUtils();
  const payload = {
    name: stayParams.name,
    city: stayParams.city,
    state: stayParams.name,
    guests: stayParams.guests,
    checkIn: stayParams.checkIn,
    checkOut: stayParams.checkOut,
  };
  // const paramsToFetch = {}
  const { isLoading, data } = useQuery({
    queryKey: ["get-all-stay", stayParams, page],
    queryFn: () => getAllStay(page, payload),
  });

  const total = data?.count

  return (
    <div>
      <div className="py-12 lg:pt-0 lg:relative -top-10">
        <BookingTab />
      </div>
      <div className="" ref={resultRef}>
        <div className="box">
          <div className="mt-12 items-stretch grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:gap-8">
            {isLoading && <MeetDataSkeleton count={6} />}
            {!isLoading &&
              !!data?.data.length &&
              data?.data.map((item: AvailableStayItem, i: number) => (
                <MeetComponent item={item} key={i} />
              ))}
          </div>
          {!isLoading && !data?.data.length && <EmptyStay />}
        </div>
      </div>
      <div className="flex justify-center mt-12 lg:mt-24">
        <PaginationIndex total={total} page={page} setPage={setPage}/>
      </div>
    </div>
  );
};

export default FetchStayComponent;
