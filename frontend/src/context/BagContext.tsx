// frontend/src/context/BagContext.tsx
'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Popup from '@/components/popUP';
import { BagItem } from '@/app/bag/types/bag';

interface BagContextValue {
  bag: BagItem[];
  addToBag: (item: Omit<BagItem, 'quantity'>, quantity?: number) => void;
  setBag: React.Dispatch<React.SetStateAction<BagItem[]>>;
  handleRemoveItem: (id: string) => void;
}

export const BagContext = createContext<BagContextValue | undefined>(undefined);

export function BagProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagItem[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const storedBag = typeof window !== 'undefined' ? localStorage.getItem('shopping_bag') : null;
    if (storedBag) setBag(JSON.parse(storedBag));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopping_bag', JSON.stringify(bag));
    }
  }, [bag]);

function addToBag(item: Omit<BagItem, 'quantity'>, quantity = 1) {
  setBag((prevBag) => {
    const existingIndex = prevBag.findIndex((b) => b._id === item._id);
    if (existingIndex >= 0) {
      const updatedBag = [...prevBag];
      let newQuantity = updatedBag[existingIndex].quantity + quantity;
      newQuantity = newQuantity < 1 ? 1 : newQuantity; // never below 1
      updatedBag[existingIndex].quantity = newQuantity;
      return updatedBag;
    } else if (quantity > 0) {
      // only add new item if quantity > 0
      return [...prevBag, { ...item, quantity }];
    }
    return prevBag; // don't add items with quantity <= 0
  });
}



  const handleRemoveItem = (id: string) => {
    setBag((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <BagContext.Provider value={{ bag, addToBag, setBag, handleRemoveItem }}>
      {children}
    </BagContext.Provider>
  );
}
