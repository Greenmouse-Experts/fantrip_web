import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  close: () => void;
}
const StayCreateSuccess: FC<Props> = ({ close }) => {
  return (
    <div>
      <div>
        <FaCheckCircle className="text-[105px] text-green-600 animate-bounce mx-auto" />
      </div>
      <div className="w-9/12 mx-auto text-center mt-6">
        <p>You're In the league now!</p>
        <p className="mt-2">
          Big Cheers for Joining Fantrip! You've just set your listing live and
          have officially joined the Fantrip league, turning your space into a
          key player for sports fans around the globe
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div
          className="btn-int px-6 py-2 bg-black rounded-full"
          onClick={close}
        >
          Close
        </div>
        <Link to={"/host/listings"} className="btn-primary px-4 py-2">
          View Listings
        </Link>
      </div>
    </div>
  );
};

export default StayCreateSuccess;
