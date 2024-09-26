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
  userGroup:string;
}
