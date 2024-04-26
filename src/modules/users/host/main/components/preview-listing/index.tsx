import StayGallery from "./components/gallery";
import CondoDetails from "./components/condo-details";
import Calendar from "react-calendar";
import { FC, useState } from "react";
import BtnContent from "@/components/btn-content";

interface Props{
    setActive: React.Dispatch<React.SetStateAction<number>>
}
const PreviewListing:FC<Props> = ({setActive}) => {
  const [params, setParams] = useState<any>({
    checkIn: null,
    checkOut: null,
  });
  const handleChange = (val: any, field: string) => {
    setParams({ ...params, [field]: val });
  };
  const gallery = [
    "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590837/fantrip/Rectangle_20_lkftvk.png",
    "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590837/fantrip/Rectangle_24_ro6k7e.png",
    "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590837/fantrip/Rectangle_25_ijlcz9.png",
    "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590838/fantrip/Rectangle_27_bsok1i.png",
    "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712590838/fantrip/Rectangle_26_hw0gpu.png",
  ];
  return (
    <div className="w-11/12 mx-auto">
      <div className="lg:flex gap-7 lg:gap-x-12">
        <div className="lg:w-7/12 relative">
          <StayGallery data={gallery} />
        </div>
        <div>
          <p className="text-lg fw-500 mb-4">Select Available Dates</p>
          <Calendar
            onChange={(value) => handleChange(value, "checkIn")}
            value={[params.checkIn, params.checkOut]}
            className={'w-full'}
          />
        </div>
      </div>
      <div className="mt-7 lg:w-7/12">
        <CondoDetails setActive={setActive}/>
      </div>
      <div className="mt-8 flex lg:mt-12 justify-between items-center">
        <div className="btn-primary cursor-pointer px-6 py-2 lg:py-3" onClick={() => setActive(5)}>
          <BtnContent reverse name="Prev" />
        </div>
        <div className="btn-primary cursor-pointer px-6 py-2 lg:py-3" onClick={() => false}>
          <BtnContent name="Create Listing" />
        </div>
      </div>
    </div>
  );
};

export default PreviewListing;
