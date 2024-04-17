import { FaCheckCircle } from "react-icons/fa";

const RegisterSuccess = () => {
  return (
    <div className="py-7 lg:py-12">
      <div>
        <FaCheckCircle className="text-[105px] text-green-600 animate-bounce mx-auto" />
      </div>
      <div className="w-9/12 mx-auto text-center mt-6">
        <p>
          Congratulations, your account has been successfully created. Go to
          your mail to verify your account.
        </p>
      </div>
    </div>
  );
};

export default RegisterSuccess;
