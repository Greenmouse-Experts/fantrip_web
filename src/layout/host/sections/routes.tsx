import { MdAutoMode, MdOutlineDashboard } from "react-icons/md";
import { FaDollarSign, FaStar } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { BsBank, BsChatFill, BsCompassFill } from "react-icons/bs";
import { GiBlackBook } from "react-icons/gi";
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
    icon: <MdOutlineDashboard className="text-xl dark:text-white" />,
    route: "/host",
    submenu: [],
  },
  {
    name: "Bank Accounts",
    icon: <BsBank className="text-xl dark:text-white" />,
    route: "/host/accounts",
    submenu: [],
  },
  {
    name: "Listings",
    icon: <FaStar className="text-xl dark:text-white" />,
    route: "/host/listings",
    submenu: [],
  },
  {
    name: "Reservations",
    icon: <FaUserAlt className="text-lg dark:text-white" />,
    route: "/host/reservations",
    submenu: [],
  },
  {
    name: "Bookings",
    icon: <GiBlackBook className="text-lg dark:text-white" />,
    route: "/host/bookings",
    submenu: [],
  },
  {
    name: "Messaging",
    icon: <BsChatFill className="text-lg dark:text-white" />,
    route: "/host/inbox",
    submenu: [],
  },
  {
    name: "Area guide",
    icon: <BsCompassFill className="text-xl dark:text-white" />,
    route: "/host/area-guide",
    submenu: [],
  },
  // {
  //   name: "Live quiz & predictions",
  //   icon: <MdQuiz className="text-xl dark:text-white" />,
  //   route: "/host/locations",
  //   submenu: [],
  // },
  // {
  //   name: "Locations",
  //   icon: <FaLocationDot className="text-xl dark:text-white" />,
  //   route: "/host/locations",
  //   submenu: [],
  // },
  // {
  //   name: "Exclusive sports content",
  //   icon: <IoFootball className="text-xl dark:text-white" />,
  //   route: "/host/locations",
  //   submenu: [],
  // },
  {
    name: "Host Amenities",
    icon: <MdAutoMode className="text-xl dark:text-white" />,
    route: "/host/amenities",
    submenu: [],
  },
  {
    name: "Payments",
    icon: <FaDollarSign className="text-xl dark:text-white" />,
    route: "/host/payments",
    submenu: [],
  },
];
