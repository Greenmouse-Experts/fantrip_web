import BtnContent from "@/components/btn-content";
import { Link } from "react-router-dom";
import BookingTab from "./booking-tab";

const HeroBanner = () => {
  return (
    <div className="">
      <div className="hero-bg lg:h-[90vh] bg-fit overflow-hidden">
       <div className="box h-full">
       <div className="pt-40 lg:pt-16 2xl:pt-10 h-full items-center lg:flex flex-row-reverse">
          <div className="relative">
            <div className="w-10/12 lg:w-10/12 mx-auto">
                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711974956/fantrip/Blob_igum3k.png" alt="hero-image" className="w-full" />
            </div>
            <div className="absolute -top-4 lg:-top-8 -left-8 ">
                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711975510/fantrip/Frame_1618871305_qxhnui.png" alt="tweet_1" className="w-[190px] lg:w-[250px]" />
            </div>
            <div className="absolute -bottom-12 left-4">
                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711975508/fantrip/Frame_1618871303_h05qvx.png" alt="tweet_2" className="w-[190px] lg:w-[250px]"/>
            </div>
            <div className="absolute top-[35%] -right-10 lg:-right-20">
                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711975508/fantrip/Frame_1618871304_mzarvc.png" alt="tweet_2" className="w-[190px] lg:w-[250px]"/>
            </div>
          </div>
          <div className="lg:w-7/12 mt-12 lg:mt-0 pb-24 lg:pb-0">
            <div className="text-white ">
              <p className="text-3xl lg:text-6xl fw-600 2xl:text-6xl syne ">
                Home Field <span className="text-gradient syne">Advantage</span>,
                <span className="syne block mt-3 lg:mt-6">Wherever You Go</span>
              </p>
              <div className="monts mt-8 lg:text-lg">
                <p>Why stay with just anyone when you can live the match with a fellow fan? <br/>Discover <span className="text-gradient monts">fan-fan</span> accommodation, matchday travel logistics, and <br/> community in one play!</p>
              </div>
              <div className="sm:flex ites-center gap-x-8 mt-8">
                <div className="flex sm:block mb-3 sm:mb-0">
                <Link to={'/auth/register'} className="block btn-primary py-2 px-10">
                    <BtnContent name='Join'/>
                </Link>
                </div>
                <Link to={'/auth/login'} className="sm:block mt-4 sm:mt-0 btn-feel px-10 py-2">
                    Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
       </div>
      </div>
      <div className="py-12 lg:pt-0 lg:relative -top-10">
        <BookingTab/>
      </div>
    </div>
  );
};

export default HeroBanner;
