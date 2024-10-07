import { FC, useState } from "react";
import ReusableModal from "@/components/ReusableModal";
import useDialog from "@/hooks/useDialog";
import { hostCancelBooking } from "@/services/api/booking-api";
import { useToast } from "@chakra-ui/react";
import { FcCancel } from "react-icons/fc";

interface Props {
  id: string;
  refetch: () => void;
}
const CancelBooking: FC<Props> = ({ id, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const { Dialog, setShowModal } = useDialog();

  const handleCancel = async () => {
    setIsBusy(true);
    await hostCancelBooking(id)
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
    <>
      <p
        className="flex gap-x-1 items-center"
        onClick={() => setShowModal(true)}
      >
        <FcCancel />
        <span className="text-black dark:text-white">Cancel Guest Booking</span>
      </p>
      <Dialog title="" size="md">
        <ReusableModal
          action={handleCancel}
          actionTitle={"Cancel Booking"}
          closeModal={() => setShowModal(false)}
          cancelTitle="Close"
          title={`Are you sure you want to cancel this booking`}
          isBusy={isBusy}
          type={"warning"}
        />
      </Dialog>
    </>
  );
};

export default CancelBooking;
