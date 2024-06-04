import Button from "@/components/Button";
import TextInput, { InputType } from "@/components/TextInput";
import { useRoutine } from "@/hooks/useRoutine";
import { AmenityItem } from "@/lib/contracts/routine";
import { removeStayAmenity } from "@/services/api/routine";
import { updateStay } from "@/services/api/stay-api";
import { useToast } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { BeatLoader } from "react-spinners";

interface Props {
  amenities: AmenityItem[];
  id: string;
  close: () => void;
  refetch: () => void;
  unique: string;
}
const EditAmenitiesForm: FC<Props> = ({
  amenities,
  id,
  close,
  refetch,
  unique,
}) => {
  const { amenities: amenity } = useRoutine();
  const toast = useToast();
  const [uniqueVal, setUniqueVal] = useState(unique);
  const [isBusy, setIsBusy] = useState(false);
  const defaultVals = () => amenities.map((item) => item.id);
  const [selectedAmenities, setSelectedAmenities] =
    useState<string[]>(defaultVals);
  const [newAmenities, setNewAmenities] = useState<string[]>(defaultVals);

  const handleRemove = async (amenId: string) => {
    const payload = {
      amenity: amenId,
    };
    await removeStayAmenity(id, payload)
      .then(() => {})
      .catch((err) => {
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (e.target.checked) {
      if (!selectedAmenities.includes(val)) {
        setSelectedAmenities([...selectedAmenities, val]);
        setNewAmenities([...newAmenities, val]);
      }
    } else {
      if (selectedAmenities.includes(val)) {
        if (defaultVals().includes(val)) {
          handleRemove(val);
        }
        const filtered = selectedAmenities.filter((where) => where !== val);
        setSelectedAmenities(filtered);
      }
    }
  };

  const handleSubmit = async () => {
    setIsBusy(true);
    const payload = {
      uniqueFeature: uniqueVal,
      ...(!!newAmenities.length && {
        amenities: newAmenities.map((item) => ({
          id: item,
        })),
      }),
    };
    await updateStay(id, payload)
      .then((res) => {
        setIsBusy(false);
        toast({
          render: () => (
            <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
              {res.message}
            </div>
          ),
          position: "top",
        });
        refetch();
        close();
      })
      .catch((err) => {
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      });
  };
  return (
    <div>
      <div className="grid gap-4">
        {amenity?.data?.map((item: AmenityItem) => (
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
      </div>
      <div className="mt-5">
        <TextInput
          label="Unique Feature"
          type={InputType.text}
          value={uniqueVal}
          labelClassName="text-black fw-600 lg:text-lg block mb-3"
          borderClass="border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] mt-0 outline-none"
          altClassName="bg-[#F9FAFC] p-3 lg:p-4 rounded-[10px] w-full mt-0"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUniqueVal(e.target.value)
          }
          ref={null}
        />
      </div>
      <div className="mt-7 flex justify-end">
        <div className="lg:w-6/12">
          <Button
            title={
              isBusy ? (
                <BeatLoader size={12} color="white" />
              ) : (
                "Update Stay Info"
              )
            }
            type="int"
            disabled={isBusy}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAmenitiesForm;
