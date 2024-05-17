import GoogleButton from "@/components/google-btn";
import { Link } from "react-router-dom";
import logo from "@/assets/images/auth-logo.png";
import RegisterForm from "@/modules/auth/register-form";

const RegistrationPage = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="w-full lg:w-[60%] lg:h-screen overflow-y-auto px-4 lg:px-0">
        <div className="lg:w-8/12 2xl:w-8/12 mx-auto py-12 lg:py-16">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-44 mx-auto" />
          </Link>
          <div className="text-center mt-8 lg:mt-16">
            <p className="text-3xl fw-600">Sign Up</p>
            <p className="mt-5 text-[#828282]">
              Fill in the forms below to create a new Fantrip account.
            </p>
          </div>
          <div className="mt-7 lg:w-10/12 mx-auto">
            <GoogleButton text={"Continue with Google"} />
          </div>
          <div className="relative flex justify-center mt-12">
            <p className="bg-white inter px-6 text-lg lg:px-10 py-2 relative z-10">
              Or
            </p>
            <p className="h-[1px] w-full bg-[#E0E0E0] absolute top-6 left-0"></p>
          </div>
          <div className="mt-6"><RegisterForm/></div>
          <div className="mt-6 text-center">
            <p className='fs-300 sm:fs-500 lg:fs-600'>
              Don’t have an account?{" "}
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
          src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1712574932/fantrip/Rectangle_1_1_zjgn1b.png"
          alt="cover"
          className="absolute w-full h-full object-cover"
        />
        <div className="relative overflow-hidden rounded-xl z-10 w-[400px] 2xl:w-[450px]">
          <div className="relative z-20 py-12 px-6">
            <p className="text-white text-2xl 2xl:text-3xl fw-600">
              Swap those cookie-cutter hotel vibes and anonymous hosts for a
              home
            </p>
            <p className="mt-4 text-white 2xl:text-xl">
              Sign up on Fantrip today where the sports spirit lives!
            </p>
          </div>
          <div className=" backdrop-blur-sm bg-white/30 top-0 left-0 absolute z-0 w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
