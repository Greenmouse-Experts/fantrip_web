import { UserItem } from "./auth";

export interface SpotCategoryItem {
  createdDate: string;
  icon: string | null;
  id: string;
  imageUrl: string;
  isDisclosed: boolean;
  name: string;
}
export interface CreatePlaceInput {
  name: string;
  location: string;
  tags: string[];
  description: string;
  photos: string[];
  isDisclosed: boolean;
}

export interface UpdatePlaceInput {
  tags: string[];
  photos: string[];
  description: string;
  location: string;
  isDisclosed: boolean;
}

export interface PlaceItem {
  createdDate: string;
  description: string;
  id: string;
  isDisclosed: boolean;
  location: string;
  name: string;
  photos: string;
  spot: { id: string };
  id: string;
  tags: string;
  user: { id: string };
}

export interface ReccomendationItem {
  createdDate: string;
  description: string;
  id: string;
  isDisclosed: boolean;
  location: string;
  name: string;
  photos: string;
  tags: string;
  spot: PlaceItem;
  user: UserItem;
  totalReviews: number;
  reviews: ReviewResult[];
  avgRating: string | number
}

interface PlaceItemLocation {
  id: string;
  spotId: string;
  location: string;
  searchKey: string;
  picture: string;
  published: boolean;
  createdDate: string; 
  spot: SpotCategoryItem; 
}


export interface CreateReviewItem {
  rating: number;
  comment: string;
  reviewFor: string;
  concern: string;
}

export interface ReviewResult {
  comment: string;
  createdDate: string;
  id: string;
  muted: boolean;
  place: ReccomendationItem;
  rating: number;
  reviewFor: string;
  user: UserItem;
}
export interface ReviewItem {
  avgRating: string;
  results: ReviewResult[];
  totalRating: string;
}
