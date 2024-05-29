import ReusableModal from "@/components/ReusableModal";
import useDialog from "@/hooks/useDialog";
import { guestCancelBooking } from "@/services/api/booking-api";
import { useToast } from "@chakra-ui/react";
import { FC, useState } from "react";

interface Props {
  id: string;
  refetch: () => void;
}
const CancelBooking: FC<Props> = ({ id, refetch }) => {
  const { Dialog, setShowModal } = useDialog();
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const cancelAction = async () => {
    setIsBusy(true);
    await guestCancelBooking(id)
      .then((data) => {
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              {data.message}
            </div>
          ),
          position: "top",
        });
        setIsBusy(false);
        refetch();
        setShowModal(false);
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
  return (
    <div>
      <p
        className="text-[#9847fe] cursor-pointer underline fs-500"
        onClick={() => setShowModal(true)}
      >
        Cancel Booking
      </p>
      <Dialog title="" size="md">
        <ReusableModal
          type="cancel"
          title="Are you sure you want to cancel this booking?"
          actionTitle="Cancel Booking"
          action={cancelAction}
          closeModal={() => setShowModal(false)}
          cancelTitle="Close"
          isBusy={isBusy}
        />
      </Dialog>
    </div>
  );
};

export default CancelBooking;
