import BtnContent from "@/components/btn-content";
import { ComponentModal } from "@/components/modal-component";
import { useState } from "react";
import SubmitRecommendIndex from "../submit-recommend";
import { useQuery } from "@tanstack/react-query";
import { getSpotsCat } from "@/services/api/places-api";
import { ReccomendationItem, SpotCategoryItem } from "@/lib/contracts/place";
import useAuth from "@/hooks/authUser";
import { useNavigate } from "react-router-dom";
import { FaLocationCrosshairs } from "react-icons/fa6";
import BouncingBall from "@/components/loaders/bouncing-ball";
import EmptyStay from "@/components/empty-states/empty-stay";
import FanChoiceSwiper from "../fan-choice/fan-choice-swiper";

interface IAreaCat {
  searchedResult: { data: ReccomendationItem[] };
  isGettingResult: boolean;
  searchInput: string;
}

const AreaCategorySearch = ({
  searchedResult,
  isGettingResult,
  searchInput,
}: IAreaCat) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["get-spot-categories"],
    queryFn: getSpotsCat,
  });
  const [showSubmit, setShowSubmit] = useState(false);
  const openReccomendModal = () => {
    if (isLoggedIn) {
      setShowSubmit(true);
    } else navigate("/auth/login");
  };
  return (
    <div className="pb-16 lg:pb-20">
      <div className=" place-content-center place-items-center">
      
        {searchInput !== "" && (
          <div className="box">
            {isGettingResult ? (
              <BouncingBall />
            ) : searchedResult?.data?.length === 0 ? (
              <EmptyStay />
            ) : (
              <FanChoiceSwiper data={searchedResult?.data} />
            )}
          </div>
        )}
      </div>
      <div className="box">
        <div className="text-center">
          <p className="syne text-[19px] lg:text-xl fw-600 dark:!text-black">
            Search through recommended spots for your next fan trip 😉
          </p>
          <p className="lg:w-9/12 mb-6 lg:mb-0 text-center mx-auto mt-6 text-[#494949] dark:!text-black">
            Get the best of your stay in any location through the special Area
            Guide feature, choose through recommended spots by satisfied
            enthusiasts like you!{" "}
          </p>
        </div>
        {!isLoading && data && (
          <div className="mt-5 lg:mt-12">
            <div className="grid grid-cols-2 gap-3 lg:flex justify-center lg:gap-x-6">
              {data?.data?.slice(0, 4).map((item: SpotCategoryItem) => (
                <div
                  className="lg:w-auto border cursor-pointer p-3 px-5 lg:px-10 rounded-full border-[#9847FE] flex items-center gap-x-2 lg:gap-x-4"
                  key={item.id}
                  onClick={() => navigate(`/area-guide/${item.name}`)}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt="icon-names"
                      className="w-4 lg:w-9"
                    />
                  ) : (
                    <FaLocationCrosshairs className="text-xl lg:text-2xl text-prima" />
                  )}
                  <p className="fs-200 lg:fs-600 dark:!text-black">{item.name}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 lg:flex justify-center gap-x-6 mt-4 lg:mt-6">
              {data?.data?.slice(4).map((item: SpotCategoryItem) => (
                <div
                  className="border cursor-pointer p-3 px-5 lg:px-10 rounded-full border-[#9847FE] flex items-center gap-x-2 lg:gap-x-4"
                  key={item.id}
                  onClick={() => navigate(`/area-guide/${item.name}`)}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt="icon-names"
                      className="w-4 lg:w-9"
                    />
                  ) : (
                    <FaLocationCrosshairs className="text-xl lg:text-2xl text-prima" />
                  )}
                  <p className="fs-200 lg:fs-600 dark:!text-black">{item.name}</p>
                </div>
              ))}
              <div className="col-span-2">
                <button
                  className="block fs-500 lg:fs-600 px-6 btn-primary py-[19px]"
                  onClick={() => openReccomendModal()}
                >
                  <BtnContent name="Submit a Recommendation" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ComponentModal
        title="Submit a Recommendation"
        shouldShow={showSubmit}
        onClose={() => setShowSubmit(false)}
        type="recommend"
        noClose
      >
        <SubmitRecommendIndex close={() => setShowSubmit(false)} />
      </ComponentModal>
    </div>
  );
};

export default AreaCategorySearch;
