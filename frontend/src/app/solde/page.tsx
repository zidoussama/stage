'use client';

import Image from 'next/image';
import banner from '@/assets/sold.png';
import { useProducts } from '@/hooks/fetshproduct';
import { Product } from '@/app/Accueil/types/accueil';
import { useState } from 'react';
import { useBag } from '@/hooks/useBag';
import { useProductNavigation } from '@/hooks/useProductNavigation';

const PRODUCTS_PER_PAGE = 16;

export default function SoldesGrid() {
  const { products, loading, error } = useProducts('sold');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );
  const goToProduct = useProductNavigation();
      const { addToBag } = useBag();
    
      function handleAddToBag(product: any) {
        addToBag({
          _id: product._id,
          name: product.name,
          price: product.price,
          categoryof: product.category.name,
          imageUrl: product.imageUrls[0],
        });
      }
  return (
    <section className="px-4 sm:px-8 py-10 bg-white">
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px] px-4">
          {paginatedProducts.map((product, index) => (
            <div
              key={product._id || index}
              onClick={() => goToProduct(product)}
              className="relative group bg-white rounded-xl p-3 shadow hover:shadow-xl transition duration-300 w-[300px] h-[450px] flex flex-col"
            >
              {/* Like Icon */}
              <span className="absolute top-3 right-3 text-gray-400 text-sm hover:text-pink-600 cursor-pointer">
                ♡
              </span>

              {/* Image Section */}
              <div className="flex justify-center items-center h-[260px] mb-3">
                {product.imageUrls?.[0] ? (
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="object-contain w-[260px] h-[260px]"
                  />
                ) : (
                  <Image
                    src="/fallback.png"
                    alt="Image manquante"
                    width={260}
                    height={260}
                    className="object-contain"
                  />
                )}
              </div>

              {/* Name */}
              <p className="text-center text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </p>

              {/* Price Section */}
              <div className="flex justify-center items-center gap-2 text-xs mb-4">
                <span className="font-bold text-black">{product.price.toFixed(2)} DT</span>

                {product.discount > 0 && (
                  <>
                    <span className="line-through text-gray-400 text-xs">
                      {(product.price / (1 - product.discount / 100)).toFixed(2)} DT
                    </span>
                    <span className="bg-pink-100 text-pink-600 text-[10px] px-2 py-[2px] rounded-full font-bold">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Add to Bag */}
              <button className="mt-auto w-full py-2 bg-black text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition duration-300" onClick={() => handleAddToBag(product)}>
                ADD TO BAG
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <ul className="flex gap-2 text-sm">
            <li
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="border px-3 py-1 rounded-full text-gray-500 hover:text-black cursor-pointer"
            >
              &lt;
            </li>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <li
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-full cursor-pointer ${
                    currentPage === page
                      ? 'bg-black text-white'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {page}
                </li>
              );
            })}

            <li
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="border px-3 py-1 rounded-full text-gray-500 hover:text-black cursor-pointer"
            >
              &gt;
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
