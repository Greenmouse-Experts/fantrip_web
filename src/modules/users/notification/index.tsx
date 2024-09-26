import { useState } from "react";
import { getGuestNotify } from "@/services/api/routine";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { NotifyItem } from "@/lib/contracts/routine";
import HueSpinner from "@/components/loaders/hue-spinner";
import Tabs from "@/components/Tabs";
import EmptyNotify from "@/components/empty-states/empty-notify";
import NotifyList from "@/modules/host/notification/components/notify-list";

const NotificationIndex = () => {
  const [page, setPage] = useState(1);
  const toast = useToast();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-guest-notifications"],
    queryFn: () => getGuestNotify(page),
  });

  const count = data?.count;
  const handleNext = () => {
    if (page * 12 >= count) {
      toast({
        title: "This is the last page",
        position: "top",
      });
    } else {
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page === 1) {
      toast({
        title: "This is the first page",
        position: "top",
      });
    } else {
      setPage(page - 1);
    }
  };

  const unreadLength =
    data?.data?.filter((item: NotifyItem) => !item.read)?.length || 0;

  const notifyTabs = [
    {
      title: (
        <div className="flex item-end gap-x-6">
          All{" "}
          <p className="bg-orange-600 place-center text-white fw-500 fs-400 w-8 h-8">
            {data?.data?.length}
          </p>
        </div>
      ),
      content: (
        <NotifyList data={data?.data || []} type="all" refetch={refetch} />
      ),
    },
    {
      title: (
        <div className="flex item-end gap-x-6">
          Unread{" "}
          <p className="bg-orange-600 place-center text-white fw-500 fs-400 w-8 h-8">
            {unreadLength}
          </p>
        </div>
      ),
      content: (
        <NotifyList data={data?.data || []} type="read" refetch={refetch} />
      ),
    },
  ];
  return (
    <div>
      <div className="pt-28 lg:pt-36 bg-layout-gradient"></div>
      <div className="box py-6 min-h-[70vh]">
        {isLoading && (
          <div className="place-center py-12 lg:py-24">
            <HueSpinner size={1.3} />
          </div>
        )}
        {!isLoading && !!data?.data?.length && (
          <Tabs tabs={notifyTabs} type="norm" />
        )}
        {!isLoading && !data?.data?.length && (
          <div>
            <EmptyNotify text="There are currently no notifications" />
          </div>
        )}
        <div className="flex justify-end mt-4">
          {page > 1 && (
            <button className="btn-int px-4 py-2" onClick={handlePrev}>
              Prev
            </button>
          )}
          {count > 10 && (
            <button className="btn-int px-4 py-2" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationIndex;
