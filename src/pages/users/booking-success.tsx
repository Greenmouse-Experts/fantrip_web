import BookingSuccessIndex from "@/modules/users/booking/components/booking-success";
import { useParams } from "react-router-dom";

const BookingSuccess = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
      <div className="box">
        <BookingSuccessIndex id={`${id}`} />
      </div>
    </div>
  );
};

export default BookingSuccess;
