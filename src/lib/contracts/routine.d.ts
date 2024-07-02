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
  isDisclosed?: number;
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
  createdDate: "2024-07-02T15:28:08.862Z";
  gateway: "stripe";
  id: "71128834-4406-41e9-a5b8-5aad34a39cad";
  isSelected: true;
  thirdPartyAccountId: string;
}
