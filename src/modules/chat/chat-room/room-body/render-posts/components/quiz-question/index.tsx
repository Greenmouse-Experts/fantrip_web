import { FC, useState } from "react";
import { QuizQuestion } from "@/lib/contracts/chat";
import useAuth from "@/hooks/authUser";
import { extractNumbers } from "@/lib/utils/formatHelp";
import { useNavigate } from "react-router-dom";

interface Props {
  data: QuizQuestion;
  socket: any;
  reload: () => void;
}
const QuizQuestionIndex: FC<Props> = ({ data, socket, reload }) => {
  const { token, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState<number>();
  const [answer, setAnswer] = useState<number>(
    Number(extractNumbers(data.rightAnswer)[0])
  );
  const hasAttempt = data.attemptResults?.find((where) => where.myAttempt);
  const markQuestion = (index: number) => {
    if (hasAttempt) {
      return;
    }
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
    const payload = {
      token: token,
      quizQuestionId: data.id,
      choice: [index],
    };
    socket.emit("attempt", payload);
    setShowResult(index);
    setAnswer(Number(extractNumbers(data.rightAnswer)[0]));
    reload();
  };

  const optionLabel = ["A", "B", "C", "D", "E", "F", "G"];
  const totalCount = data?.attemptResults?.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="p-2 mb-4 rounded-lg">
      <>
        {data.attemptResults.map((item, i) => (
          <div className="mb-4" key={i}>
            <div
              className="relative flex justify-between items-center cursor-pointer hover:scale-x-105 duration-100"
              onClick={() => markQuestion(i)}
            >
              <div
                className={`flex gap-x-2 items-center justify-between w-full bg-prima text-white rounded-full ${
                  showResult === i || item.myAttempt
                    ? "bg-[#FC819F]"
                    : "bg-prima"
                }`}
              >
                {/* <input type="radio" /> */}
                <div
                  className={`absolute fw-500 shadow-xl w-12 h-12 circle place-center ${
                    hasAttempt
                      ? answer === i
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <p
                    className={`${
                      hasAttempt ? "!text-white" : "dark:!text-black"
                    }`}
                  >
                    {optionLabel[i]}
                  </p>
                </div>
                <p className="fs-500 pl-16 p-2">{item.option}</p>
                {hasAttempt && (
                  <p className="fs-500 fw-500 pr-3">{item.percentage}%</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </>
      <div className="border-t border-gray-400 pt-2 lg:px-3">
        <p>{totalCount} answers.</p>
      </div>
    </div>
  );
};

export default QuizQuestionIndex;
