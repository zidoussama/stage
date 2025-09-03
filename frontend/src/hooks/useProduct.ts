// hooks/useProductById.ts
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '@/types/product'; // make sure this path is correct

const useProductById = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export default useProductById;
