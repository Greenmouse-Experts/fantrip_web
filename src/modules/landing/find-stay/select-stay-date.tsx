import { FC, useState } from "react";
import dayjs from "dayjs";
import { FaCircleInfo } from "react-icons/fa6";
import Button from "@/components/Button";
import CheckInInput from "./booking-tab-comps/check-in-input";
import CheckOutInput from "./booking-tab-comps/check-out-input";
import GuestNoInput from "./booking-tab-comps/guest-no-input";
import { createBooking } from "@/services/api/booking-api";
import { useToast } from "@chakra-ui/react";
import useDialog from "@/hooks/useDialog";
import BookingSuccess from "./booking-tab-comps/booking-success";
import { BeatLoader } from "react-spinners";

type ValuePiece = Date | null;
interface SearchParam {
  city: string;
  checkIn: ValuePiece | [ValuePiece, ValuePiece] | null;
  checkOut: ValuePiece | [ValuePiece, ValuePiece] | null;
  no_of_guests: number | null;
}
interface Props {
  from: string;
  to: string;
  price: number;
  id: string;
}
const SelectStayDate: FC<Props> = ({ from, to, price, id }) => {
  const [params, setParams] = useState<SearchParam>({
    city: "",
    checkIn: null,
    checkOut: null,
    no_of_guests: null,
  });
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const handleChange = (val: any, field: string) => {
    setParams({ ...params, [field]: val });
  };

  const checkInput = () => {
    if (!params.checkIn || !params.checkOut || !params.no_of_guests) {
      return false;
    } else return true;
  };

  const getTotal = () => {
    if (!checkInput()) {
      return null;
    }
    const date1 = dayjs(params.checkOut as unknown as string);
    const date2 = dayjs(params.checkIn as unknown as string);
    const dayDiff = date1.diff(date2, "day");
    const total = price * dayDiff;
    const final = total + 10 + 7;
    return final;
  };

  const reserveStay = async () => {
    setIsBusy(true);
    const payload = {
      stay: id,
      checkIn: dayjs(params.checkIn as unknown as string).format("YYYY-MM-DD"),
      checkOut: dayjs(params.checkOut as unknown as string).format(
        "YYYY-MM-DD"
      ),
      adults: params.no_of_guests,
    };
    await createBooking(payload)
      .then((res) => {
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              {res.message}
            </div>
          ),
          position: "top",
        });
        setIsBusy(false);
        setShowModal(true)
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

  // modal for successful booking
  const { Dialog, setShowModal } = useDialog();

  return (
    <div className="grid gap-3 mt-4 pb-6">
      <div className="px-2 grid gap-3">
        <div className="border py-2 p-3 border-[#D2D2D2] rounded-[7px] flex gap-x-3 cursor-pointer items-center">
          <CheckInInput
            to={to}
            from={from}
            value={params.checkIn}
            handleChange={handleChange}
          />
        </div>
        <div className="border py-2 p-3 border-[#D2D2D2] rounded-[7px] flex gap-x-3 cursor-pointer items-center">
          <CheckOutInput
            to={to}
            checkin={params.checkIn}
            value={params.checkOut}
            handleChange={handleChange}
          />
        </div>
        <div className="border py-2 p-3 border-[#D2D2D2] rounded-[7px] flex gap-x-3 cursor-pointer items-center">
          <GuestNoInput
            handleChange={handleChange}
            no_of_guests={params.no_of_guests}
          />
        </div>
        <div>
          <div>
            <div className="pt-3 flex justify-between items-center">
              <p className="fw-500">Price per night</p>
              <p className="fw-500 text-lg">€{price}</p>
            </div>
            <div className=" py-1 flex justify-between items-center">
              <p className="fw-500">Fantrip service fee</p>
              <p className="fw-500 text-lg">€10</p>
            </div>
            <div className=" flex justify-between items-center">
              <p className="fw-500">Taxes</p>
              <p className="fw-500 text-lg">€7</p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#D2D2D2]">
            <div className="text-lg flex justify-between items-center">
              <p className="fw-500">Total (EU)</p>
              <p className="fw-500 text-lg">
                {getTotal() ? `€${getTotal()}` : `TBD`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-x-2">
        <FaCircleInfo className="text-lg text-sec shrink-0 relative top-1 text-[#feb470]" />
        <p className="fs-400 text-gray-700">
          Please note that reservation will only be available for a period of
          24hours without payment.
        </p>
      </div>
      <div className="mt-3">
        <Button
          title={
            isBusy ? (
              <BeatLoader size={12} color="white" />
            ) : (
              "Reserve a fan stay"
            )
          }
          altClassName={`${
            checkInput()
              ? "btn-primary"
              : "bg-gray-500 text-gray-200 cursor-not-allowed"
          } w-full py-3 !fw-600 syne lg:!text-lg rounded-[8px]`}
          disabled={!checkInput()}
          onClick={reserveStay}
        />
      </div>
      <Dialog title="" size="md">
        <BookingSuccess />
      </Dialog>
    </div>
  );
};

export default SelectStayDate;
