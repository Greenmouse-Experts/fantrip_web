import dayjs from "dayjs";
import { FC } from "react";

interface Props {
  type: string;
  text: string;
  date: string;
}
const ChatBubble: FC<Props> = ({ type, text, date }) => {
  if (type === "guest")
    return (
      <div className="rounded-r-[18px] rounded-b-[18px] bg-[#9847fe] text-white p-3 min-w-[200px] max-w-[80%]">
        <p className="fs-500">{text}</p>
        <p className="text-end text-gray-100 text-[10px] italic mt-[4px]">
          {dayjs(date).format("hh:mm a - DD/MM/YYYY")}
        </p>
      </div>
    );
  else if (type === "host")
    return (
      <div className="w-full flex justify-end">
        <div className="rounded-l-[18px] rounded-b-[18px] bg-[#fc81a0] text-black p-3 min-w-[200px] max-w-[80%]">
          <p className="fs-500">{text}</p>
          <p className="text-end text-gray-600 text-[10px] italic mt-[4px]">{dayjs(date).format('hh:mm a - DD/MM/YYYY')}</p>
        </div>
      </div>
    );
    else if (type === "admin")
      return (
        <div className="rounded-r-[18px] rounded-b-[18px] bg-gradient text-white p-3 min-w-[200px] max-w-[80%]">
        <p className="fs-500">{text}</p>
        <p className="text-end text-gray-100 text-[10px] italic mt-[4px]">{dayjs(date).format('hh:mm a - DD/MM/YYYY')}</p>
      </div>
      );
  else return null;
};

export default ChatBubble;
