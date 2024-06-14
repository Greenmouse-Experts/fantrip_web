import { FC } from "react";
import AboutHostSection from "./profile-pop/about-host-section";
import HostReviews from "./profile-pop/host-reviews";
import VerifyDetails from "./profile-pop/verify-details";
import PreviousListing from "./profile-pop/prevoius-listing";
import { FaRegFlag } from "react-icons/fa6";

interface Props {
  close: () => void;
}
const MeetProfileIndex: FC<Props> = ({}) => {
  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="m-2 p-4 meet-drop rounded-[23px] bg-white">
        <div className="flex">
          <div className="w-6/12 text-center">
            <div className="w-7/12 mx-auto aspect-square rounded-full bg-gray-400"></div>
            <p className="fw-600 text-xl lg:text-3xl my-1">Chris</p>
            <p className="fw-600 text-green-600 fs-500">Verified Host</p>
          </div>
          <div className="w-6/12 flex justify-center">
            <div className="w-7/12 grid divide-y-2">
              <div>
                <p className="fw-600 text-2xl">113</p>
                <p>Reviews</p>
              </div>
              <div className="pt-1 mt-1">
                <p className="fw-600 text-2xl">113</p>
                <p>Reviews</p>
              </div>
              <div className="pt-1 mt-1">
                <p className="fw-600 text-2xl">113</p>
                <p>Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div>
          <AboutHostSection />
        </div>
        <p className="bg-gradient p-[0.4px] my-7"></p>
        <div>
          <HostReviews />
        </div>
        <p className="bg-gradient p-[0.4px] my-7"></p>
        <div>
            <VerifyDetails/>
        </div>
        <p className="bg-gradient p-[0.4px] my-7"></p>
        <div>
            <PreviousListing/>
        </div>
        <p className="bg-gradient p-[0.4px] my-7"></p>
        <div className="mb-5">
            <button className="flex gap-x-2 items-center">
                <FaRegFlag/>
                <p className="fw-600 underline">Submit a report</p>
            </button>
        </div>
      </div>
    </div>
  );
};

export default MeetProfileIndex;
