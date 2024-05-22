import TextInput, { InputType } from "@/components/TextInput";
import BtnContent from "@/components/btn-content";
import { useRoutine } from "@/hooks/useRoutine";
import useStay from "@/hooks/useStay";
import { AmenityItem } from "@/lib/contracts/routine";
import { ChangeEvent, FC, useState } from "react";
import { IoSend } from "react-icons/io5";

interface Props {
  next: () => void;
  prev: () => void;
}
const Amenities: FC<Props> = ({ next, prev }) => {
  const { stay, saveStay } = useStay();
  const { amenities, createAmenity, amenityPending } = useRoutine();
  const defaultVals = () => stay.amenities.map((item) => item.id);
  const [selectedAmenities, setSelectedAmenities] =
    useState<string[]>(defaultVals);
  const [selectedSpecial, setSelectedSpecial] = useState<string>(
    stay.uniqueFeature
  );
  const [showOther, setShowOther] = useState(false);
  const [newAmenity, setNewAmenity] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (e.target.checked) {
      if (!selectedAmenities.includes(val)) {
        setSelectedAmenities([...selectedAmenities, val]);
      }
    } else {
      if (selectedAmenities.includes(val)) {
        const filtered = selectedAmenities.filter((where) => where !== val);
        setSelectedAmenities(filtered);
      }
    }
  };

  const handleAddAmenity = () => {
    if (!newAmenity.length) return;
    const payload = {
      name: newAmenity,
    };
    createAmenity(payload);
    setNewAmenity("");
  };

  const handleAdd = () => {
    const amenities =
      !!selectedAmenities.length &&
      selectedAmenities.map((item) => ({
        id: item,
      }));
    const payload = {
      ...stay,
      amenities: amenities || [],
      uniqueFeature: selectedSpecial,
    };
    saveStay({
      ...payload,
    });
    next();
  };
  return (
    <div>
      <p className="text-xl lg:text-4xl fw-500">
        Amenities and Unique Features
      </p>
      <div className="mt-6">
        <p className="fs-400 lg:fs-600">
          Hosts provide details about standard amenities and unique,
          sports-related features.
        </p>
      </div>
      <div className="mt-8">
        <div className="lg:w-10/12 grid gap-5 grid-cols-2">
          {amenities?.data?.map((item: AmenityItem) => (
            <div className="flex items-center gap-x-3" key={item.id}>
              <input
                type="checkbox"
                name="amenity"
                value={item.id}
                checked={selectedAmenities.includes(item.id)}
                onChange={handleChange}
                className="w-4 h-4 shrink-0"
              />
              <p>{item.name}</p>
            </div>
          ))}
          <div className="col-span-2 lg:mt-5 flex gap-x-3 items-center">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                checked={showOther}
                name="other"
                className="w-4 h-4"
                onChange={() => setShowOther(!showOther)}
              />
              <p>Others</p>
            </div>
            {showOther && (
              <div className="lg:w-6/12 flex justify-between items-center pr-3 border rounded border-[#D2D2D2]">
                <input
                  type="text"
                  className=" p-2 w-full outline-none"
                  onChange={(e) => setNewAmenity(e.target.value)}
                />
                {!amenityPending && (
                  <IoSend
                    className="text-lg text-gray-700"
                    onClick={handleAddAmenity}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-7 lg:mt-12">
        <div className="flex items-center relative">
          <TextInput
            type={InputType.text}
            placeholder="e.g., 'Autographed memorabilia display'"
            label="Unique Features and Sports-Related Amenities"
            labelClassName="text-black fw-600 lg:text-lg block mb-3"
            borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
            altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full"
            value={selectedSpecial}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectedSpecial(e.target.value)
            }
          />
        </div>
      </div>
      <div className="mt-8 lg:mt-16 flex justify-between items-center">
        <div
          className="btn-primary cursor-pointer px-6 py-2 lg:py-3"
          onClick={prev}
        >
          <BtnContent name="Prev" reverse />
        </div>
        <div
          className="btn-primary cursor-pointer px-6 py-2 lg:py-3"
          onClick={handleAdd}
        >
          <BtnContent name="Continue" />
        </div>
      </div>
    </div>
  );
};

export default Amenities;
