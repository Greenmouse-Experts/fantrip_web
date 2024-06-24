import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BookingItem, PaidBookingItem } from "@/lib/contracts/booking";
import { DynamicTable } from "@/components/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
import ProfileAvatar from "@/components/ProfileAvatar";
import { formatAsDollar, formatName, formatStatus, formatStayStatus } from "@/lib/utils/formatHelp";
dayjs.extend(relativeTime);

interface Props {
  data: BookingItem[];
  refetch: () => void;
}
const BookingTableListing: FC<Props> = ({ data }) => {
  const columnHelper = createColumnHelper<PaidBookingItem>();
  const columns = [
    columnHelper.accessor((row) => row.reservation.guest.picture, {
      id: "Guest",
      cell: (info) => (
        <div className="flex items-center gap-x-2 min-w-[180px]">
          <ProfileAvatar
            url={info.getValue()}
            name={`${info.row.original.reservation.guest.firstName} ${info.row.original.reservation.guest.lastName}`}
            font={18}
            size={40}
            type="normal"
          />
          <p>{`${info.row.original.reservation.guest.firstName} ${info.row.original.reservation.guest.lastName}`}</p>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.reservation.stay, {
      id: "Stay",
      cell: (info) =>
        info.getValue() && (
          <div className="min-w-[230px] flex gap-x-2 items-center">
            {!!info.getValue().photos.length && (
              <img
                src={info.getValue().photos[0]}
                alt="condo-img"
                className="w-[80px] h-[60px] rounded-lg"
              />
            )}
            <div>
            <p className="w-[160px] whitespace-nowrap">{info.getValue().name}</p>
            <p>{formatName(info.getValue().address, 20)}</p>
            </div>
          </div>
        ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.pricePerNight, {
      id: "Amount Paid",
      cell: (info) => <p className="text-lg fw-600">{formatAsDollar(info.getValue())}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.trx.status, {
      id: "Payment Status",
      cell: (info) => formatStatus[info.getValue() as keyof typeof formatStatus],
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
      cell: (info) =>  <div>
      <p>{info.getValue()} Adults</p>
      <p>{info.row.original.reservation.children} Children</p>
    </div>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Stay Staus",
      cell: (info) => formatStayStatus[info.getValue() as keyof typeof formatStayStatus],
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
