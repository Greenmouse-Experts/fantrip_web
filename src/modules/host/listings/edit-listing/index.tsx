import { StayItem } from "@/lib/contracts/stay";
import { FC } from "react";
import EditListingImage from "./edit-images";
import GeneralInformation from "./general-info";
import AmenitiesInfo from "./amenities";
import SpecialOfferInfo from "./special-offer";
import AvailabilityInfo from "./availability-info";

interface Props {
  data: StayItem;
  refetch: () => void;
}
const EditListingIndex: FC<Props> = ({ data, refetch }) => {
  const {
    name,
    photos,
    id,
    amenities,
    uniqueFeature,
    specialOffers,
    availableFrom,
    availableTo,
  } = data;
  return (
    <div>
      <p className="text-2xl syne fw-600">{name}</p>
      <div className="mt-6 grid gap-10">
        <EditListingImage images={photos} id={id} />
        <GeneralInformation data={data} refetch={refetch} />
        <AmenitiesInfo
          amenities={amenities}
          id={id}
          unique={uniqueFeature}
          refetch={refetch}
        />
        <SpecialOfferInfo special={specialOffers} id={id} refetch={refetch} />
        <AvailabilityInfo from={availableFrom} to={availableTo} id={id} refetch={refetch}/>
      </div>
    </div>
  );
};

export default EditListingIndex;
