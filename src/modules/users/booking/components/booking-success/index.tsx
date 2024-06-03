import Button from "@/components/Button";
import { fetchBookingDetails } from "@/services/api/booking-api";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import favicon from '@/assets/favicon.png'
import PyramidSpin from "@/components/loaders/pyramid-spin";

interface Props {
  id: string;
}
const BookingSuccessIndex: FC<Props> = ({ id }) => {
  const { isLoading } = useQuery({
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
        {!isLoading && <div className="grid items-center lg:grid-cols-2 gap-4 lg:gap-x-12">
          <div>
            <img src={favicon} alt="favicon" className="w-16"/>
            <p className="syne text-5xl fw-600 mt-10">
              Booking confirmed successfully!
            </p>
            <p className="mt-6 text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
              placeat a quisquam! Nesciunt, obcaecati fugiat. Nostrum tempore
              est quos perspiciatis reprehenderit, quasi nisi illo accusamus
              impedit consequatur eum earum neque?
            </p>
            <div className="mt-10 flex gap-x-4 items-center">
              <Button
                title={"View All Bookings"}
                altClassName="btn-primary px-5 py-3 fw-600"
              />
              <Link to={"/"} className="underline text-prima fw-600">
                Goto Hompage
              </Link>
            </div>
          </div>
          <div className="gap-6">
            <div className="bg-light rounded-lg p-5 flex items-center justify-between">
              <div>
                <p className="fw-600 text-3xl">$456.09</p>
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
            <div className="rounded-t-xl bg-light mt-6 p-6 min-h-[350px]">
                    <p className="text-lg syne fw-600">Payment Details</p>
                    <div className="grid gap-6 mt-7">
                        <div>
                            <p>Date:</p>
                            <p></p>
                        </div>
                        <div>
                            <p>Reference Number:</p>
                            <p></p>
                        </div>
                        <div>
                            <p>Amount:</p>
                            <p></p>
                        </div>
                        <div>
                            <p>Payment Method:</p>
                            <p></p>
                        </div>
                        <div>
                            <p>Payment Status:</p>
                            <div>

                            </div>
                        </div>
                    </div>
                 </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default BookingSuccessIndex;
