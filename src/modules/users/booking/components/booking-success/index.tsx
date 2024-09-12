import Button from "@/components/Button";
import { fetchBookingDetails } from "@/services/api/booking-api";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { FaCheck } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import favicon from "@/assets/favicon.png";
import PyramidSpin from "@/components/loaders/pyramid-spin";
import { formatNumber, formatStatus } from "@/lib/utils/formatHelp";
import dayjs from "dayjs";

interface Props {
  id: string;
}
const BookingSuccessIndex: FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["get-booking-details"],
    queryFn: () => fetchBookingDetails(id),
  });
  return (
    <div>
      <div className="py-12 lg:px-12">
        {isLoading && (
          <div className="py-12 lg:py-24 place-center">
            <PyramidSpin size={1.8} />
          </div>
        )}
        {!isLoading && (
          <div className="grid items-center lg:grid-cols-2 gap-4 lg:gap-x-12">
            <div>
              <img src={favicon} alt="favicon" className="w-16" />
              <p className="syne text-5xl fw-600 mt-10">
                Booking confirmed successfully!
              </p>
              <p className="mt-6 text-gray-700">
                We are delighted to confirm your booking with us. Your payment
                of{" "}
                <span className="fw-500">{`${data.currency}${data.total}`}</span>{" "}
                has been successfully processed. Thank you for choosing our
                services. We look forward to welcoming you on{" "}
                <span className="fw-500">{data.reservation.checkIn}</span>.
                Should you have any questions or require further assistance,
                please do not hesitate to contact
              </p>
              <div className="mt-10 flex gap-x-4 items-center">
                <Button
                  onClick={() => navigate("/user/booking")}
                  title={"View All Bookings"}
                  altClassName="btn-primary px-5 py-3 fw-600"
                />
                <Link to={"/"} className="underline text-prima fw-600">
                  Goto Hompage
                </Link>
              </div>
            </div>
            <div className="gap-6">
              <div className="bg-light dark:bg-darkColor rounded-lg p-5 flex items-center justify-between">
                <div>
                  <p className="fw-600 text-3xl">
                    {data.currency}
                    {formatNumber(data.total)}
                  </p>
                  <p className="text-gray-600 fw-500 fs-400">Payment success</p>
                </div>
                <div>
                  <div className="h-[70px] w-[70px] place-center circle bg-[#fc81a037]">
                    <div className="place-center w-[50px] h-[50px] circle bg-[#FC819F]">
                      <FaCheck className="text-xl text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-t-xl bg-light dark:bg-darkColor mt-6 p-6 min-h-[350px]">
                <p className="text-lg syne fw-600">Payment Details</p>
                <div className="grid gap-6 mt-7">
                  <div className="flex gap-x-2">
                    <p>Date:</p>
                    <p>{dayjs(data.createdDate).format("MM:HH, DD-MM-YYYY")}</p>
                  </div>
                  <div className="flex gap-x-2">
                    <p>Reference Number:</p>
                    <p className="fw-500">{data.trx.reference}</p>
                  </div>
                  <div className="flex gap-x-2">
                    <p>Amount:</p>
                    <p className="fw-600">
                      {data.currency}
                      {formatNumber(data.total)}
                    </p>
                  </div>
                  <div className="flex gap-x-2">
                    <p>Payment Method:</p>
                    <p className="text-prima fw-600 capitalize">
                      {data.trx.gateway}
                    </p>
                  </div>
                  <div className="flex gap-x-2">
                    <p>Payment Status:</p>
                    <div>
                      {
                        formatStatus[
                          data.trx.status as keyof typeof formatStatus
                        ]
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSuccessIndex;
