import { FC, useEffect, useState } from "react";
import { PollQuestion } from "@/lib/contracts/chat";
import useAuth from "@/hooks/authUser";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface Props {
  data: PollQuestion;
  socket: any;
}
const PollQuestionIndex: FC<Props> = ({ data, socket }) => {
  const { token, userId, isLoggedIn } = useAuth();
  // const [showPoll, setShowPoll] = useState(false)
  const [voteData, setVoteData] = useState(data);
  // const [showResult, setShowResult] = useState<string>("");

  // const hasTrueValue = data.voteResults?.find((where) => where.myVote);
  const navigate = useNavigate();

  const markQuestion = (index: number) => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
    const payload = {
      token: token,
      pollQuestionId: data.id,
      choice: index,
    };
    socket.emit("voteUnvote", payload);
    // setShowResult(data.id);
  };

  const totalCount = voteData?.voteResults?.reduce(
    (sum, item) => sum + item.total,
    0
  );
  const isExpired = dayjs().isBefore(dayjs(data.expiryDate));

  useEffect(() => {
    setVoteData(data);
  }, [data]);

  useEffect(() => {
    const onListenEventPost = (value: any) => {
      if (value.data.pollQuestionId === data.id) {
        setVoteData((prevData) => {
          // Map through the current vote results to preserve all data
          const updatedVoteResults = prevData.voteResults.map((attempt) => {
            // Find the corresponding updated result from the socket event
            const updatedResult = value.data.result.find(
              (res: any) => res.option === attempt.option
            );

            // Merge the updates, preserving the `myVote` state unless explicitly updated
            return {
              ...attempt,
              total: updatedResult?.total ?? attempt.total,
              percentage: updatedResult?.percentage ?? attempt.percentage,
              myVote:
                updatedResult?.option === attempt.option &&
                value.data.userId === userId
                  ? updatedResult?.myVote
                  : attempt.myVote, // Preserve existing `myVote` if not updated
            };
          });

          return {
            ...prevData,
            voteResults: updatedVoteResults,
          };
        });
      }
    };

    socket.on(`votedUnvoted`, onListenEventPost);

    // Cleanup on unmount
    return () => socket.off(`votedUnvoted`, onListenEventPost);
  }, [socket, data.id, userId]);

  const hasMyVote = voteData?.voteResults?.some((result) => result.myVote);

  return (
    <div className="p-2 mb-4 rounded-lg glass">
      {voteData?.voteResults?.map((item, i) => (
        <div
          className={`border scale-ani border-gray-300 rounded-lg px-3 mb-2 py-2`}
          key={i}
        >
          <div className="flex justify-between items-center">
            <div
              className="flex gap-x-2 items-center"
              onClick={() => !hasMyVote && markQuestion(i)}
            >
              <input
                type="radio"
                defaultChecked={item.myVote}
                disabled={hasMyVote}
              />
              <p className="fs-400">{item.option}</p>
            </div>
            <div>
              <p className="fs-400">
                {item.total} {item.total > 1 ? "votes" : "vote"}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <div className="relative bg-gray-200 h-[15px] rounded-full overflow-hidden">
              <div
                style={{ width: `${item.percentage}%` }}
                className="bg-[#9847FE] h-full"
              ></div>
              <p
                className={`text-[9px] absolute top-[1px] fw-500  w-full text-center ${
                  item.percentage > 45 ? "text-white" : "text-black"
                }`}
              >
                {item.percentage}%
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="border-t border-gray-300 pt-2 lg:px-3">
        <p className="fs-500">
          {totalCount} {totalCount > 1 ? `votes` : `vote`},{" "}
          {!isExpired
            ? "Voting Closed"
            : `expires ${dayjs(data.expiryDate).format(
                "hh:mm a - DD/MM/YYYY"
              )}`}
        </p>
      </div>
    </div>
  );
};

export default PollQuestionIndex;
