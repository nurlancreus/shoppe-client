export type ProductType = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  stock: number;
  discount: number | null;
};

export type SocialMedia = {
  platform: string;
  url: string;
  ariaLabel: string;
};