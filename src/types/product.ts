export type ProductImage = {
  url: string;
  altText?: string;
  sortOrder: number;
};

export type ProductVariant = {
  variantId: number;
  sku: string;
  name: string;
  price: number;
  currency: string;
  isActive: boolean;
  quantityOnHand: number;
};

export type Product = {
  productId: number;
  categoryId: number;
  categoryName: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
};
