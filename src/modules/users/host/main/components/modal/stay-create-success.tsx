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
        <p>
          Dummy text for Successfully creating a stay which will be changed later on.
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
