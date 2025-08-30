'use client';

import Image from 'next/image';
import { FaHeart, FaBagShopping } from 'react-icons/fa6';
import p1 from '@/assets/p1.png';
import prod5 from '@/assets/products/pro5.png';
import prod3 from '@/assets/products/pro3.png';
import prod2 from '@/assets/products/pro2.png';


const featuredProducts = [
  {
    id: 1,
    name: 'Satin Trousers With Elastic',
    price: '$68.00',
    oldPrice: '$88.00',
    tag: 'SALE',
    discount: '25%',
    img: p1,
  },
  {
    id: 2,
    name: 'Straight Trousers',
    price: '$68.00',
    tag: 'NEW',
    img: prod5,
  },
  {
    id: 3,
    name: 'Biker-Style Leggings',
    price: '$68.00',
    oldPrice: '$88.00',
    tag: 'SALE',
    discount: '25%',
    img: prod3,
  },
  {
    id: 4,
    name: 'Jacquard Fluid Trousers',
    price: '$68.00',
    tag: 'NEW',
    img: prod2,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="px-6 py-10 bg-white">
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800">FEATURED PRODUCTS</h2>
        <button className="text-sm text-gray-700 hover:text-pink-600 font-medium">
          Voir plus
        </button>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-5 max-w-7xl">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="relative group bg-white rounded-xl p-4 shadow hover:shadow-xl transition-all duration-300 w-full h-[350px] border border-gray-100 mx-auto"
            >
              {/* Tag */}
              {product.tag && (
                <span
                  className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full z-10 ${
                    product.tag === 'SALE'
                      ? 'bg-red-500 text-white'
                      : 'bg-pink-500 text-white'
                  }`}
                >
                  {product.tag}
                </span>
              )}

              {/* Heart Icon */}
              <button className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 z-10">
                <FaHeart size={14} />
              </button>

              {/* Image */}
              <Image
                src={product.img}
                alt={product.name}
                width={276}
                height={160}
                className="w-full h-40 object-contain mb-4"
              />

              {/* Product Info */}
              <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {product.name}
              </h4>

              <div className="text-sm font-semibold text-gray-800 mb-1 truncate">
                {product.name}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-pink-600 font-bold text-sm">{product.price}</span>
                {product.oldPrice && (
                  <span className="text-xs line-through text-gray-400">{product.oldPrice}</span>
                )}
                {product.discount && (
                  <span className="ml-auto text-xs text-pink-600 font-bold bg-pink-100 px-2 py-0.5 rounded-full">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Hover Button */}
              <button className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] py-2 bg-black text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                <div className="flex items-center justify-center gap-2">
                  <FaBagShopping size={14} />
                  ADD TO BAG
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
