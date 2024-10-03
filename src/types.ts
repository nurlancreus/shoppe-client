export type ImageType = {
  id: string;
  url: string;
  isMain: boolean;
};

export type AdditionalInfoType = {
  weight: number; // In grams
  dimentions: [number, number, number]; // Length x Width x Height
  colors: string[];
  material: string[];
};

export type ReviewType = {
  id: string,
  firstName: string;
  lastName: string;
  date: Date; // Make sure to handle the date format properly in your app
  body: string;
  rating: RatingValueType;
};

export type ProductType = {
  id: string;
  name: string;
  price: number;
  stock: number;
  discount: number | null;
  description: string;
  additionalInfo: AdditionalInfoType;
  images: ImageType[];
  reviews: ReviewType[]; // New property to hold reviews
  avRating: number; // New property for average rating
};

export type SocialMedia = {
  id: string
  platform: string;
  url: string;
  ariaLabel: string;
};

export type RatingValueType = 0 | 1 | 2 | 3 | 4 | 5;
