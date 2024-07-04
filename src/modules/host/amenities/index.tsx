import { IoAddCircle } from "react-icons/io5";
import AmenityTableListing from "./components/amenity-table";
import useDialog from "@/hooks/useDialog";
import AddAmenityModal from "./components/add-amenity";
import { useQuery } from "@tanstack/react-query";
import { getHostAmenities } from "@/services/api/routine";
import HueSpinner from "@/components/loaders/hue-spinner";

const HostAmenityIndex = () => {
  const { Dialog, setShowModal } = useDialog();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetch-host-amenity"],
    queryFn: getHostAmenities,
  });
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl syne fw-600 text-white">Host Amenities</p>
        <button
          className="flex gap-x-2 items-center border rounded-lg px-4 py-2"
          onClick={() => setShowModal(true)}
        >
          <IoAddCircle />
          Add <span className="hidden md:inline">New</span> Amenity
        </button>
      </div>
      <div className="mt-6">
        {isLoading && (
          <div className="place-center py-12 lg:py-24">
            <HueSpinner size={1.3} />
          </div>
        )}
        {!isLoading && data && <AmenityTableListing data={data.data} />}
      </div>
      <Dialog title="Add New Amenity">
        <AddAmenityModal close={() => setShowModal(false)} refetch={refetch} />
      </Dialog>
    </div>
  );
};

export default HostAmenityIndex;
