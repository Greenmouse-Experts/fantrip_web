import { PaidBookingItem } from "@/lib/contracts/booking";
import { formatNumber, formatStatus } from "@/lib/utils/formatHelp";
import dayjs from "dayjs";
import { FC } from "react";
import { FaStar } from "react-icons/fa6";

interface Props {
  data: PaidBookingItem;
}
const DetailsList: FC<Props> = ({ data }) => {
  const {
    createdDate,
    status,
    reservation,
    currency,
    price,
    pricePerNight,
    serviceFee,
    total,
    trx
  } = data;

  const deduction = data.reservation.enableRewardForPayment? 5 : 0
  
  return (
    <div className="h-[93vh] overflow-y-auto">
      <div className="flex gap-x-2">
        <p className="text-prima syne fw-600">Stay Status</p>
        <div className="fw-500">
          {formatStatus[status as keyof typeof formatStatus]}
        </div>
      </div>
      <div>
        <div className="mt-4">
          <p className="fw-600 text-lg syne border-b text-prima">
            Stay Informations
          </p>
          <div className="bg-gray-100 dark:bg-darkColor p-4 rounded grid gap-3">
            <div className="flex gap-x-2">
              <p className="text-gray-600">Host:</p>
              <p className="fw-500">
                {reservation.stay.host.firstName}{" "}
                {reservation.stay.host.lastName}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Address:</p>
              <p className="fw-500">
                {reservation.stay.address}{" "}
                {reservation.stay.host.lastName}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Ratings:</p>
              <p className="fw-500 flex items-center gap-x-2 text-[#fc819f]">
                <FaStar /> <span className="">4.6</span>
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Highlight:</p>
              <p className="fw-500">{reservation.stay.highlightFeature}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="fw-600 text-lg syne border-b text-prima">
            Booking Informations
          </p>
          <div className="bg-gray-100 dark:bg-darkColor p-4 rounded grid gap-3">
            <div className="flex gap-x-2">
              <p className="text-gray-600">Date Booked:</p>
              <p className="fw-500">
                {dayjs(createdDate).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Check In:</p>
              <p className="fw-500">{reservation.checkIn}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Check Out:</p>
              <p className="fw-500">{reservation.checkOut}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Number of Adults:</p>
              <p className="fw-500">{reservation.adults}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Number of Children:</p>
              <p className="fw-500">{reservation.children}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="fw-600 text-lg syne border-b text-prima">
            Payment Information
          </p>
          <div className="grid gap-3 bg-gray-100 dark:bg-darkColor p-4 rounded">
          <div className="flex gap-x-2">
              <p className="text-gray-600">Payment Status:</p>
              <div className="fw-500">
                {formatStatus[trx.status as keyof typeof formatStatus]}
              </div>
            </div>
          <div className="flex gap-x-2">
              <p className="text-gray-600">Payment Reference:</p>
              <p className="fw-500">
                {trx.reference}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Payment Portal:</p>
              <p className="fw-500 capitalize text-prima">
                {trx.gateway}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Price per night:</p>
              <p className="fw-500">
                {currency}
                {price}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Price for reserved night(s):</p>
              <p className="fw-500">
                {currency}
                {formatNumber(pricePerNight)}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Fantrip Service Fee:</p>
              <p className="fw-500">
                {currency}
                {formatNumber(serviceFee)}
              </p>
            </div>
            {/* <div className="flex gap-x-2">
              <p className="text-gray-600">Tax Fee:</p>
              <p className="fw-500">
                {currency}
                {formatNumber(tax)}
              </p>
            </div> */}
            <div className="flex items-center gap-x-2">
              <p className="text-gray-600">Total:</p>
              <p className="fw-500 text-lg">
                {currency}
                {formatNumber(total - deduction)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsList;
