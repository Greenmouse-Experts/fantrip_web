import { ComponentModal } from "@/components/modal-component";
import { formatNumber } from "@/lib/utils/formatHelp";
import { FC, useState } from "react";
import PaymentModal from "./payment-modal";
import dayjs from "dayjs";

interface Props {
  price: number;
  currency: string;
  id: string;
  checkin: string;
}
const PaymentButton: FC<Props> = ({ price, currency, id, checkin }) => {
  const [openModal, setOpenModal] = useState(false);
  const isAfter = dayjs().isAfter(dayjs(checkin));
  return (
    <div>
      <div className="absolute w-full bottom-5">
        {isAfter ? (
          <button className="btn-int bg-gray-400 w-full text-center py-3 !fw-600 text-lg">
            Past Check-In Date
          </button>
        ) : (
          <button
            className="btn-int w-full text-center py-3 !fw-600 text-lg"
            onClick={() => setOpenModal(true)}
          >
            PAY {`${currency}${formatNumber(price)}`} NOW
          </button>
        )}
      </div>
      <ComponentModal
        title="Reservation Payment"
        shouldShow={openModal}
        onClose={() => setOpenModal(false)}
      >
        <PaymentModal id={id} />
      </ComponentModal>
    </div>
  );
};

export default PaymentButton;
