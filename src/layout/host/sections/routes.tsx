import { MdOutlineDashboard } from "react-icons/md";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { FaDollarSign, FaStar } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
export interface RouteType {
  name: string;
  icon: any;
  route: string;
  submenu: {
    name: string;
    icon: any;
    route: string;
  }[];
}
export const Routes = [
  {
    name: "Dashboard",
    icon: <MdOutlineDashboard className="text-xl" />,
    route: "/host",
    submenu: [],
  },
  {
    name: "Listings",
    icon: <FaStar className="text-xl" />,
    route: "/host/listings",
    submenu: [],
  },
  {
    name: "Bookings",
    icon: <FaUserAlt className="text-xl" />,
    route: "/host/bookings",
    submenu: [],
  },
  // {
  //   name: "Locations",
  //   icon: <IoLocationOutline className="text-xl" />,
  //   route: "/host/locations",
  //   submenu: [],
  // },
  {
    name: "Transactions",
    icon: <FaDollarSign className="text-xl" />,
    route: "/host/transact",
    submenu: [],
  },
  {
    name: "Inbox",
    icon: <IoExtensionPuzzleSharp className="text-xl" />,
    route: "/host/inbox",
    submenu: [],
  },
];
