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
