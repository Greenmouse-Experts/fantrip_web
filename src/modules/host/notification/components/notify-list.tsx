import { FC } from "react";
import dayjs from "dayjs";
import { LuClock } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocalHotel } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { NotifyItem } from "@/lib/contracts/routine";
import { markNotify } from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { formatText } from "@/lib/utils/helper-function";

interface Props {
  data: NotifyItem[];
  type: "all" | "read";
  refetch: () => void;
}
const NotifyList: FC<Props> = ({ data, type, refetch }) => {
  const navigate = useNavigate();
  let notifyToRender = data;
  const toast = useToast();

  if (type === "read") {
    notifyToRender = data.filter((item) => !item.read);
  }

  const readNotify = useMutation({
    mutationFn: markNotify,
  });

  const getRouteName = (name: string) => {
    console.log(name);
    return "";
  };

  const handleReadAndNavigate = (item: NotifyItem) => {
    readNotify.mutate(item.id, {
      onSuccess: () => {
        refetch();
        const route = getRouteName(item.title);
        if (route) {
          navigate(`${route}`);
        }
      },
      onError: (err: any) => {
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
      },
    });
  };

  return (
    <div className="grid gap-3">
      {notifyToRender.map((item) => (
        <div
          className={`flex gap-x-2 border-b p-3  cursor-pointer ${
            item.read && "opacity-60"
          }`}
          onClick={() => handleReadAndNavigate(item)}
          key={item.id}
        >
          <div
            className={`w-[40px] shrink-0 h-[40px] place-center ${
              item.read ? "bg-gray-500" : "bg-orange-800"
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
      ))}
    </div>
  );
};

export default NotifyList;
