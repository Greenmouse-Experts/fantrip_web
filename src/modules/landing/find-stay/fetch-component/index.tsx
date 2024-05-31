import MeetDataSkeleton from "@/components/shimmers/meet-data"
import BookingTab from "../../homepage/booking-tab"
import MeetComponent from "../../extra/meet-comp"
import { AvailableStayItem } from "@/lib/contracts/stay"
import { useQuery } from "@tanstack/react-query"
import { getAllStay } from "@/services/api/stay-api"
import { useUtils } from "@/hooks/useUtils"

const FetchStayComponent = () => {
    const {stayParams} = useUtils()
    const {isLoading, data} = useQuery({
        queryKey: ['get-all-stay', stayParams],
        queryFn: () => getAllStay(stayParams)
      })
  return (
    <div>
        <div className="py-12 lg:pt-0 lg:relative -top-10">
        <BookingTab />
      </div>
      <div className="">
        <div className="box">
          <div className="mt-12 grid items-stretch lg:grid-cols-3 gap-4 2xl:gap-8">
            {isLoading && <MeetDataSkeleton count={6}/>}
            {!isLoading && !!data?.data.length && data?.data.map((item:AvailableStayItem, i:number) => (
              <MeetComponent item={item} i={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FetchStayComponent