import { FaCheckCircle } from "react-icons/fa";

const RegisterSuccess = () => {
  return (
    <div className="py-7 lg:py-12">
      <div>
        <FaCheckCircle className="text-[105px] text-green-600 animate-bounce mx-auto" />
      </div>
      <div className="w-9/12 mx-auto text-center mt-6">
        <p className="fw-500 lg:text-lg syne mb-2">Hey Champ!</p>
        <p>
          You've just signed up to level up your gameday fan experience with
          Fantrip. Your journey starts now! Keep your game face on. Go to your
          mail to verify your account.
        </p>
      </div>
    </div>
  );
};

export default RegisterSuccess;
