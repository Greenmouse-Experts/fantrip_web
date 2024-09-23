import { FC } from "react";

interface Props {
  next: () => void;
}
const FirstTimeInfo: FC<Props> = ({ next }) => {
  return (
    <div className="text-center">
      <p className="fw-500 text-xl">Welcome to fantrip! 🏆</p>
      <p className="px-5 pt-6">
        You&apos;re so close! Complete your profile to unlock all the features
        and maximize your experience.
      </p>
      <div className="flex justify-center mt-7">
        <p className="fw-600 text-prima cursor-pointer" onClick={next}>
          Click to continue
        </p>
      </div>
    </div>
  );
};

export default FirstTimeInfo;
