import { ComponentModal } from "@/components/modal-component";
import { AmenityItem } from "@/lib/contracts/routine";
import { AvailableStayItem } from "@/lib/contracts/stay";
import { formatName } from "@/lib/utils/formatHelp";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import MeetProfileIndex from "./meet-profile";

interface Props {
  item: AvailableStayItem;
  bio?: string;
  image?: string;
  i: number;
}
const SmallMeetComponent: FC<Props> = ({ item, i, bio, image }) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="stay-item-wrapper grid h-full">
        <div
          className="rounded-[13px] stay-item p-5 bg-black grid items-stretch grid-cols-2 gap-3"
          key={i}
        >
          <div className="min-h-[170px]">
            <img
              src={item?.host?.picture || image}
              alt="fan_image"
              className="h-full w-full max-h-[200px] rounded-lg object-cover"
            />
          </div>
          <div className="row-span-2 h-full grid content-between gap-3 bg-white rounded-[13px] px-3 py-4">
            <div className="">
              <div>
                <p className="text-xl fw-600 syne !text-black">Meet</p>
                <p className="h-[2px] bg-gradient w-full mt-2 !text-black"></p>
              </div>
              <div className="mt-2">
                <p className="fs-500 !text-black">
                  {item?.host?.bio
                    ? formatName(item?.host?.bio, 34)
                    : formatName(bio || "", 34)}{" "}
                  {!bio && (
                    <button
                      className="fw-500 fs-500 text-[#9847FE]"
                      onClick={() => setShowMore(true)}
                    >
                      Read More
                    </button>
                  )}
                </p>
                <p className="h-[2px] bg-gradient w-full mt-2"></p>
              </div>
              <div className="grid gap-1 mt-2">
                {!!item?.amenities?.length &&
                  item?.amenities
                    .slice(0, 2)
                    .map((item: AmenityItem, i: number) => (
                      <div className="flex gap-x-2" key={i}>
                        <p className="w-[5px] h-[5px] shrink-0 relative top-[10px] circle bg-black"></p>
                        {item?.name && (
                          <p className="fs-400 !text-black">{formatName(item?.name, 24)}</p>
                        )}
                      </div>
                    ))}
              </div>
            </div>
            <div>
              <div
                className="text-white bg-gradient cursor-pointer text-center rounded-[13px] w-full py-3"
                onClick={() => navigate(`/find-stay/${item?.id}`)}
              >
                <p className="fs-500 fw-500 capitalize">
                  {item?.state || "London"}
                </p>
                <p className="fw-500">
                  {item?.currency}
                  {item?.price}/ night
                </p>
              </div>
            </div>
          </div>
          <div className="min-h-[170px]">
            <img
              src={item?.photos[0]}
              alt="room_img"
              className="h-full w-full max-h-[200px] rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="stay-bg"></div>
      </div>
      <ComponentModal
        title=""
        shouldShow={showMore}
        onClose={() => setShowMore(false)}
        type={"more"}
      >
        <MeetProfileIndex id={item.id} close={() => setShowMore(false)} />
      </ComponentModal>
    </div>
  );
};

export default SmallMeetComponent;
