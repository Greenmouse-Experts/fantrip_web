import  { FC, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './payment-element';
import { useMutation } from '@tanstack/react-query';
import { guestInitatePayment } from '@/services/api/booking-api';
import { useToast } from '@chakra-ui/react';

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
                console.log(data);
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
    <div>
         {(!isPending && data) && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm id={id} secret_key={data.data?.clientSecret || ""} />
          </Elements>
        )}
    </div>
  )
}

export default PaymentModal