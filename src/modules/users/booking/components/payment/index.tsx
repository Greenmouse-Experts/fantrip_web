import { FC } from "react";

interface Props{
    price: number;
    currency: string;
}
const PaymentButton:FC<Props> = ({price, currency}) => {
  return (
   <div>
     <div className="absolute w-full bottom-5">
        <button className="btn-int w-full text-center py-3 !fw-600 text-lg">
            PAY {`${currency}${price}`} NOW
        </button>
    </div>
   </div>
  )
}

export default PaymentButton