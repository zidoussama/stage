'use client';

import Image from 'next/image';
import banner from '@/assets/sold.png';
import { useProducts } from '@/hooks/fetshproduct'; 
import { Product } from '@/app/Accueil/types/accueil'; 

export default function SoldesGrid() {
  const { products, loading, error } = useProducts('sold');

  return (
    <section className="px-4 sm:px-10 py-10 bg-white">
      {/* Banner Image */}
      <div className="max-w-7xl mx-auto mb-10">
        <Image
          src={banner}
          alt="Soldes Banner"
          className="w-full object-contain rounded-lg"
          priority
        />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Produits en Solde</h2>
        <div className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer">
          Prix plus élevé <span className="text-xs">⇅</span>
        </div>
      </div>

      {/* Loading and Error States */}
      <div className="max-w-7xl mx-auto min-h-[150px] text-center">
        {loading && <p className="text-gray-500">Chargement des produits...</p>}
        {error && <p className="text-red-500">Erreur : {error}</p>}
      </div>

      {/* Product Grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-40">
          {products.map((product, index) => (
            <div
              key={product._id || index}
              className="relative group bg-white rounded-xl p-4 shadow hover:shadow-xl transition duration-300 h-[280px] w-[200px]"
            >
              {/* Badge */}
              

              {/* Like Icon */}
              <span className="absolute top-3 right-3 text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer hover:text-pink-600">
                ♡
              </span>

              {/* Image from backend or fallback */}
              <div className="mx-auto mb-4 h-28 flex justify-center items-center">
                {product.imageUrls?.[0] ? (
                  // External image
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="object-contain h-full"
                    width={140}
                    height={140}
                  />
                ) : (
                  // Fallback image if none provided
                  <Image
                    src="/fallback.png" // replace with an actual fallback image
                    alt="Image manquante"
                    width={140}
                    height={140}
                    className="object-contain h-full"
                  />
                )}
              </div>

              {/* Name */}
              <p className="text-center text-sm font-medium text-gray-800 mb-1">{product.name}</p>

              {/* Price Section */}
              <div className="flex justify-center items-center gap-2 text-sm mb-4">
                <span className="font-bold">
                  {product.price.toFixed(2)} €
                </span>
                {product.price && (
                  <span className="line-through text-gray-400 text-xs">
                    {product.price.toFixed(2)} €
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-pink-100 text-pink-600 text-[10px] px-2 py-[2px] rounded-full font-bold">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Add to Bag */}
              <button className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] py-2 bg-black text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
                ADD TO BAG
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination (static for now) */}
      <div className="flex justify-center mt-10">
        <ul className="flex gap-2 text-sm">
          <li className="border px-3 py-1 rounded-full text-gray-500 hover:text-black">&lt;</li>
          {[1, 2, 3, 4, 5].map((page) => (
            <li
              key={page}
              className={`px-3 py-1 rounded-full cursor-pointer ${
                page === 1 ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
              }`}
            >
              {page}
            </li>
          ))}
          <li className="border px-3 py-1 rounded-full text-gray-500 hover:text-black">&gt;</li>
        </ul>
      </div>
    </section>
  );
}
