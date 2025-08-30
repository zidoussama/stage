// /components/RelatedProducts.js

import React from 'react';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';

// --- Image Imports ---
// Replace these with your actual product images
import p1 from '@/assets/p1.png'; // Example: MAC palette
import p2 from '@/assets/p1.png'; // Example: Givenchy mascara
import p3 from '@/assets/p1.png'; // Example: Beauty blender
import p4 from '@/assets/p1.png'; // Example: Kiko eyeliner
import p5 from '@/assets/p1.png'; // Example: Kiko eyeliner (duplicate for example)

// --- Sample Product Data ---
const relatedProductsData = [
  { id: 1, name: 'Satin Trousers With Elastic', image: p1, price: 98.00, salePrice: 68.00, discount: 25, isSold: true },
  { id: 2, name: 'Straight Trousers', image: p2, price: 68.00, salePrice: null, discount: null, isSold: false },
  { id: 3, name: 'Biker-Style Leggings', image: p3, price: 98.00, salePrice: 68.00, discount: 25, isSold: true },
  { id: 4, name: 'Jacquard Fluid Trousers', image: p4, price: 68.00, salePrice: null, discount: null, isSold: false },
  { id: 5, name: 'Jacquard Fluid Trousers', image: p5, price: 68.00, salePrice: null, discount: null, isSold: false },
];


// --- Single Product Card Component (UPDATED) ---
type Product = {
  id: number;
  name: string;
  image: any;
  price: number;
  salePrice: number | null;
  discount: number | null;
  isSold: boolean;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative text-center border border-transparent hover:border-gray-200 hover:shadow-lg rounded-lg p-3 flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-auto object-cover"/>
          {product.isSold && (
            <div className="absolute top-3 left-[-6px] bg-red-500 text-white text-xs font-bold uppercase py-1.5 px-3 rounded-r-full">
              Solde
            </div>
          )}
          <button className="absolute top-3 right-3 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FiHeart size={22} />
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-sm md:text-base text-gray-800 font-medium">{product.name}</h3>
          <div className="mt-1 flex justify-center items-baseline gap-2">
            {product.salePrice ? (
              <>
                <p className="text-base text-gray-900 font-bold">${product.salePrice.toFixed(2)}</p>
                <p className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</p>
                <p className="text-xs font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-md">
                  -{product.discount}%
                </p>
              </>
            ) : (
              <p className="text-base text-gray-900 font-bold">${product.price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button className="w-full bg-black text-white font-bold py-2.5 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          ADD TO BAG
        </button>
      </div>
    </div>
  );
};


// --- Main Related Products Section ---
const RelatedProducts = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {relatedProductsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

// THIS IS THE FIX:
export default RelatedProducts;