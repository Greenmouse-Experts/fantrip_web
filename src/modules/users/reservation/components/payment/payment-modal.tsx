import  { FC, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './payment-element';
import { useMutation } from '@tanstack/react-query';
import { guestInitatePayment } from '@/services/api/booking-api';
import { useToast } from '@chakra-ui/react';
import PaymentFieldShimmer from '@/components/shimmers/payment-fields';
import { STRIPE_KEY } from '@/services/constant';

const stripePromise = loadStripe(`${STRIPE_KEY}`);
interface Props{
    id: string
}
const PaymentModal:FC<Props> = ({id}) => {
    const {mutate, data, isPending} = useMutation({
        mutationFn: guestInitatePayment,
        mutationKey: ['guest-initiate-payment']
    })
    const toast = useToast()
    const handleFetch = () => {
        mutate({
            reservation: id
        }, {
            onSuccess: () => {
                // toast({
                //   render: () => (
                //     <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
                //       {data.message}
                //     </div>
                //   ),
                //   position: "top",
                // });
            },
            onError: (err:any) => {
                toast({
                    title: err.response.data.message,
                    isClosable: true,
                    position: "top",
                    status: "error",
                  });
            }
        })
    }
    useEffect(() => {
        handleFetch()
    },[])
  const options = {
    clientSecret: `${data?.data?.clientSecret}`,
  };
  return (
    <div className='py-6 px-2'>
        {(isPending && !data) && <PaymentFieldShimmer/>}
         {(!isPending && data) && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm id={id} secret_key={data.data?.clientSecret || ""} />
          </Elements>
        )}
    </div>
  )
}

export default PaymentModal