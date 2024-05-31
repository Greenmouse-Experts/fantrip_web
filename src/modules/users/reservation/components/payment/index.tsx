import { ComponentModal } from "@/components/modal-component";
import { formatNumber } from "@/lib/utils/formatHelp";
import { FC, useState } from "react";
import PaymentModal from "./payment-modal";

interface Props {
  price: number;
  currency: string;
  id: string;
}
const PaymentButton: FC<Props> = ({ price, currency, id }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div className="absolute w-full bottom-5">
        <button
          className="btn-int w-full text-center py-3 !fw-600 text-lg"
          onClick={() => setOpenModal(true)}
        >
          PAY {`${currency}${formatNumber(price)}`} NOW
        </button>
      </div>
      <ComponentModal
        title="Reservation Payment"
        shouldShow={openModal}
        onClose={() => setOpenModal(false)}
      >
        <PaymentModal id={id}/>
      </ComponentModal>
    </div>
  );
};

export default PaymentButton;
