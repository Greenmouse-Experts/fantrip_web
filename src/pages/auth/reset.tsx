import logo from "@/assets/images/auth-logo.png";
import ResetForm from "@/modules/auth/reset-form";
import { Link } from "react-router-dom";
const ResetPasswordPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-[60%] px-4 lg:px-0">
        <div className="lg:w-7/12 2xl:w-6/12 mx-auto py-12 lg:py-16">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-44 mx-auto" />
          </Link>
          <div className="text-center mt-8 lg:mt-16">
            <p className="text-3xl fw-600">Reset Password?</p>
            <p className="mt-5 text-[#828282]">
              Enter your new fantrip account password.
            </p>
          </div>
          <div className="mt-6">
            <ResetForm />
          </div>
          <div className="mt-6 text-center">
            <p>
              Remembered your password?{" "}
              <Link to={"/auth/login"} className="fw-500">
                Login here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-[40%] relative place-center">
        <img
          src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1712574934/fantrip/Rectangle_1_tfs1sg.png"
          alt="cover"
          className="absolute w-full h-full object-cover"
        />
        <div className="relative overflow-hidden rounded-xl z-10 w-[400px] 2xl:w-[450px] h-[250px] 2xl:h-[250px]">
          <div className="relative z-20 py-12 px-6">
            <p className="text-white text-2xl 2xl:text-3xl fw-600">
              We cater to every aspect of your sports passion
            </p>
            <p className="mt-4 text-white 2xl:text-xl">
              Login to your account and resume your adventure with fellow fans
            </p>
          </div>
          <div className=" backdrop-blur-sm bg-white/30 top-0 left-0 absolute z-0 w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
