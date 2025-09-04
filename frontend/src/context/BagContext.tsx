'use client'
// src/context/BagContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { BagItem } from '@/app/bag/types/bag';
import Popup from '@/components/popUP';

const BAG_STORAGE_KEY = 'shopping_bag';

interface BagContextValue {
  bag: BagItem[];
  addToBag: (item: Omit<BagItem, 'quantity'>) => void;
  setBag: React.Dispatch<React.SetStateAction<BagItem[]>>;
  handleRemoveItem: (itemId: string) => void; 
}

export const BagContext = createContext<BagContextValue | undefined>(undefined);

export function BagProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagItem[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedBag = localStorage.getItem(BAG_STORAGE_KEY);
      if (storedBag) setBag(JSON.parse(storedBag));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(bag));
    }
  }, [bag]);

  function addToBag(item: Omit<BagItem, 'quantity'>) {
    setBag((prevBag) => {
      const existingIndex = prevBag.findIndex((b) => b._id === item._id);
      if (existingIndex >= 0) {
        const updatedBag = [...prevBag];
        updatedBag[existingIndex].quantity += 1;
        Popup({ message: "Item added to bag", onClose: () => {} });
        return updatedBag;
      }
      return [...prevBag, { ...item, quantity: 1 }];
    });
        // Show the popup
    setPopupVisible(true);

    // Hide after 3 seconds
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  }

  function handleRemoveItem(itemId: string) {
    setBag((prevBag) => prevBag.filter((item) => item._id !== itemId));
  }

  return (
    <BagContext.Provider value={{ bag, addToBag, setBag, handleRemoveItem }}>
      {children}
    </BagContext.Provider>
  );
}
