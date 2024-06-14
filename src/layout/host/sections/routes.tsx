import { MdAutoMode, MdOutlineDashboard } from "react-icons/md";
import { FaDollarSign, FaLocationDot, FaStar } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { BsChatFill, BsCompassFill } from "react-icons/bs";
import { IoFootball } from "react-icons/io5";
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
    name: "Reservations",
    icon: <FaUserAlt className="text-lg" />,
    route: "/host/reservations",
    submenu: [],
  },
  {
    name: "Bookings",
    icon: <FaUserAlt className="text-lg" />,
    route: "/host/bookings",
    submenu: [],
  },
  {
    name: "Chat Room",
    icon: <BsChatFill className="text-lg" />,
    route: "/host/inbox",
    submenu: [],
  },
  {
    name: "Matchday Area guide",
    icon: <BsCompassFill className="text-xl" />,
    route: "/host/area-guide",
    submenu: [],
  },
  // {
  //   name: "Live quiz & predictions",
  //   icon: <MdQuiz className="text-xl" />,
  //   route: "/host/locations",
  //   submenu: [],
  // },
  // {
  //   name: "Locations",
  //   icon: <FaLocationDot className="text-xl" />,
  //   route: "/host/locations",
  //   submenu: [],
  // },
  // {
  //   name: "Exclusive sports content",
  //   icon: <IoFootball className="text-xl" />,
  //   route: "/host/locations",
  //   submenu: [],
  // },
  {
    name: "Host Amenities",
    icon: <MdAutoMode className="text-xl" />,
    route: "/host/amenities",
    submenu: [],
  },
  {
    name: "Payments",
    icon: <FaDollarSign className="text-xl" />,
    route: "/host/payments",
    submenu: [],
  },
];
