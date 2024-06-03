import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { LiaTimesSolid } from "react-icons/lia";
import PyramidSpin from "@/components/loaders/pyramid-spin";
import { fetchReservationDetails } from "@/services/api/booking-api";
import DetailsList from "./details-list";
import PaymentButton from "../payment";

interface Props {
  id: string;
  close: () => void;
}
const BookingDetails: FC<Props> = ({ id, close }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-reservation-details"],
    queryFn: () => fetchReservationDetails(id),
  });
  return (
    <div className="h-full">
         {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {!isLoading && data && (
        <div className="relative h-full m-3 lg:mr-5">
          <div className="flex justify-between items-center">
            <p className="syne fw-600 text-xl lg:text-3xl">{data?.stay.name}</p>
            <LiaTimesSolid className="text-xl cursor-pointer" onClick={close}/>
          </div>
          {/* booking-details */}
          <div className="mt-4">
            <DetailsList data={data}/>
          </div>
          {/* pay button */}
          <div>
            <PaymentButton currency={data.stay.currency} price={data.total}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
