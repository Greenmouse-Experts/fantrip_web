import { FC, useEffect, useState } from "react";
import { QuizQuestion } from "@/lib/contracts/chat";
import useAuth from "@/hooks/authUser";
import { useNavigate } from "react-router-dom";

interface Props {
  data: QuizQuestion;
  socket: any;
}

const QuizQuestionIndex: FC<Props> = ({ data, socket }) => {
  const { token, isLoggedIn, userId } = useAuth();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState<QuizQuestion>(data); // State for current post
  const [showResult, setShowResult] = useState<number | null>(null); // Tracks user's selected option

  useEffect(() => {
    // Update quizData when new data is provided and reset the state for the current post
    setQuizData(data);
    const myAttemptOption = data.attemptResults.find(
      (attempt) => attempt.myAttempt
    )?.option;
    setShowResult(
      myAttemptOption !== undefined ? Number(myAttemptOption) : null
    );
  }, [data]);

  const hasAttempt = quizData.attemptResults?.some(
    (result) => result.myAttempt
  );

  const markQuestion = (index: number) => {
    if (hasAttempt) {
      return; // Prevent re-voting if the user has already attempted
    }

    if (!isLoggedIn) {
      navigate("/auth/login");
      return; // Redirect to login if the user is not authenticated
    }

    const payload = {
      token,
      quizQuestionId: quizData.id,
      choice: [index],
    };

    socket.emit("attempt", payload);
    setShowResult(index); // Highlight the selected option
  };

  const optionLabel = ["A", "B", "C", "D", "E", "F", "G"];
  const totalCount = quizData?.attemptResults?.reduce(
    (sum, item) => sum + item.total,
    0
  );

  // Ensure that `rightAnswer` is always a string
  if (typeof quizData.rightAnswer !== "string") {
    quizData.rightAnswer = JSON.stringify(quizData.rightAnswer);
  }

  useEffect(() => {
    const onListenEventPost = (value: any) => {
      // Ensure we only update the current quizData if the event matches the current quiz question ID
      if (value.data.quizQuestionId === quizData.id) {
        setQuizData((prevData) => {
          const updatedAttemptResults = prevData.attemptResults.map(
            (attempt) => {
              const updatedResult = value.data.result.find(
                (res: any) => res.option === attempt.option
              );

              return {
                ...attempt,
                total: updatedResult?.total ?? attempt.total,
                percentage: updatedResult?.percentage ?? attempt.percentage,
                myAttempt:
                  attempt.myAttempt ||
                  (updatedResult?.myAttempt && value.data.userId === userId),
              };
            }
          );

          return {
            ...prevData,
            attemptResults: updatedAttemptResults,
          };
        });

        // Check if the user made an attempt and update the highlight
        if (value.data.userId === userId) {
          setShowResult(
            value.data.result.find((res: any) => res.myAttempt)?.option ?? null
          );
        }
      }
    };

    socket.on(`attempted`, onListenEventPost);

    return () => {
      socket.off(`attempted`, onListenEventPost);
    };
  }, [socket, quizData.id, userId]);

  return (
    <div className="p-2 mb-4 rounded-lg">
      {quizData.attemptResults.map((item, i) => (
        <div className="mb-4" key={i}>
          <div
            className="relative flex justify-between items-center cursor-pointer hover:scale-x-105 duration-100"
            onClick={() => markQuestion(i)}
          >
            <div
              className={`flex gap-x-2 items-center justify-between text-white w-full rounded-full ${
                showResult === i || item.myAttempt
                  ? "bg-[#FC819F]"
                  : "bg-prima text-white"
              }`}
            >
              <div
                className={`absolute fw-500 shadow-xl w-12 h-12 circle place-center ${
                  hasAttempt
                    ? JSON.parse(quizData.rightAnswer).includes(i)
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
      <div className="border-t border-gray-400 pt-2 lg:px-3">
        <p>{totalCount} vote(s).</p>
      </div>
    </div>
  );
};

export default QuizQuestionIndex;
