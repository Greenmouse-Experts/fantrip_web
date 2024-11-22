import dayjs from "dayjs";
import { FC } from "react";
import Calendar from "react-calendar";

interface Props {
  from: string;
  to: string;
}
const Availability: FC<Props> = ({ from, to }) => {
  const isValidFormatFrom = /^\d{4}-\d{2}-\d{2}$/.test(from);
  const isValidFormatTo = /^\d{4}-\d{2}-\d{2}$/.test(to);

  let fromDate = from;
  let toDate = to;

  if (!isValidFormatFrom) {
    fromDate = from.split("-").reverse().join("-");
  }

  if (!isValidFormatTo) {
    toDate = to.split("-").reverse().join("-");
  }

  const date = {
    from: dayjs(fromDate).toDate(),
    to: dayjs(toDate).toDate(),
  };
  return (
    <div className="pb-6 border-b border-[#D2D2D2]">
      <div>
        <p className="fw-600 lg:text-lg">Availability</p>
      </div>
      <div className="mt-6 flex">
        <div className="bg-[#FFEDF2] px-3 lg:px-6 fw-500 py-3">
          Calendar view of available dates for fan stay booking
        </div>
      </div>
      <div className="mt-12">
        <Calendar
          // value={[params.checkIn, params.checkOut]}
          className={"!w-[300px] lg:w-[400px] overflow-hidden"}
          minDate={date.from}
          maxDate={date.to}
        />
      </div>
    </div>
  );
};

export default Availability;
