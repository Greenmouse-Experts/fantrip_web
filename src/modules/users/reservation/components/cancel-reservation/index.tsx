import ReusableModal from "@/components/ReusableModal";
import useDialog from "@/hooks/useDialog";
import { guestCancelReservation } from "@/services/api/booking-api";
import { useToast } from "@chakra-ui/react";
import { FC, useState } from "react";

interface Props {
  id: string;
  close: () => void;
}
const CancelReservation: FC<Props> = ({ id, close }) => {
  const { Dialog, setShowModal } = useDialog();
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const cancelAction = async () => {
    setIsBusy(true);
    await guestCancelReservation(id)
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
        close();
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
    <div className="dark:text-white">
      <p
        className="!text-red-600 fw-500 cursor-pointer underline fs-500"
        onClick={() => setShowModal(true)}
      >
        Cancel Resevation
      </p>
      <Dialog title="" size="md">
        <ReusableModal
          type="cancel"
          title="Are you sure you want to cancel this reservation?"
          actionTitle="Cancel Reservation"
          action={cancelAction}
          closeModal={() => setShowModal(false)}
          cancelTitle="Close"
          isBusy={isBusy}
        />
      </Dialog>
    </div>
  );
};

export default CancelReservation;
