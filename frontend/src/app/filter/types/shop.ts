// src/app/shop/types/shop.ts

import { StaticImageData } from 'next/image';

export interface Product {
  id: number;
  name: string;
  image: StaticImageData; // We know it's static from the imports
  rating: number;
  reviewCount: number;
  description: string;
  price: number;
  salePrice: number | null;
  discount: number | null;
  badge: {
    type: 'new' | 'percent' | 'solde' | null;
    text: string;
  } | null;
}

export interface Filters {
  genre: string[];
  brands: string[];
  rating: number[];
  typePeau: string[];
  concern: string[];
  ingredients: string[];
  price: number;
}

export type ViewType = 'list' | 'grid';

export interface ActiveFilterPill {
    type: string;
    value: string | number;
}