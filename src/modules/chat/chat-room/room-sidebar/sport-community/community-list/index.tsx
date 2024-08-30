import { FC, useEffect, useState } from "react";
import ItemRender from "./item-render";
import { useChat } from "@/hooks/useChat";
import dayjs from "dayjs";

export interface CommunityItemTyping {
  id: string;
  name: string;
  icon: string;
  isDisclosed: boolean;
  type: string;
  createdDate: string;
  updatedDate: string;
}
interface Props {
  socket: any;
}
const CommunityList: FC<Props> = ({ socket }) => {
  const { community, saveCommunity } = useChat();
  const [prevCommunities, setPrevCommunities] = useState<CommunityItemTyping[]>(
    []
  );

  const getCommunities = () => {
    const onListenEvent = (value: any) => {
      setPrevCommunities(value.data.result);
    };
    socket.on(`disclosedCommunitiesRetrieved`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`disclosedCommunitiesRetrieved`);
  };

  useEffect(() => {
    const payload = {};
    socket.emit("retrieveDisclosedCommunities", payload);
  }, []);

  useEffect(() => {
    getCommunities();
  }, [socket]);

  const sortedList = prevCommunities?.length
    ? prevCommunities.sort(
        (a: CommunityItemTyping, b: CommunityItemTyping) =>
          dayjs(a.createdDate).unix() - dayjs(b.createdDate).unix()
      )
    : [];

  useEffect(() => {
      saveCommunity({
        ...community,
        communities: sortedList,
      });
  }, [prevCommunities]);

  return (
    <div className="mt-3 grid gap-1">
      {sortedList.map((item: CommunityItemTyping) => (
        <ItemRender item={item} key={item.id} />
      ))}
    </div>
  );
};

export default CommunityList;
