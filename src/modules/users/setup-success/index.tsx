import complete from "@/assets/images/setup.webp";
import Button from "@/components/Button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  showSetup: () => void;
}
const SetupCompleted: FC<Props> = ({ showSetup }) => {
    const navigate = useNavigate()
  return (
    <div className="text-center">
      <img src={complete} alt="completed" className="lg:w-3/12 mx-auto" />
      <p className="text-lg fw-500 lg:text-3xl">Hey there, MVP Host! 🏆</p>
      <p className="lg:w-7/12 mt-4 mx-auto">
        Your host profile has been setup, you can now create your listings. Also
        note that your account can only be verified if informations submmited
        during your setup meets Fantrip guildlines.
      </p>
      <div className="mt-6 flex justify-center items-center gap-x-5">
        <Button
          title={"Create a listing"}
          altClassName="btn-int px-5 lg:px-9 py-2 rounded-full"
          onClick={() => navigate('/user/host')}
        />
        <Button
          title={"Edit host profile"}
          onClick={showSetup}
          altClassName="btn-primary px-5 lg:px-9 py-2 rounded-full"
        />
      </div>
    </div>
  );
};

export default SetupCompleted;
