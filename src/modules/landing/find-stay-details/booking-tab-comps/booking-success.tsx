import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import ball from '@/assets/svg/ball-img.svg'
import useAuth from "@/hooks/authUser";

const BookingSuccess = () => {
  const {isHost} = useAuth()
  const navigate = useNavigate();
  const handleNavigation = () => {
    const route = isHost ? "/user/guest-activity" : "/user/reservation";
    navigate(`${route}`);
  }

  return (
    <div className="py-3">
      <div>
        <img src={ball} alt="ball" className="w-[100px] mx-auto animate-bounce" />
      </div>
      <div className="w-9/12 mx-auto text-center mt-6">
        <p className="fw-500 lg:text-2xl syne mb-2">Goal!</p>
        <p>
          You've just made a power play by reserving your fan stay. Your host is
          warming up to review your request. Get ready to high-five a fellow fan
          and make your matchday experience unforgettable. <br/>Stay tuned for the
          whistle
        </p>
      </div>
      <div className="mt-6 flex justify-center items-center gap-x-5">
        <Button
          title={"Return to homepage"}
          altClassName="btn-int px-5 lg:px-9 py-2 rounded-full"
          onClick={() => navigate("/find-stay")}
        />
        <Button
          title={"View Reservations"}
          onClick={() => handleNavigation()}
          altClassName="btn-primary px-5 lg:px-9 py-2 rounded-full"
        />
      </div>
    </div>
  );
};

export default BookingSuccess;
