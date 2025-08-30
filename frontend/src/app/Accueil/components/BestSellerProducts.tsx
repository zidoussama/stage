import React from 'react';
import ProductCard from './ProductCard'; // Adjust path if needed
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import p1 from '@/assets/p1.png'; 
import prod5 from '@/assets/products/pro5.png';
import prod3 from '@/assets/products/pro3.png';
import prod2 from '@/assets/products/pro2.png';

const sampleProducts = [
  {
    id: 1,
    image: p1, 
    name: 'Satin Trousers With Elastic',
    price: 68.0,
    originalPrice: 98.0,
    badge: 'SOLDE',
    discount: '-25%',
  },
  {
    id: 2,
    image: prod5,
    name: 'Straight Trousers',
    price: 88.0,
    badge: 'NEW',
  },
  {
    id: 3,
    image: prod3,
    name: 'Biker-Style Leggings',
    price: 68.0,
    originalPrice: 98.0,
    badge: 'SOLDE',
    discount: '-25%',
  },
  {
    id: 4,
    image: prod2,
    name: 'Jacquard Fluid Trousers',
    price: 68.0,
    badge: 'NEW',
  },
];

const BestSellerProducts = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Best Seller Products
        </h2>
        
        <div className="relative">
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hidden lg:block">
            <FiChevronLeft size={24} />
          </button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hidden lg:block">
            <FiChevronRight size={24} />
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellerProducts;
