import { ComponentModal } from "@/components/modal-component";
import { AmenityItem } from "@/lib/contracts/routine";
import { SpecialStayItem } from "@/lib/contracts/stay";
import { formatName } from "@/lib/utils/formatHelp";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import MeetProfileIndex from "./meet-profile";
import { useMediaQuery } from "@chakra-ui/react";
import { getTempCity } from "@/lib/utils/helper-function";

interface Props {
  item: SpecialStayItem;
}
const SpecialMeetComponent: FC<Props> = ({ item }) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const [isBigSize] = useMediaQuery("(min-width: 520px)");

  const firstName = item.stay.host.firstName;

  
  return (
    <div>
      <div className="stay-item-wrapper grid h-full">
        <div className="rounded-[13px] stay-item p-5 bg-black grid items-stretch grid-cols-2 gap-3">
          <div className="min-h-[170px] max-h-[180px]">
            <img
              src={item.stay.host.picture}
              alt="fan_image"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="row-span-2 h-full grid content-between gap-3 bg-white rounded-[13px] px-3 py-4">
            <div className="">
              <div>
                <p className="text-lg fw-600 syne">Meet {formatName(firstName, 9)}</p>
                <p className="h-[2px] bg-gradient w-full mt-2"></p>
              </div>
              <div className="mt-2">
                <p className="fs-400">
                  {formatName(item.stay.host.bio, isBigSize ? 66 : 40)}{" "}
                  <button
                    className="fw-500 fs-400 text-[#9847FE]"
                    onClick={() => setShowMore(true)}
                  >
                    Read More
                  </button>
                </p>
                <p className="h-[2px] bg-gradient w-full mt-2"></p>
              </div>
              <div className="grid gap-1 mt-2">
                {item.stay.amenities && item.stay.amenities
                  .slice(0, isBigSize ? 3 : 2)
                  .map((item: AmenityItem, i: number) => (
                    <div className="flex gap-x-2" key={i}>
                      <p className="w-[5px] h-[5px] shrink-0 relative top-[10px] circle bg-black"></p>
                      <p className="fs-400">{item.name}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <div
                className="text-white bg-gradient cursor-pointer text-center rounded-[13px] w-full py-3"
                onClick={() => navigate(`/find-stay/${item.id}`)}
              >
                <p className="fs-500 fw-500 capitalize">
                  {formatName(item.stay.city || getTempCity(item.stay.address), 11)}
                </p>
                <p className="fw-500">
                  {item.stay.currency}
                  {item.stay.price}/ night
                </p>
              </div>
            </div>
          </div>
          <div className="min-h-[170px] max-h-[180px]">
            <img
              src={item.stay.host.roomPicture || item.stay.photos[0]}
              alt="room_img"
              className="h-full w-full rounded-lg object-cover"
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

export default SpecialMeetComponent;
