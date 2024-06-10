import plates from "@/assets/svg/resturant.svg";
import car from "@/assets/svg/car.svg";
import tree from "@/assets/svg/tree.svg";
import wine from "@/assets/svg/wine.svg";
import park from "@/assets/svg/park.svg";
import dunk from "@/assets/svg/dunk.svg";
import BtnContent from "@/components/btn-content";
import { ComponentModal } from "@/components/modal-component";
import { useState } from "react";
import SubmitRecommendIndex from "../submit-recommend";

const AreaCategorySearch = () => {
  const filters = [
    {
      name: "Restaurant",
      image: plates,
    },
    {
      name: "Transportation",
      image: car,
    },
    {
      name: "Tourist Attraction",
      image: tree,
    },
    {
      name: "Sports Bar",
      image: wine,
    },
    {
      name: "Parking",
      image: park,
    },
    {
      name: "Sports Court",
      image: dunk,
    },
  ];
  const [showSubmit, setShowSubmit] = useState(false);
  return (
    <div className="pb-16 lg:pb-20">
      <div className="box">
        <div className="text-center">
          <p className="syne text-[19px] lg:text-xl fw-600">
            Categorically search through recommended spots for your next fan
            trip 😉
          </p>
          <p className="lg:w-9/12 mb-6 lg:mb-0 text-center mx-auto mt-6 text-[#494949]">
            Get the best of your stay in any location through the special Area
            Guide feature, choose through recommended spots by satisfied
            enthusiasts like you!{" "}
          </p>
        </div>
        <div className="mt-5 lg:mt-12">
          <div className="grid gap-4 lg:flex justify-center gap-x-6">
            {filters.slice(0, 4).map((item) => (
              <div className="w-[290px] lg:w-auto border cursor-pointer p-3 px-5 lg:px-10 rounded-full border-[#9847FE] flex items-center gap-x-2 lg:gap-x-4">
                <img src={item.image} alt="icon-names" className="w-9" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 lg:flex justify-center gap-x-6 mt-4 lg:mt-6">
            {filters.slice(4).map((item) => (
              <div className="border cursor-pointer p-3 px-5 lg:px-10 rounded-full border-[#9847FE] flex items-center gap-x-2 lg:gap-x-4">
                <img src={item.image} alt="icon-names" className="w-9" />
                <p>{item.name}</p>
              </div>
            ))}
            <div>
              <button
                className="block px-6 btn-primary py-[19px]"
                onClick={() => setShowSubmit(true)}
              >
                <BtnContent name="Submit a Recommendation" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ComponentModal
        title="Submit a Recommendation"
        shouldShow={showSubmit}
        onClose={() => setShowSubmit(false)}
        type="recommend"
      >
        <SubmitRecommendIndex close={() => setShowSubmit(false)}/>
      </ComponentModal>
    </div>
  );
};

export default AreaCategorySearch;
