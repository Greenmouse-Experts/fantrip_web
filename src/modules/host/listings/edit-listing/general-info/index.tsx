import StayDetailList from "@/components/text-format/stay-detail-list";
import useDialog from "@/hooks/useDialog";
import { StayItem } from "@/lib/contracts/stay";
import { formatNumber } from "@/lib/utils/formatHelp";
import { FC } from "react";
import { BiEdit } from "react-icons/bi";
import EditGeneralForm from "./edit-form";

interface Props {
  data: StayItem;
  refetch: () => void
}
const GeneralInformation: FC<Props> = ({ data, refetch }) => {
  const {
    name,
    description,
    address,
    price,
    percentageOff,
    currency,
    highlightFeature,
    maxNights,
    maxGuests,
    property
  } = data;
  const {Dialog, setShowModal} = useDialog()
  return (
    <div>
      <div className="flex xl:w-6/12 items-center justify-between mb-4">
        <p className=" fw-600 text-lg">General Information</p>
        <button className="flex items-center gap-x-1" onClick={() => setShowModal(true)}><BiEdit/>Edit</button>
      </div>
      <div>
        <div className="grid lg:grid-cols-2 gap-4">
          <StayDetailList name="Name" value={name} />
          <StayDetailList name="Property Type" value={property.name} />
          <StayDetailList name="Number and Type of Beds" value={description} />
          <StayDetailList name="Location" value={address} />
          <StayDetailList
            name="Price"
            value={`${currency}${formatNumber(price)}`}
          />
          <StayDetailList name="Percentage Off" value={`${percentageOff}%`} />
          <StayDetailList name="Highlight Feature" value={highlightFeature} />
          <StayDetailList name="Maximum Nights" value={`${maxNights}`} />
          <StayDetailList name="Maximun Guests" value={`${maxGuests}`} />
        </div>
      </div>
      <Dialog title="Edit General Information" size="3xl">
        <EditGeneralForm data={data} close={() => setShowModal(false)} refetch={refetch}/>
      </Dialog>
    </div>
  );
};

export default GeneralInformation;
