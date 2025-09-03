// src/types/bag.ts

import { StaticImageData } from 'next/image';

export interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    total: number;
}

export interface BagItemsListProps {
    items: BagItem[];
}
export interface BagItem {
  _id: string;
  name: string;
  price: number;
  categoryof: string;
  quantity: number;
  imageUrl: string;
}
