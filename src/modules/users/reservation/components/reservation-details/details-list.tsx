import { BookingItemWithPricing } from "@/lib/contracts/booking";
import {
  formatAsNgnMoney,
  formatNumber,
  formatStatus,
} from "@/lib/utils/formatHelp";
import dayjs from "dayjs";
import { FC } from "react";
import { FaStar } from "react-icons/fa6";
import CancelReservation from "../cancel-reservation";
import { RESERVATION_STATUS } from "@/lib/contracts/enums";

interface Props {
  data: BookingItemWithPricing;
  close: () => void;
}
const DetailsList: FC<Props> = ({ data, close }) => {
  const {
    id,
    stay,
    price,
    priceWithNightInclusion,
    serviceFee,
    total,
    checkIn,
    checkOut,
    adults,
    children,
    createdDate,
    status,
    enableRewardForPayment,
  } = data;
  return (
    <div className="max-h-[calc(95vh_-_100px)] overflow-y-auto">
      <div className="flex gap-x-2">
        <p className="text-prima syne fw-600">Reservation Status</p>
        <p className="fw-500">
          {formatStatus[status as keyof typeof formatStatus]}
        </p>
      </div>
      <div>
        {(status === RESERVATION_STATUS.PENDING ||
          status === RESERVATION_STATUS.CONFIRMED) && (
          <CancelReservation id={id} close={close} />
        )}
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
                {stay.host?.firstName} {stay.host?.lastName}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Location:</p>
              <p className="fw-500">{stay.address}</p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Ratings:</p>
              {Number(stay.avrRating) > 0 && (
                <p className="fw-500 flex items-center gap-x-2 text-[#fc819f]">
                  <FaStar /> <span className="">{stay.avrRating}</span>
                </p>
              )}
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
          <div className="bg-gray-100 dark:bg-darkColor p-4 rounded grid gap-3">
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
          <div className="grid gap-3 bg-gray-100 dark:bg-darkColor p-4 rounded">
            <div className="flex gap-x-2">
              <p className="text-gray-600">Price per night:</p>
              <p className="fw-500">
                {stay.currency}
                {price}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Price for reserved night(s):</p>
              <p className="fw-500">
                {stay.currency}
                {formatNumber(priceWithNightInclusion)}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Fantrip Service Fee:</p>
              <p className="fw-500">
                {stay.currency}
                {formatNumber(serviceFee)}
              </p>
            </div>
            <div className="flex gap-x-2">
              <p className="text-gray-600">Point Reward:</p>
              <p className="fw-500">
                {enableRewardForPayment ? (
                  <div className="flex gap-x-2 items-center">
                    {formatStatus["active"]}{" "}
                    <span className="text-green-500">
                      -{formatAsNgnMoney(5)}
                    </span>
                  </div>
                ) : (
                  formatStatus["inactive"]
                )}
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <p className="text-gray-600">Total:</p>
              <p className="fw-500 text-lg">
                {stay.currency}
                {formatNumber(total - (enableRewardForPayment ? 5 : 0))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsList;
