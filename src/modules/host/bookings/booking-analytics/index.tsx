import all from "../../../../assets/svg/all.svg";
import active from "../../../../assets/svg/active.svg";
import saved from "../../../../assets/svg/saved.svg";
import cancel from "../../../../assets/svg/pending.svg";
import { useQuery } from "@tanstack/react-query";
import { hostFetchBookingStat } from "@/services/api/booking-api";

const BookingAnalytics = () => {
  const { data } = useQuery({
    queryKey: ["get-booking-stat"],
    queryFn: hostFetchBookingStat,
  });
  const listing = [
    {
      name: "Total Bookings",
      number: data?.total || 0,
      img: <img src={all} alt="" />,
    },
    {
      name: "Pending Bookings",
      number: data?.pending || 0,
      img: <img src={active} alt="" />,
    },
    {
      name: "Checked In",
      number: data?.checkIn || 0,
      img: <img src={saved} alt="" />,
    },
    {
      name: "Checked Out",
      number: data?.checkOut || 0,
      img: <img src={cancel} alt="" />,
    },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {listing.map((item) => (
        <div
          className="border border-[#343B4F] flex gap-x-2 p-4 rounded-[8px]"
          key={item.name}
        >
          <div>{item.img}</div>
          <div>
            <p className="fw-500">{item.name}</p>
            <p className="fs-500  mt-[1px]">{item.number}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingAnalytics;
