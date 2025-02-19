import { formatNumber } from "@/lib/utils/formatHelp";
import { FC } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface Props {
  price?: number;
  currency: string;
  id: string;
  checkin: string;
}
const PaymentButton: FC<Props> = ({ price, currency, id, checkin }) => {
  const isAfter = dayjs().isAfter(dayjs(checkin));
  const navigate = useNavigate();

  return (
    <div>
      <div className={`${price? 'absolute w-full bottom-5' : 'w-full mt-2 lg:mt-0'}`}>
        {isAfter ? (
          <button className={`${price? 'btn-int bg-gray-400 w-full text-center py-1 !fw-600 text-lg' : 'btn-int bg-gray-400 fs-400 w-full text-center py-1 px-2 !fw-600'}`}>
            Past Check-In Date
          </button>
        ) : (
          <button
            className={`${price? 'btn-int w-full text-center py-3 !fw-600 text-lg' : 'btn-int w-[120px] fs-400 text-center py-2 !fw-600'}`}
            onClick={() => navigate(`payment/${id}`)}
          >
            PAY {price && `${currency}${formatNumber(price)}`} NOW
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentButton;
