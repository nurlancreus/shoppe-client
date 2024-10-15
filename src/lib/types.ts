export type ImageType = {
  id: string;
  url: string;
  isMain: boolean;
};

export type SessionType = {
  user: UserType;
  issuedAt: Date;
  expiresAt: Date;
  isAuth: boolean;
};

export type UserType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userName?: string;
  roles: ("admin" | "customer")[];
}

export type AdditionalInfoType = {
  weight: number; 
  dimentions: [number, number]; 
  colors: string[];
  materials: string[];
};

export type ReviewType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
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
  id: string;
  platform: string;
  url: string;
  ariaLabel: string;
};

export type BlogType = {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  images: ImageType[];
  tags: string[];
};

export type CommentType = {
  id: string;
  firstName: string;
  lastName: string;
  added: string;
  body: string;
  replies?: CommentType[];
};

export type RatingValueType = 0 | 1 | 2 | 3 | 4 | 5;

export type Token = {
  accessToken: string;
  expiresAt: string;
  refreshToken: string;
};

export type AuthResponse = {
  token: Token;
  isSuccess: boolean;
  message: string;
};

export type CartItemType = {
  id: string;
  title: string;
  category: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type ProductImageDTOType = {
  id: string
  fileName: string;
  pathName: string;
  isMain: boolean;
};

export type ProductDTOType = {
  id: string;
  name: string;
  info: string;
  description: string;
  price: number;
  discount?: number;
  stock: number;
  weight: number;
  height: number;
  width: number;
  materials: string[];
  colors: string[];
  categories: { id: string; name: string }[];
  productImages: ProductImageDTOType[];
  rating: number;
  createdAt: Date;
 // reviews: ReviewType[];
};

export type NewProductDTOType = {
  name: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
  height: number;
  width: number;
  materials: string[];
  colors: string[];
  categories: string[];
  productImages: File[]; 
};

export type CategoryDTOType = {
  id: string;
  name: string;
  description?: string | null;
  type: "Blog" | "Product"
};

export type AppResponse = {
  isSuccess: boolean;
  message?: string | null;
};

export type AppResponseWithData<T> = AppResponse & {
  data: T; 
};

export type PaginatedResponse<T> = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  data: T[]; 
}