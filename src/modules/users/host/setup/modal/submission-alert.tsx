import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  close: () => void;
}
const SubmissionAlert: FC<Props> = ({ close }) => {
  return (
    <div>
      <div>
        <FaCheckCircle className="text-[105px] text-[#9847FE] animate-bounce mx-auto" />
      </div>
      <div className="w-9/12 mx-auto text-center mt-6">
        <p>
          Your profile information has been sent to the admin for verification.
          You can proceed to create a new lisitng.
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="btn-int px-6 py-2 bg-black rounded-full" onClick={close}>
          Close
        </div>
        <Link to={"/user/host"} className="btn-primary px-4 py-2">
          Start a new listing
        </Link>
      </div>
    </div>
  );
};

export default SubmissionAlert;
