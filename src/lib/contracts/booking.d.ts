import { UserItem } from "./auth";
import { StayItem } from "./stay";

export interface BookingItem {
  id: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  status: string;
  createdDate: string;
  stay: StayItem;
  guest: UserItem
}
