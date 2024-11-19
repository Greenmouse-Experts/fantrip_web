import { FC, useEffect, useState } from "react";
import { QuizQuestion } from "@/lib/contracts/chat";
import useAuth from "@/hooks/authUser";
import { extractNumbers } from "@/lib/utils/formatHelp";
import { useNavigate } from "react-router-dom";

interface Props {
  data: QuizQuestion;
  socket: any;
}
const QuizQuestionIndex: FC<Props> = ({ data, socket }) => {
  const { token, isLoggedIn, userId } = useAuth();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(data);
  const [showResult, setShowResult] = useState<number>();
  const [answer, setAnswer] = useState<number>(
    Number(extractNumbers(JSON.stringify(data.rightAnswer[0])))
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
  };

  const optionLabel = ["A", "B", "C", "D", "E", "F", "G"];
  const totalCount = quizData?.attemptResults?.reduce(
    (sum, item) => sum + item.total,
    0
  );

  useEffect(() => {
    setQuizData(data);
  }, [data]);

  useEffect(() => {
    const onListenEventPost = (value: any) => {
      if (value.data.quizQuestionId === data.id) {
        setQuizData((prevData) => ({
          ...prevData,
          attemptResults: prevData.attemptResults.map((attempt) => {
            // Find matching result from `value.data.result`
            const updatedResult = value.data.result.find(
              (res: any) => res.option === attempt.option
            );

            // Update fields, but respect the current user's `myAttempt`
            return {
              ...attempt,
              total: updatedResult?.total ?? attempt.total,
              percentage: updatedResult?.percentage ?? attempt.percentage,
              myAttempt:
                updatedResult?.myAttempt && value.data.userId === userId, // Check userId
            };
          }),
        }));
      }
    };

    socket.on(`attempted`, onListenEventPost);

    // Cleanup on unmount
    return () => socket.off(`attempted`, onListenEventPost);
  }, [socket, data.id, token]);

  return (
    <div className="p-2 mb-4 rounded-lg">
      <>
        {quizData.attemptResults.map((item, i) => (
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
                <p className="fs-500 fw-500 pr-3">{item.percentage}%</p>
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
