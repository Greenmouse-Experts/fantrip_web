import  { FC, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './payment-element';
import { useMutation } from '@tanstack/react-query';
import { guestInitatePayment } from '@/services/api/booking-api';
import { useToast } from '@chakra-ui/react';
import PaymentFieldShimmer from '@/components/shimmers/payment-fields';

const stripePromise = loadStripe(
    "pk_test_51HoQfvKiOZXcwcTbQS0xwfzkxRYCPWQ7VT4Xl6sObmhguPXhX5agZY88UrCsPcAQLKa071M8lQh3kA6DMe42L7IB00ibW8gtHu"
  );
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
            onSuccess: (data) => {
                toast({
                  render: () => (
                    <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
                      {data.message}
                    </div>
                  ),
                  position: "top",
                });
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