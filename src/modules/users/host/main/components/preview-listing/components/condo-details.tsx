import Button from "@/components/Button";
import { useRoutine } from "@/hooks/useRoutine";
import useStay from "@/hooks/useStay";
import { AmenityItem, PropertyItem } from "@/lib/contracts/routine";
import { formatAsNgnMoney } from "@/lib/utils/formatHelp";
import { FC } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";
import { SlScreenDesktop } from "react-icons/sl";

interface Props {
  setActive: React.Dispatch<React.SetStateAction<number>>;
}
const CondoDetails: FC<Props> = ({ setActive }) => {
  const { stay } = useStay();
  const { amenities, properties } = useRoutine();
  const myAmenity = amenities?.data?.filter((where: AmenityItem) =>
    stay.amenities.some((item) => item.id === where.id)
  );
  const myPropName = properties?.data.filter((where: PropertyItem) => where.id === stay.property)
  return (
    <div>
      <div className="flex items-center justify-between pb-5 lg:pb-8 mt-6 lg:mt-10 border-b border-[#D2D2D2]">
        <div className="">
          <p className="text-lg lg:text-3xl fw-600">{stay.name}</p>
          <p className="mt-2 text-[#494949]">{!!myPropName.length && myPropName[0].name }</p>
          <p className="mt-2 text-[#494949]">{stay.description}</p>
        </div>
        <div>
          <Button
            title={"Edit"}
            onClick={() => setActive(1)}
            altClassName="px-6 py-2 rounded-[20px] border border-[#000000]"
          />
        </div>
      </div>
      <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
        <div className="flex justify-between items-center mb-3">
          <p className="fw-600 lg:text-lg">Amenities and Unique Features</p>
          <div>
            <Button
              title={"Edit"}
              onClick={() => setActive(3)}
              altClassName="px-6 py-2 rounded-[20px] border border-[#000000]"
            />
          </div>
        </div>
        <div className="mt-4">
          <ul className="grid lg:grid-cols-2 gap-5">
            {myAmenity.map((item: AmenityItem) => (
              <li className="flex items-center gap-x-3">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt="icon-description"
                    className="w-[18px]"
                  />
                ) : (
                  <SlScreenDesktop className="text-[#9847FE]" />
                )}
                <p className="fs-400">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="fw-600 lg:text-lg">Special Offers</p>
          <div>
            <Button
              title={"Edit"}
              onClick={() => setActive(5)}
              altClassName="px-6 py-2 rounded-[20px] border border-[#000000]"
            />
          </div>
        </div>
        <div className="mt-5">
          <ul className="grid gap-5">
            {
              stay.specialOffers.map((item, i) => (
                <li className="flex items-center gap-x-3" key={i}>
                <CiDiscount1 className="text-[18px] text-[#9847FE]" />
                <p className="fs-400">{item}</p>
              </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="fw-600 lg:text-lg">Pricing</p>
          <div>
            <Button
              title={"Edit"}
              onClick={() => setActive(2)}
              altClassName="px-6 py-2 rounded-[20px] border border-[#000000]"
            />
          </div>
        </div>
        <div className="mt-5">
          <ul className="grid gap-5">
            <li className="flex items-center gap-x-3">
              <IoPricetagOutline className="text-[18px] text-[#9847FE]" />
              <p className="fs-400">Weekdays: {formatAsNgnMoney(stay.price)}/night</p>
            </li>
            <li className="flex items-center gap-x-3">
              <IoPricetagOutline className="text-[18px] text-[#9847FE]" />
              <p className="fs-400">Game Days/Weekends: {formatAsNgnMoney(stay.price)}/night</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CondoDetails;
