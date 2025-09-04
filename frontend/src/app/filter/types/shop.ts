
import { StaticImageData } from 'next/image';



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