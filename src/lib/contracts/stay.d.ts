import { UserItem } from "./auth";
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
  currency: string;
  maxGuests: number;
  city: string;
  street: string;
  country: string;
  postal: string;
  suite: string;
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
  discountPrice: number;
  createdDate: string;
  updatedDate: string;
  deletedDate: string | null;
  isDisclosed: boolean;
  createdDate: string;
  maxNights: number;
  availableFrom: string;
  availableTo: string;
  property: PropertyItem;
  amenities: AmenityItem[];
  currency: string;
  host: UserItem;
  state: string;
  maxGuests: number;
  approved: boolean;
  city: string;
  avrRating: string;
  street: string;
  postalCode: string;
  aptSuitUnit: string;
  country: string;
  postal: string;
  suite: string;
}

export interface AvailableStayItem extends StayItem {
  host: {
    id: string;
    firstName: string;
    lastName: string;
    picture: string;
    state: string;
    country: string;
    bio: string;
    roomPicture: string;
  };
}

export interface StayItemUpdate {
  name?: string;
  property?: string;
  address?: string;
  state?: string;
  description?: string;
  subHead?: string;
  highlightFeature?: string;
  price?: number;
  amenities?: AmenityInput[];
  uniqueFeature?: string;
  photos?: string[];
  specialOffers?: string[];
  percentageOff?: number;
  availableFrom?: string;
  availableTo?: string;
  maxNights?: number;
  currency?: string;
  maxGuests?: number;
}

export interface FilterStayParam {
  // property?: string;
  name: string;
  state: string;
  guests: number;
  // city?: string;
  checkIn: string;
  checkOut: string;
  // address?: string;
}

export interface SpecialStayItem {
    createdDate: string;
    id: string;
    published: boolean;
    stay: AvailableStayItem;
    stayId: string;
}
