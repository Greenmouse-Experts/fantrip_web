import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import { FaCircleInfo } from "react-icons/fa6";
import Button from "@/components/Button";
import CheckInInput from "./booking-tab-comps/check-in-input";
import CheckOutInput from "./booking-tab-comps/check-out-input";
import GuestNoInput from "./booking-tab-comps/guest-no-input";
import { computePrice, createBooking } from "@/services/api/booking-api";
import { useToast } from "@chakra-ui/react";
import useDialog from "@/hooks/useDialog";
import BookingSuccess from "./booking-tab-comps/booking-success";
import { BeatLoader } from "react-spinners";
import { formatNumber } from "@/lib/utils/formatHelp";

type ValuePiece = Date | null;
interface SearchParam {
  city: string;
  checkIn: ValuePiece | [ValuePiece, ValuePiece] | null;
  checkOut: ValuePiece | [ValuePiece, ValuePiece] | null;
  no_of_guests: number | null;
  no_of_child: number | null;
}
interface Props {
  from: string;
  to: string;
  price: number;
  currency: string;
  id: string;
  maxNight: number
}
const SelectStayDate: FC<Props> = ({ from, to, price, id, currency, maxNight }) => {
  const [params, setParams] = useState<SearchParam>({
    city: "",
    checkIn: null,
    checkOut: null,
    no_of_guests: null,
    no_of_child: null,
  });
  const [isBusy, setIsBusy] = useState(false);
  const [pricing, setPricing] = useState({
    tax: 0,
    fee: 0,
    total: 0
  })
  const toast = useToast();
  const handleChange = (val: any, field: string) => {
    setParams({ ...params, [field]: val });
  };

  const checkInput = () => {
    if (!params.checkIn || !params.checkOut || !params.no_of_guests) {
      return false;
    } else return true;
  };

  const getTotal = async () => {
    if (!params.checkIn || !params.checkOut) {
      return null;
    }
    const payload={
      checkIn: dayjs(params.checkIn as unknown as string).format("YYYY-MM-DD"),
      checkOut: dayjs(params.checkOut as unknown as string).format(
        "YYYY-MM-DD"
      ),
      stay: id,
    }
    setIsBusy(true)
    await computePrice(payload)
    .then((res:any) => {
      setPricing({
        tax: res.taxFee,
        total: res.total,
        fee: res.serviceFee,
      })
      setIsBusy(false)
    })
    .catch((error) => {
      toast({
        title: error.response.data.message,
        isClosable: true,
        position: "top",
        status: "error",
      });
    })
  };

  useEffect(() => {
    getTotal()
  }, [params.checkIn, params.checkOut])

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
            maxNight={maxNight}
            handleChange={handleChange}
          />
        </div>
        <div className="border py-2 p-3 border-[#D2D2D2] rounded-[7px] flex gap-x-3 cursor-pointer items-center">
          <GuestNoInput
            handleChange={handleChange}
            no_of_guests={params.no_of_guests}
            no_of_child={params.no_of_child}
          />
        </div>
        <div>
          <div>
            <div className="pt-3 flex justify-between items-center">
              <p className="fw-500">Price per night</p>
              <p className="fw-500 text-lg">{currency}{price}</p>
            </div>
            <div className=" py-1 flex justify-between items-center">
              <p className="fw-500">Fantrip service fee</p>
              <p className="fw-500 text-lg">{pricing.fee ? `${currency}${formatNumber(pricing.fee)}` : `TBD`}</p>
            </div>
            <div className=" flex justify-between items-center">
              <p className="fw-500">Taxes</p>
              <p className="fw-500 text-lg">{pricing.tax ? `${currency}${formatNumber(pricing.tax)}` : `TBD`}</p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#D2D2D2]">
            <div className="text-lg flex justify-between items-center">
              <p className="fw-500">Total</p>
              <p className="fw-500 text-lg">
                {pricing.total ? `${currency}${formatNumber(pricing.total)}` : `TBD`}
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
          disabled={!checkInput() || isBusy}
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
