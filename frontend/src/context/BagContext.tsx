'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { BagItem } from '@/app/bag/types/bag';
import Image from 'next/image';
import { FiCheck } from 'react-icons/fi';

interface BagContextValue {
  bag: BagItem[];
  addToBag: (item: Omit<BagItem, 'quantity'>, quantity?: number, options?: { showPopup?: boolean }) => void;
  setBag: React.Dispatch<React.SetStateAction<BagItem[]>>;
  handleRemoveItem: (id: string) => void;
}

export const BagContext = createContext<BagContextValue | undefined>(undefined);

export function BagProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagItem[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<BagItem | null>(null);

  useEffect(() => {
    const storedBag = typeof window !== 'undefined' ? localStorage.getItem('shopping_bag') : null;
    if (storedBag) setBag(JSON.parse(storedBag));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopping_bag', JSON.stringify(bag));
    }
  }, [bag]);

  // Auto-hide popup after 3 seconds
  useEffect(() => {
    if (popupVisible && lastAddedItem) {
      const timer = setTimeout(() => {
        setPopupVisible(false);
        setLastAddedItem(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popupVisible, lastAddedItem]);

  function addToBag(item: Omit<BagItem, 'quantity'>, quantity = 1, options?: { showPopup?: boolean }) {
    const shouldShowPopup = options?.showPopup ?? true; // Default to true

    setBag((prevBag) => {
      let newBag = [...prevBag];
      let updatedItem: BagItem | null = null;

      const existingIndex = prevBag.findIndex((b) => b._id === item._id);

      if (existingIndex >= 0) {
        // Update existing item
        const newQuantity = Math.max(1, prevBag[existingIndex].quantity + quantity);
        newBag[existingIndex] = { ...prevBag[existingIndex], quantity: newQuantity };
        updatedItem = newBag[existingIndex];
      } else if (quantity > 0) {
        // Add new item
        updatedItem = { ...item, quantity };
        newBag = [...prevBag, updatedItem];
      }
      // else: no change, don't show popup

      // Show popup only if shouldShowPopup is true
      if (updatedItem && shouldShowPopup) {
        setLastAddedItem(updatedItem);
        setPopupVisible(true);
      }

      return newBag;
    });
  }

  const handleRemoveItem = (id: string) => {
    setBag((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <BagContext.Provider value={{ bag, addToBag, setBag, handleRemoveItem }}>
      {children}
      {popupVisible && lastAddedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                  <FiCheck className="text-pink-600 text-xl" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Added to Bag!</h3>
                <div className="flex items-center gap-3">
                  <Image
                    src={lastAddedItem.imageUrl || '/placeholder.png'}
                    alt={lastAddedItem.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{lastAddedItem.name}</p>
                    <p className="text-xs text-gray-500">
                      {lastAddedItem.price.toFixed(2)} DT x {lastAddedItem.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </BagContext.Provider>
  );
}