import { FC } from "react";
import AboutHostSection from "./profile-pop/about-host-section";
import HostReviews from "./profile-pop/host-reviews";
import VerifyDetails from "./profile-pop/verify-details";
import PreviousListing from "./profile-pop/prevoius-listing";
import { FaRegFlag } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getSingleStay } from "@/services/api/stay-api";
import PyramidSpin from "@/components/loaders/pyramid-spin";

interface Props {
  close: () => void;
  id: string;
}
const MeetProfileIndex: FC<Props> = ({ id }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-single-stay", id],
    queryFn: () => getSingleStay(`${id}`),
  });

  return (
    <div className="max-h-[80vh] overflow-y-auto tiny-bar">
      {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {data && (
        <div>
          <div className="lg:m-2 p-4 meet-drop rounded-[23px] bg-white">
            <div className="flex">
              <div className="w-6/12 text-center">
                <div className="w-7/12 mx-auto aspect-square rounded-full bg-gray-400">
                  {data?.host?.picture && (
                    <img
                      src={data?.host?.picture}
                      alt="profile"
                      className="w-full h-full object-cover circle"
                    />
                  )}
                </div>
                <p className="fw-600 text-xl lg:text-3xl my-1">{`${data?.host?.firstName} ${data?.host?.lastName}`}</p>
                {data?.host?.verifiedAsHost ? (
                  <p className="fw-600 text-green-600 fs-500">Verified Host</p>
                ) : (
                  <p className="fw-600 text-orange-600 fs-500">Not Verified</p>
                )}
              </div>
              <div className="w-6/12 flex justify-center">
                <div className="w-10/12 grid divide-y-2">
                  <div>
                    <p className="fw-600 text-2xl">{data?.totalReviews}</p>
                    <p>Reviews</p>
                  </div>
                  <div className="pt-1 mt-1">
                    <p className="fw-600 text-2xl">{data?.avgRating || 0}</p>
                    <p>Rating</p>
                  </div>
                  <div className="pt-1 mt-1">
                    <p className="fw-600">1</p>
                    <p>Month Hosting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div>
              <AboutHostSection
                name={`${data?.host?.firstName} ${data?.host?.lastName}`}
                location={`${data?.host?.state || ""}, ${
                  data?.host?.country || ""
                }`}
                bio={data?.host?.bio}
              />
            </div>
            <p className="bg-gradient p-[0.4px] my-7"></p>
            <div>
              <HostReviews reviews={data?.reviews || []}/>
            </div>
            <p className="bg-gradient p-[0.4px] my-7"></p>
            <div>
              <VerifyDetails
                verifiedId={data?.host?.isIDVerified}
                verifiedEmail={data?.host?.isEmailVerified}
                verifiedPhone={data?.host?.isPhoneVerified}
              />
            </div>
            <p className="bg-gradient p-[0.4px] my-7"></p>
            <div>
              <PreviousListing
                image={data?.host?.picture}
                bio={data?.host?.bio}
                others={data.others || []}
              />
            </div>
            <p className="bg-gradient p-[0.4px] my-7"></p>
            <div className="mb-5">
              <button className="flex gap-x-2 items-center">
                <FaRegFlag />
                <p className="fw-600 underline">Submit a report</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetProfileIndex;
