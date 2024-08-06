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

interface Props {
  data: ReccomendationItem[];
  refetch: () => void;
}
const ReccomendationListing: FC<Props> = ({ data, refetch }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<ReccomendationItem>();
  const [openReview, setOpenReview] = useState(false);

  const openToEdit = (item: ReccomendationItem) => {
    setSelected(item);
    setOpenEdit(true);
  };

   const openToReview = (item: ReccomendationItem) => {
     setSelected(item);
     setOpenReview(true);
   };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {!!data.length &&
          data.map((item) => (
            <div className="" key={item.id}>
              <div className="lg:h-[280px] relative">
                <GuideImageSlider images={item.photos} />
                {item.isDisclosed ? (
                  <p className="absolute z-[20] top-2 right-2 text-green-600 bg-green-50 px-3 py-1 fw-500">
                    Active
                  </p>
                ) : (
                  <p className="absolute z-[20] top-2 right-2 text-orange-600 bg-orange-50 px-3 py-1 fw-500">
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
    </>
  );
};

export default ReccomendationListing;
