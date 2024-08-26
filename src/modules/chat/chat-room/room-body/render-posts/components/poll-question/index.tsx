import { FC, useState } from "react";
import { PollQuestion } from "@/lib/contracts/chat";

interface Props {
  data: PollQuestion;
}
const PollQuestionIndex: FC<Props> = ({ data }) => {
  const [showResult, setShowResult] = useState<boolean>(false);
  return (
    <div className="p-2 mb-4 rounded-lg">
      {showResult ? (
        <>
          {data?.voteResults?.map((item, i) => (
            <div
              className={`border border-gray-300 rounded-lg m-2 px-3 py-2`}
              key={i}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                  <input type="radio" disabled />
                  <p className="fs-500">{item.option}</p>
                </div>
                <div>
                  <p className="fs-500">{item.total} votes</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="relative bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}` }}
                    className="bg-[#9847FE] h-full"
                  ></div>
                  <p className="text-[9px] absolute -top-[2px] fw-500 text-black  w-full text-center">
                    {item.percentage}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {data.options.map((item, i) => (
            <div className="mb-1" key={i}>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowResult(true)}
              >
                <div className="flex gap-x-2 items-center">
                  <input type="radio" />
                  <p className="fs-500">{item}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PollQuestionIndex;
