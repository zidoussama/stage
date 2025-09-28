// frontend/src/app/ProductDetails/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import ProductPage from './ProductPage'; // 👈 move your ProductPage to its own file

const ProductPageWrapper = () => {
  const params = useParams();
  const productId = params?.id as string;

  return <ProductPage productId={productId} />;
};

export default ProductPageWrapper;
