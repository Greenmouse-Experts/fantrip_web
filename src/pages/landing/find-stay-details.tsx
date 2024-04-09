import Availability from "@/modules/landing/find-stay/availability";
import CondoDetails from "@/modules/landing/find-stay/condo-details";
import StayGallery from "@/modules/landing/find-stay/gallery";
import CondoRatings from "@/modules/landing/find-stay/ratings";
import SelectStayDate from "@/modules/landing/find-stay/select-stay-date";
import { FaStar } from "react-icons/fa6";

const FindStayDetails = () => {
   const gallery = ['https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590837/fantrip/Rectangle_20_lkftvk.png', 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590837/fantrip/Rectangle_24_ro6k7e.png', 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590837/fantrip/Rectangle_25_ijlcz9.png', 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590838/fantrip/Rectangle_27_bsok1i.png', 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590838/fantrip/Rectangle_26_hw0gpu.png']
  return (
    <div>
      <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
      <div className="py-12">
        <div className="box">
            <div className="lg:flex gap-7 lg:gap-x-12">
                <div className="lg:w-7/12 relative">
                    <StayGallery data={gallery}/>
                    <div className="absolute z-20 top-3 left-3 w-[150px]">
                      <div className="bg-[#FFEDF2] rounded-t-[10px] text-center p-4 pb-7">
                        <p className="fs-300 fw-500">5 Star Rating</p>
                      </div>
                      <div className="p-2 pb-4 pt-6 relative bg-white rounded-b-[10px]">
                        <li className="fs-300">
                        Recommended
                        </li>
                        <li className="fs-300 mt-1">Mountain View</li>
                        <div className="absolute left-0 w-full -top-[12px]  flex justify-center">
                            <div className="w-6 h-6 circle bg-white place-center circle-shadow">
                              <FaStar className="text-sm text-[#9847FE]"/>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="lg:w-5/12 mt-6 lg:mt-0">
                    <div className="form-shadow p-4 rounded-[14px]">
                        <div className="bg-[#FFEDF2] py-4 lg:py-6 rounded-t-[12px]">
                            <p className="w-8/12 fw-600 text-center mx-auto">Choose accurate date for fan stay booking</p>
                        </div>
                        <div>
                          <SelectStayDate/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-7 lg:w-7/12">
              <CondoDetails/>
            </div>
            <div className="mt-7 lg:w-7/12">
              <CondoRatings/>
            </div>
            <div className="mt-7 lg:w-7/12">
              <Availability/>
            </div>
            <div className="mt-12 lg:mt-20 bg-[#EDEDFF] p-4 lg:px-8 lg:py-12 rounded-[11px]">
              <p className="text-[#494949] lg:w-9/12 mx-auto text-center">Make your next game day unforgettable by staying in the heart of the action. Ready to feel the roar of the crowd and the comfort of home? Book now or message us for more details!</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FindStayDetails;
