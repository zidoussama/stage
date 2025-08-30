// src/types/bag.ts

import { StaticImageData } from 'next/image';

// Defines a single item in the shopping cart
export interface CartItem {
  id: number;
  name: string;
  brand: string;
  image: StaticImageData;
  price: number;
  quantity: number;
}

export interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    total: number;
}

export interface BagItemsListProps {
    items: CartItem[];
}