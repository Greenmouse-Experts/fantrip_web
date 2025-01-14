import { FC } from "react";
import dayjs from "dayjs";
import { LuClock } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdOutlineLocalHotel } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { markNotify } from "@/services/api/routine";
import { formatText } from "@/lib/utils/helper-function";

interface Props {
  data: any;
  type: "all" | "read";
  refetch: () => void;
}
const NotifyList: FC<Props> = ({ data, type, refetch }) => {
  let notifyToRender = data;

  if (type === "read") {
    notifyToRender = data.filter((item: { read: any; }) => !item.read);
  }

  const readNotify = useMutation({
    mutationFn: markNotify,
  });

  const handleReadAndNavigate = (item: any) => {
    readNotify.mutate(item.id, {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
      },
    });
  };

  return (
    <div className="grid gap-3">
      {notifyToRender.map((item: any) => (
        <Link to={item.link} onClick={() => handleReadAndNavigate(item)}>
          <div
            className={`flex gap-x-2 border-b p-3  cursor-pointer ${item.read && "opacity-60"
              }`}
            key={item.id}
          >
            <div
              className={`w-[40px] shrink-0 h-[40px] place-center ${item.read ? "bg-gray-500" : "bg-orange-800"
                }`}
            >
              <MdOutlineLocalHotel className="text-2xl text-white" />
            </div>
            <div className="w-full">
              <div className="w-full flex justify-between">
                <div className="bg-orange-50 dark:bg-darkColorLight text-orange-600 px-2">
                  <p>{item.title}</p>
                </div>
                <div className="flex justify-end gap-x-2 items-center opacity-75">
                  <LuClock />
                  <p>{dayjs(item.createdDate).fromNow()}</p>
                </div>
              </div>
              <div className="mt-1">
                <p>{formatText(item.body)}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NotifyList;
