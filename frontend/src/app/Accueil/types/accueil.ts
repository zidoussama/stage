// src/app/Accueil/types/accueil.ts

import { StaticImageData } from 'next/image';

export interface Product {
  ingredients: string[];
  _id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  stock: number;
  imageUrls: string[];
  state: string;
  discount: number;
  createdAt: string;
  __v: number;
}

export interface Banner {
  id: number;
  imageUrl: StaticImageData | string;
  altText: string;
  link: string; 
  title?: string; 
  subtitle?: string;
}


export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: StaticImageData | string;
}



export interface HomePageData {
  heroGridBanners: {
    largeBanner: Banner;
    smallBanners: [Banner, Banner, Banner];
  };
  categories: Category[];
  flashSale: {
    endDate: string; // ISO date string, e.g., "2024-12-31T23:59:59Z"
    products: Product[];
  };
  featuredProducts: Product[];
  trendingBanner: Banner;
  newInStore: {
    products: Product[];
    featuredProduct: Product; // The main product shown in detail
  };
  promoBanners: Banner[];
  bestSellerProducts: Product[];
}