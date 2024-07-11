import Button from "@/components/Button";
import { removeDulicates } from "@/lib/utils/formatHelp";
import { updateStay } from "@/services/api/stay-api";
import { useToast } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { IoSend } from "react-icons/io5";
import { BeatLoader } from "react-spinners";

interface Props {
  refetch: () => void;
  id: string;
  offers: string[];
  close: () => void;
}
const EditSpecialOffers: FC<Props> = ({ refetch, id, offers, close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [initListing, setInitLisitng] = useState([...offers]);
  const [selectedSpecial, setSelectedSpecial] = useState<string[]>([...offers]);
  const [specialInput, setSpecialInput] = useState("");
  const [showOther, setShowOther] = useState(false);
  const toast = useToast();

  const handleSpecialCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (e.target.checked) {
      if (!selectedSpecial.includes(val)) {
        setSelectedSpecial([...selectedSpecial, val]);
      }
    } else {
      if (selectedSpecial.includes(val)) {
        const filtered = selectedSpecial.filter((where) => where !== val);
        setSelectedSpecial(filtered);
      }
    }
  };

  const handleSpecialInput = () => {
    if (!specialInput.length) return;
    if (!selectedSpecial.includes(specialInput)) {
      setInitLisitng([...initListing, specialInput]);
      setSelectedSpecial([...selectedSpecial, specialInput]);
      setSpecialInput("");
    }
  };

  const handleSubmit = async () => {
    setIsBusy(true);
    const payload = {
      specialOffers: selectedSpecial,
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
      <p className="mb-7 fw-500">Deals</p>
      <div className="grid gap-5">
        {removeDulicates(initListing).map((item, i) => (
          <div className="flex items-center gap-x-3" key={i}>
            <input
              type="checkbox"
              value={item}
              checked={selectedSpecial.includes(item)}
              onChange={handleSpecialCheck}
              className="w-4 h-4"
            />
            <p>{item}</p>
          </div>
        ))}
        <div className="lg:mt-5 flex gap-x-3 items-center">
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
            <div className="lg:w-10/12 flex justify-between items-center pr-3 border rounded border-[#D2D2D2]">
              <input
                type="text"
                className=" p-2 w-full outline-none"
                value={specialInput}
                onChange={(e) => setSpecialInput(e.target.value)}
              />
              <IoSend
                className="text-lg text-gray-700"
                onClick={handleSpecialInput}
              />
            </div>
          )}
        </div>
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
            onClick={handleSubmit}
            disabled={isBusy}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSpecialOffers;
