import AreaCategorySearch from "@/modules/landing/area-guide/category-search";
import FanChoice from "@/modules/landing/area-guide/fan-choice";
import LocationSearchBox from "@/modules/landing/area-guide/location-search";
import TopDestination from "@/modules/landing/area-guide/top-destination";

export const AreaGuide = () => {
  return (
    <div className="bg-[#EDEDFF]">
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
            Cheer hard, explore harder!
            </p>
          </div>
        </div>
      </div>
      <div className="py-12 lg:pt-0 lg:relative -top-10">
        <LocationSearchBox />
      </div>
      <div>
        <AreaCategorySearch />
      </div>
      <div className="bg-white">
        <FanChoice/>
      </div>
      <div className="bg-white">
        <TopDestination/>
      </div>
    </div>
  );
};
