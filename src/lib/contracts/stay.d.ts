import { AmenityItem, PropertyItem } from "./routine";

export interface AmenityInput {
  id: string;
}
export interface StayItemInput {
  name: string;
  property: string;
  address: string;
  state: string;
  description: string;
  subHead: string;
  highlightFeature: string;
  price: number;
  amenities: AmenityInput[];
  uniqueFeature: string;
  photos: string[];
  specialOffers: string[];
  percentageOff: number;
  availableFrom: string;
  availableTo: string;
  maxNights: number;
}

export interface UpdateStayStatusInput {
  isDisclosed: boolean;
}

export interface StayItem {
  id: string;
  name: string;
  address: string;
  description: string;
  subHead: string;
  highlightFeature: string;
  price: number;
  uniqueFeature: string;
  photos: string[];
  specialOffers: string[];
  percentageOff: number;
  createdDate: string;
  updatedDate: string;
  deletedDate: string | null;
  isDisclosed: boolean;
  createdDate: string;
  property: PropertyItem;
  amenities: AmenityItem[];
}
