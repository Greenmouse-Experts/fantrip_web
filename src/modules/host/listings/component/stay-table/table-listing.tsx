import { FC, useState } from "react";
import { StayItem } from "@/lib/contracts/stay";
// import { useRefetch } from "../../../../hooks/useRefetch";
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
import { FaChevronDown, FaLocationPin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbViewportWide } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import useDialog from "@/hooks/useDialog";
import ReusableModal from "@/components/ReusableModal";
import { updateStayStatus } from "@/services/api/stay-api";
dayjs.extend(relativeTime);

interface Props {
  data: StayItem[];
  refetch: () => void;
}
const StayTableListing: FC<Props> = ({ data, refetch }) => {
  const { Dialog, setShowModal } = useDialog();
  const [isBusy, setIsBusy] = useState(false);
  const toast = useToast();
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
    setIsBusy(true);
    const payload = {
      isDisclosed: selected.type === "publish" ? true : false,
    };
    await updateStayStatus(selected.id, payload)
      .then((res) => {
        setIsBusy(false);
        toast({
          render: () => (
            <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
              {res.message}
            </div>
          ),
          position: "top",
        });
        setShowModal(false);
        refetch();
      })
      .catch((err) => {
        setIsBusy(false);
        toast({
          title: err.response.data.message,
          isClosable: true,
          position: "top",
          status: "error",
        });
      });
  };
  return (
    <>
      <div className="grid gap-3 mt-6">
        {data.map((item: StayItem) => (
          <div
            className="flex gap-x-4 border border-[#343B4F] rounded p-1"
            key={item.id}
          >
            <div className="w-[160px] md:h-[110px] shrink-0 overflow-hidden rounded-[8px]">
              <img
                src={
                  !!item.photos.length
                    ? item.photos[0]
                    : "https://i.insider.com/6418b4bc50c7b20018f151c1?width=800&format=jpeg&auto=webp"
                }
                alt="stay-image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:flex items-center justify-between lg:pr-4">
              <div>
                <div className="md:flex items-center gap-x-2">
                  <p className="lg:text-xl fw-500">{item.name}</p>
                  {item.approved ? (
                    <p className="bg-green-50 inline !text-green-500 px-3 fs-500 fw-500 leading-none py-[3px]">
                      Active
                    </p>
                  ) : (
                    <p className="bg-orange-50 inline !text-orange-500 px-3 fs-500 fw-500 leading-none py-[3px]">
                      Awaiting
                    </p>
                  )}
                </div>
                <p className="syne text-gray-500 dark:text-gray-300">
                  {item.description}
                </p>
                <div className="text-sec gap-x-1 flex md:items-center mt-2 lg:mt-0">
                  <FaLocationPin className="text-sm shrink-0 mt-[7px] md:mt-0" />
                  <p className="fs-400">{item.address}</p>
                </div>
                <p className="lg:mt-2 text-end md:text-left text-gray-400 fs-400">
                  {dayjs(item.createdDate).fromNow()}
                </p>
              </div>
              <div>
                <div className="flex justify-end">
                  <Menu>
                    <MenuButton>
                      <div className="flex gap-x-2 items-center">
                        <p>Status:</p>
                        {item.isDisclosed
                          ? formatStatus["active"]
                          : formatStatus["draft"]}
                        <FaChevronDown className="opacity-60 fs-500" />
                      </div>
                    </MenuButton>
                    <MenuList className="">
                      <MenuItem>
                        {item.isDisclosed ? (
                          <p
                            onClick={() => openStaus("unpublish", item.id)}
                            className="text-black"
                          >
                            Unpublish Listing
                          </p>
                        ) : (
                          <p
                            onClick={() => openStaus("publish", item.id)}
                            className="text-black"
                          >
                            Publish Listing
                          </p>
                        )}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <div className="mt-1 md:mt-0 items-center gap-x-2 md:block">
                  <p className="syne text-2xl lg:text-3xl text-end fw-600">
                    {formatAsDollar(item.price)}
                  </p>
                  <div className="flex gap-x-3 pb-3 lg:pb-0 justify-end relative top-[6px] md:top-0">
                    <Link
                      className="underline relative block"
                      to={`/host/listings/${item.id}`}
                    >
                      <Tooltip
                        label="Edit Lisiting"
                        shouldWrapChildren
                        bg="gray.800"
                        aria-label="A tooltip"
                        fontSize="md"
                        className="flex"
                      >
                        <BiEdit className="lg:text-xl inline-block" />{" "}
                        <span className="fs-400 md:fs-600 whitespace-nowrap">
                          Edit Listing
                        </span>
                      </Tooltip>
                    </Link>
                    {item.approved && <Link
                      className="underline relative block"
                      to={`/find-stay/${item.id}`}
                    >
                      <Tooltip
                        label="View Details"
                        shouldWrapChildren
                        bg="gray.800"
                        aria-label="A tooltip"
                        fontSize="md"
                        className="flex gap-x-1"
                      >
                        <TbViewportWide className="lg:text-xl inline-block" />{" "}
                        <span className="fs-400 md:fs-600">View Details</span>
                      </Tooltip>
                    </Link>}
                  </div>
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
          type={"warning"}
        />
      </Dialog>
    </>
  );
};

export default StayTableListing;
