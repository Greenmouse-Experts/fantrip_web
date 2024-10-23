import { ReccomendationItem } from "@/lib/contracts/place";
import { formatNumber } from "@/lib/utils/formatHelp";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { FaRegComments, FaRegEdit } from "react-icons/fa";
import GuideImageSlider from "@/components/GuideImageSlider";
import { ComponentModal } from "@/components/modal-component";
import EditRecommendation from "./edit-modal";
import RecommendationReviews from "./reviews";
import RatingComponent from "@/components/rating-component";
import { useToast } from "@chakra-ui/react";
import useDialog from "@/hooks/useDialog";
import { deletePlace } from "@/services/api/places-api";
import ReusableModal from "@/components/ReusableModal";
import { RiDeleteBin5Line } from "react-icons/ri";

interface Props {
  data: ReccomendationItem[];
  refetch: () => void;
}
const ReccomendationListing: FC<Props> = ({ data, refetch }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<ReccomendationItem>();
  const [openReview, setOpenReview] = useState(false);
  const [isBusy, setIsBusy] = useState(false)
  const {Dialog, setShowModal} = useDialog()
  const toast = useToast()

  const openToEdit = (item: ReccomendationItem) => {
    setSelected(item);
    setOpenEdit(true);
  };

   const openToReview = (item: ReccomendationItem) => {
     setSelected(item);
     setOpenReview(true);
   };

   const openDelete = (item: ReccomendationItem) => {
    setSelected(item);
    setShowModal(true)
  }

  const handleDelete = async () => {
    setIsBusy(true)
    await deletePlace(selected?.id || '')
    .then(() => {
      toast({
        render: () => (
          <div className="text-white w-[240px] text-center fw-600 syne bg-gradient rounded p-3">
            Deleted Successfully
          </div>
        ),
        position: "top",
      });
      refetch()
      setShowModal(false);
    })
    .catch((error) => {
      toast({
        title: error.response.data.message,
        isClosable: true,
        position: "top",
        status: "error",
      });
      setIsBusy(false)
    })
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {!!data?.length &&
          data.map((item) => (
            <div className="" key={item.id}>
              <div className="lg:h-[280px] relative">
                <GuideImageSlider images={item.photos} />
                {item.isDisclosed ? (
                  <p className="absolute z-[20] top-2 right-2 text-green-600 bg-green-50 dark:bg-green-600 px-3 py-1 fw-500">
                    Active
                  </p>
                ) : (
                  <p className="absolute z-[20] top-2 right-2 text-orange-600 bg-orange-50 dark:bg-orange-700 px-3 py-1 fw-500">
                    Inactive
                  </p>
                )}
              </div>
              <div className="mt-3 px-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="syne fw-600 lg:text-lg">{item.name}</p>
                    <p className="fw-500 text-prima">{item.spot.name}</p>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    {item.isDisclosed && (
                      <Link to={`/area-guide/${item.spot.name}/${item.id}`}>
                        <HiOutlineViewfinderCircle className="text-xl" />
                      </Link>
                    )}
                    <button onClick={() => openToEdit(item)}>
                      <FaRegEdit className="text-lg relative -top-[2px]" />
                    </button>
                    <button onClick={() => openToReview(item)}>
                      <FaRegComments className="text-lg relative -top-[2px]" />
                    </button>
                    <button onClick={() => openDelete(item)}>
                      <RiDeleteBin5Line className="text-lg text-red-500 relative -top-[2px]" />
                    </button>
                  </div>
                </div>
                <div className="mt-[5px] flex gap-x-2 items-center">
                  <div className="flex text-[#9847FE] fs-500 gap-x-1 items-center">
                    <RatingComponent
                      value={Number(item.avgRating)}
                      setValue={() => false}
                      type="review"
                      size={17}
                    />
                  </div>
                  <div>
                    <p className="fs-400 text-gray-300">
                      {formatNumber(`${item.totalReviews}`)} Reviews
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 fs-500 mt-[5px]">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="text-black">
        <ComponentModal
          shouldShow={openEdit}
          title="Edit Recommendation"
          onClose={() => setOpenEdit(false)}
        >
          <EditRecommendation
            item={selected!}
            close={() => setOpenEdit(false)}
            refetch={refetch}
          />
        </ComponentModal>
        <ComponentModal
          shouldShow={openReview}
          title="View Reviews"
          onClose={() => setOpenReview(false)}
          type="recommend"
        >
          <RecommendationReviews
            id={selected?.id!}
            close={() => setOpenReview(false)}
            refetch={refetch}
          />
        </ComponentModal>
      </div>
      <Dialog title="" size="sm">
        <ReusableModal
          type=""
          title="Are you sure you want to delete this area guide reccomendation?"
          action={handleDelete}
          actionTitle="Yes, Delete"
          cancelTitle="No, Close"
          closeModal={() => setShowModal(false)}
          isBusy={isBusy}
        />
      </Dialog>
    </>
  );
};

export default ReccomendationListing;
