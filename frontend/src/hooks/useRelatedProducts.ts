// frontend/src/hooks/useRelatedProducts.ts (new hook file)
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Product } from '@/types/product'; // Adjust path to your Product type
import {  } from '@/hooks/useProduct'; // Assuming you have this hook for single product
import { getAllProducts,useProductById } from '@/hooks/useProduct'; // Assuming you have this for all products

export const useRelatedProducts = (productId: string) => {
  const { product: currentProduct, loading: currentLoading, error: currentError } = useProductById(productId);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allLoading, setAllLoading] = useState(true);
  const [allError, setAllError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts();
        setAllProducts(data || []);
      } catch (err: any) {
        setAllError(err.message || 'Failed to fetch products');
      } finally {
        setAllLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const relatedProducts = useMemo(() => {
    if (!currentProduct || !allProducts.length) return [];

    const categoryMatch = currentProduct.category?.name;
    const brandMatch = typeof currentProduct.Brand === 'object' ? currentProduct.Brand?.name : currentProduct.Brand;

    let candidates: Product[] = allProducts.filter(p => p._id !== productId); // Exclude current

    // Filter by category or brand
    if (categoryMatch) {
      candidates = candidates.filter(p => p.category?.name === categoryMatch);
    } else if (brandMatch) {
      candidates = candidates.filter(p => 
        (typeof p.Brand === 'object' ? p.Brand?.name : p.Brand) === brandMatch
      );
    }

    // If no matches, fallback to random from all (excluding current)
    if (candidates.length === 0) {
      candidates = allProducts.filter(p => p._id !== productId);
    }

    // Shuffle and take 5
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    return candidates.slice(0, 5);
  }, [currentProduct, allProducts, productId]);

  const loading = currentLoading || allLoading;
  const error = currentError || allError;

  return { relatedProducts, loading, error };
};