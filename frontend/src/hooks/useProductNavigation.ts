// hooks/useProductNavigation.ts
'use client';

import { useRouter } from 'next/navigation';

export const useProductNavigation = () => {
  const router = useRouter();

  const goToProduct = (product: { _id: string }) => {
    if (!product || !product._id) return;
    router.push(`/ProductDetails/${product._id}`);
  };

  return goToProduct;
};
