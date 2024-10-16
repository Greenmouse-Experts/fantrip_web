import { UserItem } from "./auth";

export interface AmenityItem {
  id: string;
  name: string;
  imageUrl: string | null;
  by: string;
  createdDate: string;
  updatedDate: string;
  deletedDate: string | null;
  isPublished: boolean;
}

export interface AmenityItemInput {
  name: string;
  imageUrl?: string;
}
export interface PropertyItem {
  id: string;
  name: string;
  imageUrl: string | null;
  by: string;
  createdDate: string;
  updatedDate: string;
  deletedDate: string | null;
  isPublished: boolean;
}

export interface FetchParam {
  isDisclosed?: number | null;
  page?: number;
  isPublished?: boolean;
  status?: string;
  isGuest?: boolean;
}

export enum REUSABLE_MODAL_TYPES {
  WARNING = "warning",
  DELETE = "delete",
}

export interface BankAccountItem {
  accountNumber: string;
  accountName: string;
  currency: string;
  accountHolderType: string;
  bankName: string;
  routingNumber: string;
  country: string;
}

export interface BankAccountFullItem extends BankAccountItem {
  createdDate: string;
  gateway: string;
  id: string;
  isSelected: boolean;
  thirdPartyAccountId: string;
}

export interface NotifyItem {
  body: string;
  createdDate: string;
  id: string;
  read: boolean;
  title: string;
  userGroup: string;
}

export interface AnalyticItem {
  availableListings: number;
  booked: number;
  revenuesChart: {
    months: string[];
    revenues: number[];
  };
  reviews: number;
  totalListings: number;
}

export interface TransactItem {
  amount: number;
  booking: {
    createdDate: string;
    currency: string;
    enableRewardForPayment: boolean;
    id: string;
    number: string;
    price: number;
    pricePerNight: number;
    rewardAmount: string | null;
    serviceFee: number;
    status: string;
    tax: number;
    total: number;
  };
  createdDate: string;
  gateway: string;
  id: string;
  narration: string;
  purpose: string;
  reference: string;
  status: string;
  subAmount: string;
  thirdPartyRes: string;
  user: UserItem
}
