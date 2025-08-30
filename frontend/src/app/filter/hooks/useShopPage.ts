// src/app/shop/hooks/useShopPage.ts
'use client';

import { useState, useMemo } from 'react';
import { Product, Filters, ViewType, ActiveFilterPill } from '@/app/filter/types/shop';

// --- Static Data ---
import p1 from '@/assets/p1.png'; 

const baseProducts: Omit<Product, 'id'>[] = [
  { name: 'Satin Trousers With Elastic', image: p1, rating: 4.5, reviewCount: 143, description: 'Rejuvenate and refresh your skin...', price: 98.00, salePrice: 68.00, discount: 25, badge: null },
  { name: 'Straight Trousers', image: p1, rating: 4.0, reviewCount: 98, description: 'A classic straight mascara...', price: 68.00, salePrice: null, discount: null, badge: { type: 'new', text: 'NEW' } },
  { name: 'Biker-Style Leggings', image: p1, rating: 4.8, reviewCount: 210, description: 'The perfect tool for flawless application.', price: 98.00, salePrice: 68.00, discount: 25, badge: { type: 'percent', text: '25%' } },
  { name: 'Jacquard Fluid Trousers', image: p1, rating: 4.2, reviewCount: 75, description: 'Define your eyes with this eyeliner.', price: 68.00, salePrice: null, discount: null, badge: null },
];

const products: Product[] = Array.from({ length: 28 }, (_, i) => ({ ...baseProducts[i % baseProducts.length], id: i + 1 }));

const initialFilters: Filters = {
  genre: [], brands: [], rating: [], typePeau: [], concern: [], ingredients: [], price: 500,
};

export const useShopPage = () => {
  const [view, setView] = useState<ViewType>('list');
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleFilterChange = (type: keyof Omit<Filters, 'price'>, value: string | number) => {
    setFilters(prev => {
      const currentValues = prev[type] as (string | number)[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [type]: newValues };
    });
  };

  const handlePriceChange = (newPrice: number) => {
    setFilters(prev => ({ ...prev, price: newPrice }));
  };

  const handleClearAll = () => setFilters(initialFilters);

  const activeFilterPills = useMemo<ActiveFilterPill[]>(() => 
    Object.entries(filters).flatMap(([type, values]) => {
      if (type === 'price' || !Array.isArray(values) || values.length === 0) return [];
      return values.map(value => ({ type, value }));
    }),
  [filters]);

  return {
    view,
    filters,
    products,
    activeFilterPills,
    setView,
    handleFilterChange,
    handlePriceChange,
    handleClearAll,
  };
};