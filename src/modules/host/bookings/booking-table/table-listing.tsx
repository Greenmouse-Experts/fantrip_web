import { FC, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatAsDollar, formatStatus } from "@/lib/utils/formatHelp";
import { FaLocationPin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbViewportWide } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import useDialog from "@/hooks/useDialog";
import ReusableModal from "@/components/ReusableModal";
import { updateStayStatus } from "@/services/api/stay-api";
import { BookingItem } from "@/lib/contracts/booking";
dayjs.extend(relativeTime);

interface Props {
  data: BookingItem[];
  refetch: () => void;
}
const BookingTableListing: FC<Props> = ({ data, refetch }) => {
  const { Dialog, setShowModal } = useDialog();
  const [isBusy, setIsBusy] = useState(false)
  const toast = useToast()
  const [selected, setSelected] = useState({
    type: "",
    id: "",
  });
  const openStaus = (type: string, id: string) => {
    setSelected({
      type: type,
      id: id,
    });
    setShowModal(true);
  };
  const handleStatus = async () => {
    setIsBusy(true)
    const payload = {
      isDisclosed: selected.type === "Disclose"? true : false
    }
    await updateStayStatus(selected.id, payload)
    .then((res) => {
      setIsBusy(false)
      toast({
        render: () => (
          <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
            {res.message}
          </div>
        ),
        position: "top",
      });
      setShowModal(false);
      refetch()
    })
    .catch((err) => {
      setIsBusy(false)
      toast({
        title: err.response.data.message,
        isClosable: true,
        position: "top",
        status: "error",
      });
    })
  };
  return (
    <>
      <div className="grid gap-3 mt-6">
        {data.map((item: BookingItem) => (
          <div
            className="flex gap-x-4 border border-[#343B4F] rounded p-1"
            key={item.id}
          >
            <div className="w-[160px] h-[110px] shrink-0 overflow-hidden rounded-[8px]">
              <img
                src={
                  !!item.stay.photos.length
                    ? item.stay.photos[0]
                    : "https://i.insider.com/6418b4bc50c7b20018f151c1?width=800&format=jpeg&auto=webp"
                }
                alt="stay-image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full flex items-center justify-between lg:pr-4">
              <div>
                <p className="lg:text-xl fw-500">{item.stay.name}</p>
                <p className="syne text-gray-300">{item.stay.description}</p>
                <div className="text-sec gap-x-1 flex items-center">
                  <FaLocationPin className="text-sm" />
                  <p className="fs-400">{item.stay.address}</p>
                </div>
                <p className="mt-2 text-gray-400 fs-400">
                  {dayjs(item.createdDate).fromNow()}
                </p>
              </div>
              <div>
                <div>
                  <Menu>
                    <MenuButton>
                      <div className="flex gap-x-2 items-center">
                        <p>Status:</p>
                        {item.stay.isDisclosed
                          ? formatStatus["active"]
                          : formatStatus["draft"]}
                      </div>
                    </MenuButton>
                    <MenuList className="">
                      <MenuItem>
                        {item.stay.isDisclosed ? (
                          <p
                            onClick={() => openStaus("Retract", item.id)}
                            className="text-black"
                          >
                            Retract Listing
                          </p>
                        ) : (
                          <p
                            onClick={() => openStaus("Disclose", item.id)}
                            className="text-black"
                          >
                            Disclose Listing
                          </p>
                        )}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <p className="synce text-2xl text-end fw-600">
                  {formatAsDollar(item.stay.price)}
                </p>
                <div className="flex gap-x-3 justify-end relative">
                  <Link
                    className="underline relative block"
                    to={`/find-stay/${item.id}`}
                  >
                    <Tooltip
                      label="Edit Lisiting"
                      shouldWrapChildren
                      bg="gray.800"
                      aria-label="A tooltip"
                      fontSize="md"
                    >
                      <BiEdit className="text-xl" />
                    </Tooltip>
                  </Link>
                  <Link
                    className="underline relative block"
                    to={`/find-stay/${item.id}`}
                  >
                    <Tooltip
                      label="View Details"
                      shouldWrapChildren
                      bg="gray.800"
                      aria-label="A tooltip"
                      fontSize="md"
                    >
                      <TbViewportWide className="text-xl" />
                    </Tooltip>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog title="" size="md">
        <ReusableModal
          action={handleStatus}
          actionTitle={selected.type}
          closeModal={() => setShowModal(false)}
          cancelTitle="Close"
          title={`Are you sure you want to ${selected.type} this stay`}
          isBusy={isBusy}
          type={'warning'}
        />
      </Dialog>
    </>
  );
};

export default BookingTableListing;
