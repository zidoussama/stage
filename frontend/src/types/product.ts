export interface Product {
_id: string; 
  name: string;
  price: number;
  oldPrice?: number;  
  category: any;
  description: string;
  stock: number;
  imageUrls: string[];
  size?: string;
  Composition?: string;
  otherinfo?: string;
  state: 'none' | 'sold' | 'sale' | 'new in store' | 'vent flash';
  discount: number;
  concern?: string[];
  typedepeau?: string[];
  ingredients: string[];
  genre?: string;
  Brand:  string;
  createdAt: string;
  __v?: number;
  tag?: 'SOLDE' | 'NEW' | string;
  isFeatured?: boolean;
  rating: number;
}

