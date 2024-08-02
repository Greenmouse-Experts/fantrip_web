export interface FetchStayParamItem {
  property: string;
  name: string;
  state: string;
  guests: number;
  city: string;
  checkIn: string;
  checkOut: string;
  address: string;
}
export interface UtilsStoreItem {
  fetchStay: FetchStayParamItem;
  guestReserveTab: number;
  guestBookTab: number;
  stayModal: boolean;
}
