// Types TypeScript pour les produits

export interface ProductDto {
  id: string;
  slug: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  weight?: string;
  inStock: boolean;
  storeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCreateInput {
  slug: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  weight?: string;
  inStock?: boolean;
  storeUrl?: string;
}

export interface ProductUpdateInput extends Partial<ProductCreateInput> {}

export type ProductCategory = 'miel' | 'bougie' | 'hydromel' | 'coffret';
