import { Link } from "react-router-dom";
import success from "@/assets/images/success.gif"
import { FC } from "react";
import useAuth from "@/hooks/authUser";

interface Props{
    close: () => void
}
const SubmitSuccess:FC<Props> = ({close}) => {
  const {isHost} = useAuth()
  return (
    <div>
      <div>
        <img src={success} alt="" className="w-[200px] mx-auto" />
      </div>
      <div className="w-9/12 mx-auto text-center">
        <p className="fw-600 syne text-lg">Recommendation Submitted!</p>
        <p className="mt-2">
          Thanks for submitting an Area Guide recommendation, click on the
          button below to go to your reccomendation listings.
        </p>
      </div>
      <div className="flex justify-between items-center mt-4 lg:mt-7">
        <div
          className="btn-int px-6 py-2 lg:px-12 lg:py-3 bg-black rounded-full"
          onClick={close}
        >
          Close
        </div>
        <Link
          to={isHost ? "/host/area-guide" : "/user/recommendations"}
          className="btn-primary px-4 py-2 lg:px-12 lg:py-3"
        >
          View Listings
        </Link>
      </div>
    </div>
  );
};

export default SubmitSuccess;
