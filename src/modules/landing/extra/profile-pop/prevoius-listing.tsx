import { AvailableStayItem } from "@/lib/contracts/stay";
import SmallMeetComponent from "../small-meet-comp";
import { FC } from "react";

interface Props {
  others: AvailableStayItem[];
  image: string;
  bio: string;
}
const PreviousListing: FC<Props> = ({ others, image, bio }) => {
  return (
    <div>
      <div>
        <p className="text-lg fw-600">Previous Listings</p>
      </div>
      <div className="flex w-full overflow-y-hidden overflow-x-auto gap-x-2 mt-4">
        {!!others.length &&
          others.slice(0, 3).map((item: AvailableStayItem, i: number) => (
            <div className="w-[350px]" key={i}>
              <div className="w-[350px] h-full">
                <SmallMeetComponent item={item} i={i} image={image} bio={bio} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PreviousListing;
