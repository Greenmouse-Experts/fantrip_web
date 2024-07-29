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
        <p>Don&apos;t Miss the Goal!</p>
        <p className="mt-3">Hey there, superfan! 🏟️</p>
        <p className="mt-3">
          You&apos;re just a few steps away from scoring big with your fantrip
          listing! ⚽ Don&apos;t leave your fellow fans hanging – complete your
          listing and join the league of top hosts.
        </p>
        <p className="mt-3">
          🏆 Finish strong and get ready to welcome fans who share your passion
          for the game.
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div
          className="btn-int px-6 py-2 bg-black rounded-full"
          onClick={close}
        >
          Close
        </div>
        <Link to={"/user/host"} className="btn-primary px-4 py-2">
          Finish my listing
        </Link>
      </div>
    </div>
  );
};

export default SubmissionAlert;
