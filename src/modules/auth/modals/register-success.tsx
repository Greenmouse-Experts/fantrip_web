import Button from "@/components/Button";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterSuccess = () => {
  const navigate = useNavigate()
  return (
    <div className="py-7 lg:py-12 lg:pb-8">
      <div>
        <FaCheckCircle className="text-[105px] text-[#9847FE] animate-bounce mx-auto" />
      </div>
      <div className="w-9/12 mx-auto text-center mt-6">
        <p className="fw-500 lg:text-xl syne mb-2 fw-500">Welcome to the Big Leagues! 🏆</p>
        <p>
          You've just signed up to level up your gameday fan experience with
          fantrip. Your journey starts now! Keep your game face on. Go to your
          mail to verify your account.
        </p>
      </div>
      <div className="flex mt-5 justify-center">
        <Button title={'Continue'} altClassName="btn-int px-5 lg:px-16 py-3" onClick={() => navigate('/auth/login')} type="int"/>
      </div>
    </div>
  );
};

export default RegisterSuccess;
