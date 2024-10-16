import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BookingItem } from "@/lib/contracts/booking";
import { DynamicTable } from "@/components/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
import {
  formatStatus,
} from "@/lib/utils/formatHelp";
import { TransactItem } from "@/lib/contracts/routine";
dayjs.extend(relativeTime);

interface Props {
  data: BookingItem[];
  refetch: () => void;
  next: () => void;
  prev: () => void;
  page: number;
  count: number;
}
const TransactionTableListing: FC<Props> = ({
  data,
  next,
  prev,
  page,
  count,
}) => {

  const columnHelper = createColumnHelper<TransactItem>();
  const columns = [
    columnHelper.accessor((row) => row.reference, {
      id: "TX Reference",
      cell: (info) => <p className="text-prima fw-500">{info.getValue()}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.gateway, {
      id: "Gateway",
      cell: (info) => (
        <p className="capitalize fw-500 text-[#fc819f]">{info.getValue()}</p>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.amount, {
      id: "Amount",
      cell: (info) => (
        <p>
          {info.row.original.booking.currency}
          {info.getValue()}
        </p>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Status",
      cell: (info) =>
        formatStatus[info.getValue() as keyof typeof formatStatus],
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.user, {
      id: "Guest",
      cell: (info) => (
        <>
          {info.getValue()?.firstName} {info.getValue()?.lastName}
        </>
      ),
      header: (info) => info.column.id,
    }),
    // columnHelper.accessor((row) => row.booking, {
    //   id: "Stay",
    //   cell: (info) => (
    //     <p>
    //       {info.getValue()?.id}
    //     </p>
    //   ),
    //   header: (info) => info.column.id,
    // }),
  ];
  return (
    <div>
      <div>
        <DynamicTable
          columns={columns}
          data={data}
          next={next}
          prev={prev}
          page={page}
          count={count}
        />
      </div>
    </div>
  );
};

export default TransactionTableListing;
