// import { Button } from "@material-tailwind/react";
import Button from "@/components/Button";
import { guestConfirmPayment } from "@/services/api/booking-api";
import { useToast } from "@chakra-ui/react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { useNavigate} from "react-router-dom";
// import useRequestStore from "../../../../store/serviceStore";

interface Props {
  secret_key: string;
  id: string;
}
const CheckoutForm: FC<Props> = ({}) => {
  const stripe = useStripe();
  const elements = useElements();
  const {mutate } = useMutation({
    mutationFn: guestConfirmPayment,
    mutationKey: ['guest-confirm-payment']
})
  const toast = useToast()
  const navigate = useNavigate()

  const confirmPayment = async (secret:string | null) => {
   mutate({
    thirdPartyRef: secret || ''
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
          console.log(data);
          
          navigate(`/user/booking-success/${data.data.trxId}`)
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

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://fantrip.netlify.app/",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      toast({
        title: result.error.message,
        isClosable: true,
        position: "top",
        status: "error",
      });
    } else {
      confirmPayment(result.paymentIntent.id)
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="mt-8 flex justify-end">
        <Button title={'Proceed'} type="int" altClassName="px-6 rounded-lg py-3 fw-600 text-lg btn-int"/>
      </div>
    </form>
  );
};

export default CheckoutForm;
