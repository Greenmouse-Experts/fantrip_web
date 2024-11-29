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
  refetch: () => void;
}
const BookingDetails: FC<Props> = ({ id, close, refetch }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-reservation-details", id],
    queryFn: () => fetchReservationDetails(id),
  });

  let hasConfirmedStatus = false;

  const renderPayBtn = (item: any) => {
    hasConfirmedStatus = item.bookings.some(
      (reservation: { trx: { status: string } }) =>
        reservation.trx?.status === "confirmed"
    );
    const htmlToRener = !hasConfirmedStatus ? (
      <PaymentButton
        id={id}
        currency={item.stay.currency}
        price={item.total - (item.enableRewardForPayment ? 5 : 0)}
        checkin={item.checkIn}
      />
    ) : null;

    return htmlToRener;
  };

  return (
    <div className="h-full dark:bg-darkColor">
      {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {!isLoading && data && (
        <div className="relative h-full m-3 lg:mr-5">
          <div className="flex justify-between items-center">
            <p className="syne fw-600 text-xl lg:text-3xl">{data?.stay.name}</p>
            <LiaTimesSolid className="text-xl cursor-pointer" onClick={close} />
          </div>
          {/* booking-details */}
          <div className="mt-4">
            <DetailsList data={data} close={close} refetch={refetch} />
          </div>
          {/* pay button */}
          <div>{renderPayBtn(data)}</div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
