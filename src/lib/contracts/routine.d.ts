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
  isDisclosed?: number,
  page?:  number,
  isPublished?: boolean,
}

export enum REUSABLE_MODAL_TYPES {
  WARNING = "warning",
  DELETE = "delete"
}
