import { ChangeEvent, FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import { FaCircleInfo } from "react-icons/fa6";
import Button from "@/components/Button";
import CheckInInput from "./booking-tab-comps/check-in-input";
import CheckOutInput from "./booking-tab-comps/check-out-input";
import GuestNoInput from "./booking-tab-comps/guest-no-input";
import { computePrice, createBooking } from "@/services/api/booking-api";
import { Switch, useToast } from "@chakra-ui/react";
import useDialog from "@/hooks/useDialog";
import BookingSuccess from "./booking-tab-comps/booking-success";
import { BeatLoader } from "react-spinners";
import { formatAsNgnMoney, formatNumber } from "@/lib/utils/formatHelp";
import useAuth from "@/hooks/authUser";
import { useNavigate } from "react-router-dom";
import { getFutureDate, returnNumberOnly } from "@/lib/utils/helper-function";
import EnterFaveName from "./components/enter-favname";
import { GiCash } from "react-icons/gi";

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
  maxNight: number;
  maxGuest: number;
}
const SelectStayDate: FC<Props> = ({
  from,
  to,
  price,
  id,
  currency,
  maxNight,
  maxGuest,
}) => {
  const { isLoggedIn, user, isHost } = useAuth();
  const navigate = useNavigate();
  const [usePoint, setUsePoint] = useState<boolean>(false);
  const [showPointError, setShowPointError] = useState(false);

  const [params, setParams] = useState<SearchParam>({
    city: "",
    checkIn: null,
    checkOut: null,
    no_of_guests: 1,
    no_of_child: null,
  });
  const [isBusy, setIsBusy] = useState(false);
  const [pricing, setPricing] = useState({
    tax: 0,
    fee: 0,
    total: 0,
    night_fee: 0,
  });

  const getInitDate = () => {
    const check = dayjs().isAfter(dayjs(from));
    if (!check) {
      const val = dayjs(from).toDate();
      setParams({ ...params, checkIn: val });
      return val;
    } else {
      const val = dayjs().startOf('date').add(1, 'day').toDate();
      setParams({ ...params, checkIn: val });
      return val;
    }
  };

  const getDefaultEndDate = () => {
    const check = dayjs().isAfter(dayjs(from));
    let start = check ? dayjs().toDate() : dayjs(from).toDate();
    const init = getFutureDate(start, Number(maxNight));
    const checkResult = dayjs(init).isAfter(dayjs(to));
    const initEnd = checkResult ? dayjs(to).toDate() : init;
    if (initEnd) {
      setParams({ ...params, checkOut: initEnd });
    }
    return initEnd;
  };

  const getDiff = () => {
    if (params.checkIn && params.checkOut) {
      const checkIn = dayjs(params.checkIn as unknown as string);
      const checkOut = dayjs(params.checkOut as unknown as string);
      const diffence = checkIn.diff(checkOut, "day");
      return returnNumberOnly(String(diffence));
    }
    return 1;
  };

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
    const payload = {
      checkIn: dayjs(params.checkIn as unknown as string).format("YYYY-MM-DD"),
      checkOut: dayjs(params.checkOut as unknown as string).format(
        "YYYY-MM-DD"
      ),
      stay: id,
    };
    setIsBusy(true);
    await computePrice(payload)
      .then((res: any) => {
        setPricing({
          tax: res.taxFee,
          total: res.total,
          fee: res.serviceFee,
          night_fee: res.priceWithNightInclusion,
        });
        setIsBusy(false);
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
      });
  };

  useEffect(() => {
    getTotal();
  }, [params.checkIn, params.checkOut]);

  const handleReserveAction = async () => {
    setIsBusy(true);
    const payload = {
      stay: id,
      checkIn: dayjs(params.checkIn as unknown as string).format("YYYY-MM-DD"),
      checkOut: dayjs(params.checkOut as unknown as string).format(
        "YYYY-MM-DD"
      ),
      adults: params.no_of_guests,
      children: params.no_of_child,
      ...(usePoint && { enableRewardForPayment: true }),
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
        setShowModal(true);
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

  const reserveStay = async () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
    if (isHost) {
      toast({
        render: () => (
          <div className="text-white w-[290px] text-center fw-600 syne bg-[#9847fe] rounded p-3">
            Please switch to guest account to make reservations
          </div>
        ),
        position: "top",
      });
      return;
    }
    if (!user.favTeam) {
      ShowFavModal(true);
      return;
    }
    handleReserveAction();
  };

  // handle check for use point
  const handleDisplayError = () => {
    if (user.points < 50) {
      setShowPointError(true);
      setTimeout(() => {
        setShowPointError(false);
      }, 5000);
    }
  };
  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (user.points < 50) {
        setShowPointError(true);
      } else {
        setUsePoint(true);
      }
    }
  };

  // modal for successful booking
  const { Dialog, setShowModal } = useDialog();

  // enter favourite team
  const { Dialog: FavModal, setShowModal: ShowFavModal } = useDialog();

  return (
    <div className="grid gap-3 mt-4 pb-6">
      <div className="px-2 grid gap-3">
        <div className="border py-2 p-3 border-[#D2D2D2] rounded-[7px] flex gap-x-3 cursor-pointer items-center">
          <CheckInInput
            to={to}
            from={from}
            value={params.checkIn || getInitDate()}
            handleChange={handleChange}
          />
        </div>
        <div className="border py-2 p-3 border-[#D2D2D2] rounded-[7px] flex gap-x-3 cursor-pointer items-center">
          <CheckOutInput
            to={to}
            checkin={params.checkIn}
            value={params.checkOut || getDefaultEndDate()}
            maxNight={maxNight}
            handleChange={handleChange}
          />
        </div>
        <div className="border py-2 p-3 border-[#D2D2D2] rounded-[7px] flex gap-x-3 cursor-pointer items-center">
          <GuestNoInput
            handleChange={handleChange}
            no_of_guests={params.no_of_guests}
            no_of_child={params.no_of_child}
            maxGuest={maxGuest}
          />
        </div>
        <div>
          <div>
            <div className="pt-3 flex justify-between items-center">
              <p className="fw-500">
                {currency}
                {price} &#215; {getDiff()}
                {" night(s)"}
              </p>
              <p className="fw-500 text-lg">
                {pricing.night_fee
                  ? `${currency}${formatNumber(pricing.night_fee)}`
                  : `TBD`}
              </p>
            </div>
            <div className=" py-1 flex justify-between items-center">
              <p className="fw-500">Fantrip service fee</p>
              <p className="fw-500 text-lg">
                {pricing.fee
                  ? `${currency}${formatNumber(pricing.fee)}`
                  : `TBD`}
              </p>
            </div>
            {user?.points >= 0 && (
              <div className="sidebar-shadow bg-[#FFEDF2] dark:bg-[#292526] mt-2 rounded py-3 px-2 flex items-center justify-between">
                <div
                  className="flex gap-x-3 items-center"
                  onClick={handleDisplayError}
                >
                  <div>
                    <Switch
                      checked={false}
                      disabled={user.points < 50}
                      onChange={handleCheckChange}
                      colorScheme="pink"
                      size={"lg"}
                    />
                  </div>
                  <p className="fs-500 fw-500">Redeem Points</p>
                  <p className="flex items-center py-[2px] rounded-lg gap-x-2 bg-prima px-3 fw-500 text-white">
                    <GiCash />
                    <span className="monts fs-500 fw-600">{user.points}</span>
                  </p>
                </div>
                <div>
                  {usePoint && (
                    <p className="fw-600 text-lg text-green-600">
                      -{formatAsNgnMoney(5)}
                    </p>
                  )}
                </div>
              </div>
            )}
            {showPointError && (
              <p className="!text-red-600 fs-300">
                You need at least 50 points to redeem. Keep earning and come
                back to claim your discount!
              </p>
            )}
            {/* <div className=" flex justify-between items-center">
              <p className="fw-500">Taxes</p>
              <p className="fw-500 text-lg">
                {pricing.tax
                  ? `${currency}${formatNumber(pricing.tax)}`
                  : `TBD`}
              </p>
            </div> */}
          </div>
          <div className="mt-3 pt-2 border-t border-[#D2D2D2]">
            <div className="text-lg flex justify-between items-center">
              <p className="fw-500">Total</p>
              <p className="fw-500 text-lg">
                {pricing.total
                  ? `${currency}${formatNumber(
                      pricing.total - (usePoint ? 5 : 0)
                    )}`
                  : `TBD`}
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
      <Dialog title="" size="2xl">
        <BookingSuccess />
      </Dialog>
      <FavModal title="" size="xl">
        <EnterFaveName
          close={() => ShowFavModal(false)}
          handleReserve={handleReserveAction}
        />
      </FavModal>
    </div>
  );
};

export default SelectStayDate;
