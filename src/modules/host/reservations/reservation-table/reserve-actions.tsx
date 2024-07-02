import Button from "@/components/Button";
import ReusableModal from "@/components/ReusableModal";
import useDialog from "@/hooks/useDialog";
import {
  hostApproveBooking,
  hostCancelReservation,
} from "@/services/api/booking-api";
import { useToast } from "@chakra-ui/react";
import { FC, useState } from "react";

interface Props {
  id: string;
  refetch: () => void;
}
const ReserveActions: FC<Props> = ({ id, refetch }) => {
  const { Dialog: Reject, setShowModal: ShowReject } = useDialog();
  const { Dialog: Accept, setShowModal: ShowAccept } = useDialog();
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const rejectReserve = async () => {
    setIsBusy(true);
    await hostCancelReservation(id)
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
        ShowReject(false);
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
  const acceptReserve = async () => {
    setIsBusy(true);
    await hostApproveBooking(id)
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
        ShowReject(false);
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
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Button
            title={"Reject"}
            onClick={() => ShowReject(true)}
            altClassName="btn-int bg-gray-800 w-full py-2 rounded-full"
          />
        </div>
        <div>
          <Button
            title={"Accept"}
            onClick={() => ShowAccept(true)}
            altClassName="btn-primary w-full rounded-full py-2"
          />
        </div>
      </div>
      <Reject title="" size="md">
        <ReusableModal
          type="warning"
          title="Are you sure you want to reject this Reservation"
          actionTitle="Reject"
          action={rejectReserve}
          cancelTitle="Close"
          closeModal={() => ShowReject(false)}
          isBusy={isBusy}
        />
      </Reject>
      <Accept title="" size="md">
        <ReusableModal
          type="warning"
          title="Are you sure you want to Accept this Reservation"
          actionTitle="Accept"
          action={acceptReserve}
          cancelTitle="Close"
          closeModal={() => ShowAccept(false)}
          isBusy={isBusy}
        />
      </Accept>
    </div>
  );
};

export default ReserveActions;
