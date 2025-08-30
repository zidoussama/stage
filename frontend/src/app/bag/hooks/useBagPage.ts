// src/hooks/useBagPage.ts

import { useState, useMemo, ChangeEvent } from 'react';
import { CartItem } from '@/app/bag/types/bag';

// --- Static Data (could come from an API in a real app) ---
import p1 from '@/assets/p1.png';
import prod3 from '@/assets/products/pro3.png';
import prod5 from '@/assets/products/pro5.png';
import p4 from '@/assets/products/pro4.png';
import p6 from '@/assets/products/pro6.png';

const initialCartItems: CartItem[] = [
    { id: 1, name: 'Eyeshadow Palette', brand: 'MAC', image: p1, price: 39.99, quantity: 1 },
    { id: 2, name: 'Biker-Style Leggings', brand: 'Givenchy', image: prod3, price: 68.00, quantity: 1 },
    { id: 3, name: 'Straight Trousers', brand: 'KIKO', image: prod5, price: 88.00, quantity: 2 },
    { id: 4, name: 'Curl Defining Cream', brand: 'Haircare', image: p4, price: 24.99, quantity: 1 },
    { id: 5, name: 'Matte Setting Powder', brand: 'Face Makeup', image: p6, price: 12.99, quantity: 3 },
];



export const useBagPage = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(true);


  // --- Handlers for updating state ---
  const toggleFilterVisibility = () => setIsFilterVisible(prev => !prev);





 

  // --- Derived State (calculations based on state) ---


  const { subtotal, total } = useMemo(() => {
    const sub = initialCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 5.00;
    return { subtotal: sub, total: sub + shipping };
  }, [initialCartItems]);

  // --- Return everything the UI needs ---
  return {
    isFilterVisible,

    cartItems: initialCartItems,
    brands: ['Glowify Beauty', 'MAC', 'KIKO', 'Givenchy'],

    subtotal,
    shipping: 5.00,
    total,
    toggleFilterVisibility,

  };
};