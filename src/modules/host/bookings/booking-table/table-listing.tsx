import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BookingItem, PaidBookingItem } from "@/lib/contracts/booking";
import { DynamicTable } from "@/components/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
dayjs.extend(relativeTime);

interface Props {
  data: BookingItem[];
  refetch: () => void;
}
const BookingTableListing: FC<Props> = ({ data, refetch }) => {
  const columnHelper = createColumnHelper<PaidBookingItem>();
  const columns = [
    columnHelper.accessor((row) => row.reservation.guest.firstName, {
      id: "Guest",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.reservation.stay, {
      id: "Stay",
      cell: (info) =>
        info.getValue() && (
          <img
            src={info.getValue().photos[0] || ""}
            alt="property"
            className="w-28 h-16 object-cover"
          />
        ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.pricePerNight, {
      id: "Amount Paid",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.trx.status, {
      id: "Payment Status",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.reservation.checkIn, {
      id: "Check In",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.reservation.checkOut, {
      id: "Check Out",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.reservation.adults, {
      id: "Guests",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Stay Staus",
      cell: (info) => (
        <div>
          {info.getValue() ? (
            <p className="flex gap-x-2 items-center">
              <span className="w-3 h-3 bg-green-600 circle"></span>{" "}
              <span className="text-green-600">Active</span>
            </p>
          ) : (
            <p className="flex gap-x-2 items-center">
              <span className="w-3 h-3 bg-orange-600 circle"></span>{" "}
              <span className="text-orange-600">Inactive</span>
            </p>
          )}
        </div>
      ),
      header: (info) => info.column.id,
    }),
  ];
  return (
    <div>
      <div>
        <DynamicTable
          columns={columns}
          data={data}
          next={() => false}
          prev={() => false}
          page={1}
          count={5}
        />
      </div>
    </div>
  );
};

export default BookingTableListing;
