import BtnContent from "@/components/btn-content";
import { Link } from "react-router-dom";
import BookingTab from "./booking-tab";
import useAuth from "@/hooks/authUser";

const HeroBanner = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="">
      <div className="hero-bg w-full lg:h-[680px] bg-fit overflow-hidden">
        <div className="box h-full">
          <div className="pt-40 lg:pt-16 2xl:pt-10 h-full items-center lg:flex flex-row-reverse">
            <div className="relative">
              <div className="w-10/12 lg:w-10/12 mx-auto">
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711974956/fantrip/Blob_igum3k.png"
                  alt="hero-image"
                  className="w-full"
                />
              </div>
              <div className="absolute -top-4 lg:-top-8 -left-8 ">
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711975510/fantrip/Frame_1618871305_qxhnui.png"
                  alt="tweet_1"
                  className="w-[190px] lg:w-[250px]"
                />
              </div>
              <div className="absolute -bottom-12 left-4">
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711975508/fantrip/Frame_1618871303_h05qvx.png"
                  alt="tweet_2"
                  className="w-[190px] lg:w-[250px]"
                />
              </div>
              <div className="absolute top-[35%] -right-10 lg:-right-20">
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711975508/fantrip/Frame_1618871304_mzarvc.png"
                  alt="tweet_2"
                  className="w-[190px] lg:w-[250px]"
                />
              </div>
            </div>
            <div className="lg:w-7/12 mt-12 lg:mt-0 pb-24 lg:pb-0">
              <div className="text-white ">
                <p className="text-3xl lg:text-4xl xl:text-[44px] xl:leading-[55px] fw-600 2xl:text-5xl syne ">
                  Screw Cleaning Fees & Generic Travel Guides.
                  <span className="text-gradient syne"> Fan-to-Fan Stays</span>,
                  <span className="syne mt-3 2xl:mt-6"> Done Right.</span>
                </p>
                <div className="monts mt-8 lg:text-lg lg:w-10/12">
                  <div>
                    Why settle for the usual? Book accommodations with fellow
                    fans, explore fan-recommended spots, and say goodbye to
                    hidden costs. Welcome to the future of fan travel!
                  </div>
                </div>
                {!isLoggedIn && (
                  <div className="flex ites-center gap-x-2 md:gap-x-8 mt-8">
                    <div className="mb-1 sm:mb-0">
                      <Link
                        to={"/auth/register"}
                        className="inline-block btn-primary py-2 px-6 md:px-10"
                      >
                        <BtnContent name="Join" />
                      </Link>
                    </div>
                    <div>
                      <Link
                        to={"/auth/login"}
                        className="inline-block sm:mt-0 btn-feel px-6 md:px-10 py-2"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 lg:pt-0 lg:relative -top-10">
        <BookingTab home />
      </div>
    </div>
  );
};

export default HeroBanner;
