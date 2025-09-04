// components/ProductGrid.tsx

'use client';

import React from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';
import { FiHeart, FiMaximize, FiEye } from 'react-icons/fi';

interface Props {
  products: Product[];
}

const ProductGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product._id} className="group relative bg-gray-100 rounded-xl p-4 flex flex-col">
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 border rounded-full bg-white/80"><FiHeart size={18} /></button>
            <button className="p-2 border rounded-full bg-white/80"><FiMaximize size={18} /></button>
            <button className="p-2 border rounded-full bg-pink-600 text-white"><FiEye size={18} /></button>
          </div>
          <div className="relative mb-4">
            <Image src={product.imageUrls[0]} alt={product.name} width={250} height={250} className="w-full h-auto object-contain rounded-md" />
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-full bg-gray-800 text-white font-semibold py-2.5 rounded-lg">ADD TO BAG</button>
            </div>
          </div>
          <div className="text-center mt-auto">
            <h3 className="font-semibold text-gray-800">{product.name}</h3>
            <div className="flex justify-center items-baseline gap-2 mt-2">
              <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.discount && (
                <>
                  <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
                  <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-md">-{product.discount}%</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
