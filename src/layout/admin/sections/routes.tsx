import { MdOutlineDashboard } from "react-icons/md";
import { IoExtensionPuzzleSharp, IoLocationOutline } from "react-icons/io5";
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
    route: "/admin",
    submenu: [],
  },
  {
    name: "Listings",
    icon: <FaStar className="text-xl" />,
    route: "/admin/listings",
    submenu: [],
  },
  {
    name: "Bookings",
    icon: <FaUserAlt className="text-xl" />,
    route: "/admin/bookings",
    submenu: [],
  },
  {
    name: "Locations",
    icon: <IoLocationOutline className="text-xl" />,
    route: "/admin/locations",
    submenu: [],
  },
  {
    name: "Pricing",
    icon: <FaDollarSign className="text-xl" />,
    route: "/admin/pricing",
    submenu: [],
  },
  {
    name: "Inbox",
    icon: <IoExtensionPuzzleSharp className="text-xl" />,
    route: "/admin/inbox",
    submenu: [],
  },
];
