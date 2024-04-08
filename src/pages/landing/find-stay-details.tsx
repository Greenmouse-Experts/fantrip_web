import StayGallery from "@/modules/landing/find-stay/gallery";
import SelectStayDate from "@/modules/landing/find-stay/select-stay-date";

const FindStayDetails = () => {
   const gallery = ['https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590837/fantrip/Rectangle_20_lkftvk.png', 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590837/fantrip/Rectangle_24_ro6k7e.png', 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590837/fantrip/Rectangle_25_ijlcz9.png', 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590838/fantrip/Rectangle_27_bsok1i.png', 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590838/fantrip/Rectangle_26_hw0gpu.png']
  return (
    <div>
      <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
      <div className="py-12">
        <div className="box">
            <div className="lg:flex gap-7 lg:gap-x-12">
                <div className="lg:w-7/12">
                    <StayGallery data={gallery}/>
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
        </div>
      </div>
    </div>
  );
};

export default FindStayDetails;
