import StayGallery from "./components/gallery";
import CondoDetails from "./components/condo-details";
import "react-calendar/dist/Calendar.css";
import { FC, useState } from "react";
import BtnContent from "@/components/btn-content";
import useStay from "@/hooks/useStay";
import { createStay } from "@/services/api/stay-api";
import { useToast } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import Availability from "./components/availability";
import useDialog from "@/hooks/useDialog";
import StayCreateSuccess from "../modal/stay-create-success";

interface Props {
  setActive: React.Dispatch<React.SetStateAction<number>>;
}
const PreviewListing: FC<Props> = ({ setActive }) => {
  const { stay, clearStay } = useStay();
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
  const { Dialog, setShowModal } = useDialog();

  const handleCreate = async () => {
    if (!checkStay()) {
      return;
    }
    if(!stay.country || !stay.city || !stay.state){
      toast({
        title: 'Please add more information on your address',
        isClosable: true,
        position: "top",
        status: "info",
      });
      return ;
    }
    setIsBusy(true);
    const payload = {
      ...stay,
      subHead: stay.description,
    };
    await createStay(payload)
      .then(() => {
        setIsBusy(false);
        toast({
          render: () => (
            <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
              Listing Created Successfully
            </div>
          ),
          position: "top",
        });
        setShowModal(true);
        clearStay();
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
  const checkStay = () => {
    if (
      // !stay.availableFrom ||
      // !stay.availableTo ||
      !stay.maxNights ||
      !stay.property ||
      !stay.price ||
      !stay.maxGuests
    ) {
      return false;
    } else return true;
  };

  const handleClose = () => {
    setActive(1);
    setShowModal(false);
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="lg:flex gap-7 lg:gap-x-12">
        <div className="lg:w-7/12 relative">
          <StayGallery data={stay.photos} />
        </div>
        <div className="mt-4 lg:mt-0">
          <div>
            <p className="text-lg fw-500 mb-4">Select Available Dates</p>
            <Availability />
          </div>
        </div>
      </div>
      <div className="mt-7 lg:w-7/12">
        <CondoDetails setActive={setActive} />
      </div>
      <div className="mt-8 flex lg:mt-12 justify-between items-center">
        <div
          className="btn-primary cursor-pointer px-6 py-2 lg:py-3"
          onClick={() => setActive(5)}
        >
          <BtnContent reverse name="Prev" />
        </div>
        <div
          className={
            checkStay()
              ? "btn-primary cursor-pointer px-6 py-2 lg:py-3"
              : "text-gray-100 rounded-full cursor-not-allowed fw-500 bg-gray-400 px-6 py-2 lg:py-3"
          }
          onClick={() => handleCreate()}
        >
          {checkStay() && isBusy ? (
            <BeatLoader size={12} color="white" />
          ) : (
            <BtnContent name="Create Listing" />
          )}
        </div>
      </div>
      <Dialog title={""} size={"lg"}>
        <StayCreateSuccess close={() => handleClose()} />
      </Dialog>
    </div>
  );
};

export default PreviewListing;
