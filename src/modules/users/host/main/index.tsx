import { useEffect, useState } from "react";
import SetupSidebar from "./sidebar/setup-sidebar";
import StartListing from "./components/start-listing";
import Pricing from "./components/pricing";
import Amenities from "./components/amenities";
import StayPhotos from "./components/photos";
import SpecialOffer from "./components/special-offers";
import PreviewListing from "./components/preview-listing";

const HostFanIndex = () => {
  const [active, setActive] = useState(1);
  useEffect(() => {
    document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
  },[active])
  return (
    <div>
      {active <= 5 && (
        <div className="flex lg:gap-x-12">
          <div className="lg:w-[35%]">
            <SetupSidebar active={active} />
          </div>
          <div className="lg:w-[65%]">
            {active === 1 && <StartListing next={() => setActive(2)} />}
            {active === 2 && (
              <Pricing prev={() => setActive(1)} next={() => setActive(3)} />
            )}
            {active === 3 && (
              <Amenities prev={() => setActive(2)} next={() => setActive(4)} />
            )}
            {active === 4 && (
              <StayPhotos prev={() => setActive(3)} next={() => setActive(5)} />
            )}
            {active === 5 && (
              <SpecialOffer
                prev={() => setActive(4)}
                next={() => setActive(6)}
              />
            )}
          </div>
        </div>
      )}
      {active === 6 && (<PreviewListing setActive={setActive}/>)}
    </div>
  );
};

export default HostFanIndex;
