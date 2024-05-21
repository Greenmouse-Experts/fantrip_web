import StayGallery from "./components/gallery";
import CondoDetails from "./components/condo-details";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "react-calendar/dist/Calendar.css";
import { ChangeEvent, FC, useState } from "react";
import BtnContent from "@/components/btn-content";
import { BsDashLg } from "react-icons/bs";
import useStay from "@/hooks/useStay";
import dayjs from "dayjs";
import { createStay } from "@/services/api/stay-api";
import { useToast } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
interface Props {
  setActive: React.Dispatch<React.SetStateAction<number>>;
}
const PreviewListing: FC<Props> = ({ setActive }) => {
  const [openCal, setOpenCal] = useState(true);
  const { stay, saveStay } = useStay();
  const [value, setValue] = useState<Value>([
    dayjs(stay.availableFrom).toDate() || new Date(),
    dayjs(stay.availableTo).toDate() || null,
  ]);
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const [maxNight, setMaxNight] = useState<number | string>(stay.maxNights);

  const handleChange = (val: Value) => {
    setValue(val);
    setOpenCal(false);
    const daet = val as any;
    saveStay({
      ...stay,
      availableFrom: val ? dayjs(daet[0]).format("YYYY-MM-DD") : "",
      availableTo: val ? dayjs(daet[1]).format("YYYY-MM-DD") : "",
    });
  };

  const handleMaxNight = () => {
    saveStay({
      ...stay,
      maxNights: Number(maxNight),
    });
  };

  const handleCreate = async () => {
    setIsBusy(true);
    const payload = {
      ...stay,
      subHead: stay.description,
      state: 'London'
    }
    await createStay(payload)
      .then(() => {
        setIsBusy(false);
        toast({
          render: () => (
            <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
              Listing Created Successfully
            </div>
          ),
          position: "top",
        });
      })
      .catch((error: any) => {
        toast({
          title: error.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setIsBusy(false);
      });
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="lg:flex gap-7 lg:gap-x-12">
        <div className="lg:w-7/12 relative">
          <StayGallery data={stay.photos} />
        </div>
        <div>
          <div>
            <p className="text-lg fw-500 mb-4">Select Available Dates</p>
            <div>
              <div>
                <DateRangePicker
                  onChange={handleChange}
                  value={value}
                  className={"whitespace-nowrap"}
                  clearIcon={null}
                  minDate={new Date()}
                  rangeDivider={<BsDashLg className="mx-4" />}
                  format="dd/MMM/y"
                  closeCalendar={openCal}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-lg fw-500 mb-4">Maximum Stay Nights</p>
            <input
              type="number"
              value={maxNight}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMaxNight(e.target.value)
              }
              onBlur={handleMaxNight}
              className="p-3 border border-gray-400 w-full outline-none rounded-[8px]"
            />
          </div>
        </div>
      </div>
      <div className="mt-7 lg:w-7/12">
        <CondoDetails setActive={setActive} />
      </div>
      <div className="mt-8 flex lg:mt-12 justify-between items-center">
        <div
          className="btn-primary cursor-pointer px-6 py-2 lg:py-3"
          onClick={() => setActive(5)}
        >
          <BtnContent reverse name="Prev" />
        </div>
        <div
          className="btn-primary cursor-pointer px-6 py-2 lg:py-3"
          onClick={() => handleCreate()}
        >
          {isBusy ? (
            <BeatLoader size={12} color="white" />
          ) : (
            <BtnContent name="Create Listing" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewListing;
