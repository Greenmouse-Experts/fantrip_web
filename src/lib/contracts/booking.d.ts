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
  guest: UserItem;
}

export interface BookingItemWithPricing extends BookingItem {
  price: number;
  priceWithNightInclusion: number;
  serviceFee: number;
  taxFee: number;
  total: number;
}
