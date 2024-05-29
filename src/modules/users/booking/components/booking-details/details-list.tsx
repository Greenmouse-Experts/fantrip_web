import { BookingItemWithPricing } from "@/lib/contracts/booking";
import { formatStatus } from "@/lib/utils/formatHelp";
import dayjs from "dayjs";
import { FC } from "react";
import { FaStar } from "react-icons/fa6";

interface Props {
  data: BookingItemWithPricing;
}
const DetailsList: FC<Props> = ({ data }) => {
  const {
    stay,
    price,
    priceWithNightInclusion,
    serviceFee,
    taxFee,
    total,
    checkIn,
    checkOut,
    adults,
    children,
    createdDate,
    status,
  } = data;
  return (
    <div>
      <div className="flex gap-x-2">
        <p className="text-prima syne fw-600">Booking Status</p>
        <p className="fw-500">
          {formatStatus[status as keyof typeof formatStatus]}
        </p>
      </div>
      <div>
        <div className="mt-4">
          <p className="fw-600 text-lg syne border-b text-prima">
            Stay Informations
          </p>
          <div className="bg-gray-100 p-4 rounded grid gap-3">
          <div className="flex gap-x-2">
              <p className="text-gray-600">Host:</p>
              <p className="fw-500">{stay.host.firstName} {stay.host.lastName}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Location:</p>
              <p className="fw-500">{stay.address}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Ratings:</p>
              <p className="fw-500 flex items-center gap-x-2 text-[#fc819f]">
                <FaStar/> <span className="">4.6</span>
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Highlight:</p>
              <p className="fw-500">{stay.highlightFeature}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="fw-600 text-lg syne border-b text-prima">
            Booking Informations
          </p>
          <div className="bg-gray-100 p-4 rounded grid gap-3">
            <div className="flex gap-x-2">
              <p className="text-gray-600">Date Booked:</p>
              <p className="fw-500">
                {dayjs(createdDate).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Check In:</p>
              <p className="fw-500">{checkIn}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Check Out:</p>
              <p className="fw-500">{checkOut}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Number of Adults:</p>
              <p className="fw-500">{adults}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Number of Children:</p>
              <p className="fw-500">{children}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="fw-600 text-lg syne border-b text-prima">
            Payment Information
          </p>
          <div className="grid gap-3 bg-gray-100 p-4 rounded">
            <div className="flex gap-x-2">
              <p className="text-gray-600">Price per night:</p>
              <p className="fw-500">{stay.currency}{price}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Price for reserved night(s):</p>
              <p className="fw-500">{stay.currency}{priceWithNightInclusion}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Fantrip Service Fee:</p>
              <p className="fw-500">{stay.currency}{serviceFee}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Tax Fee:</p>
              <p className="fw-500">{stay.currency}{taxFee}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <p className="text-gray-600">Total:</p>
              <p className="fw-500 text-lg">{stay.currency}{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsList;
