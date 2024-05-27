import Button from "@/components/Button";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <FaCheckCircle className="text-[105px] text-green-600 animate-bounce mx-auto" />
      </div>
      <div className="w-9/12 mx-auto text-center mt-6">
        <p className="fw-500 lg:text-lg syne mb-2">Hey Champ!</p>
        <p>
          Booking success text to go here. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Maxime dolorum nulla cumque id eveniet
          obcaecati recusandae nostrum.
        </p>
      </div>
      <div className="mt-6 flex justify-center items-center gap-x-5">
        <Button
          title={"Return to homepage"}
          altClassName="btn-int px-5 lg:px-9 py-2 rounded-full"
          onClick={() => navigate("/find-stay")}
        />
        <Button
          title={"View all bookings"}
          onClick={() => navigate("/user/booking")}
          altClassName="btn-primary px-5 lg:px-9 py-2 rounded-full"
        />
      </div>
    </div>
  );
};

export default BookingSuccess;
