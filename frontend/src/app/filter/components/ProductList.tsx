// components/ProductList.tsx

'use client';

import React from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';
import { FiHeart, FiMaximize, FiEye, FiShoppingCart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < rating ? 'text-pink-500' : 'text-gray-300'} />
      ))}
    </div>
  );
};

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="flex flex-col gap-6">
      {products.map(product => (
        <div key={product._id} className="group bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row gap-6 relative">
          <div className="relative w-full sm:w-1/4 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
              <Image src={product.imageUrls[0]} alt={product.name} width={200} height={200} className="w-full h-auto object-contain rounded-md" />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <div className="flex items-center gap-2 my-2 text-xs text-gray-500">
              <StarRating rating={product.rating} />
              <span>({product.rating}/5)</span>
            </div>
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.discount && (
                <>
                  <span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
                  <span className="bg-pink-600 text-white text-sm font-semibold px-3 py-1 rounded-full">-{product.discount}%</span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed my-3 flex-grow">{product.description}</p>
          </div>

          <div className="flex flex-col justify-between items-center sm:items-end flex-shrink-0">
            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 border rounded-full bg-white/80 text-gray-600 hover:bg-gray-100"><FiHeart size={18} /></button>
              <button className="p-2 border rounded-full bg-white/80 text-gray-600 hover:bg-gray-100"><FiMaximize size={18} /></button>
              <button className="p-2 border rounded-full bg-pink-600 text-white"><FiEye size={18} /></button>
            </div>
            <button className="flex items-center gap-2 bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors">
              <FiShoppingCart size={18} />
              ADD TO BAG
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
