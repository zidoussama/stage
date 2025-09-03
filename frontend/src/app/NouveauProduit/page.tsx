'use client';

import Image from 'next/image';
import banner from '@/assets/new.png';
import { useProducts } from '@/hooks/fetshproduct';
import { useState, useMemo } from 'react';
import { useBag } from '@/hooks/useBag'; 
import { useProductNavigation } from '@/hooks/useProductNavigation';



const PRODUCTS_PER_PAGE = 16;

export default function NewInStoreGrid() {
  const { products, loading, error } = useProducts('new in store');
  const [currentPage, setCurrentPage] = useState(1);
  const { addToBag } = useBag();
  const goToProduct = useProductNavigation();


  function handleAddToBag(product: any) {
    addToBag({
      _id: product._id,
      name: product.name,
      price: product.price,
      categoryof: product.category.name,
      imageUrl: product.imageUrls[0], // first image URL
    });
  }

  // Add tag and oldPrice to products
  const productsWithExtras = products.map((product) => {
    const tag = product.state === 'new in store' ? 'NOUVEAU' : undefined;
    const oldPrice =
      product.discount && product.discount > 0
        ? (product.price / (1 - product.discount / 100)).toFixed(2)
        : undefined;

    return { ...product, tag, oldPrice };
  });

  // Calculate total pages
  const totalPages = Math.ceil(productsWithExtras.length / PRODUCTS_PER_PAGE);

  // Paginated products
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    return productsWithExtras.slice(start, end);
  }, [productsWithExtras, currentPage]);

  // Handle page change
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="px-4 sm:px-10 py-10 bg-white">
      {/* Banner */}
      <div className="max-w-7xl mx-auto mb-10">
        <Image
          src={banner}
          alt="Nouveautés Banner"
          className="w-full object-contain rounded-lg"
          priority
        />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Nouveautés en magasin</h2>
        <div className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer">
          Prix plus élevé <span className="text-xs">⇅</span>
        </div>
      </div>

      {/* Loading/Error */}
      <div className="max-w-7xl mx-auto min-h-[150px] text-center">
        {loading && <p className="text-gray-500">Chargement des produits...</p>}
        {error && <p className="text-red-500">Erreur : {error}</p>}
      </div>

      {/* Product Grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-40">
          {paginatedProducts.map((product, index) => (
            <div
              onClick={() => goToProduct(product)}
              key={product._id || index}
              className="relative group bg-white rounded-xl p-4 shadow hover:shadow-xl transition duration-300 h-[280px] w-[200px]"
            >
              {product.tag && (
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full ${
                    product.tag === 'NOUVEAU' ? 'bg-green-500' : 'bg-pink-500'
                  } text-white`}
                >
                  {product.tag}
                </span>
              )}

              <span className="absolute top-3 right-3 text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer hover:text-pink-600">
                ♡
              </span>

              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                width={140}
                height={140}
                className="mx-auto mb-4 object-contain h-28"
              />

              <p className="text-center text-sm font-medium text-gray-800 mb-1">{product.name}</p>

              <div className="flex justify-center items-center gap-2 text-sm mb-4">
                <span className="font-bold">{product.price.toFixed(2)}DT</span>
                {product.oldPrice && (
                  <span className="line-through text-gray-400 text-xs">{product.oldPrice}DT</span>
                )}
                {product.discount && (
                  <span className="bg-pink-100 text-pink-600 text-[10px] px-2 py-[2px] rounded-full font-bold">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <button onClick={() => handleAddToBag(product)} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] py-2 bg-black text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
                ADD TO BAG
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <ul className="flex gap-2 text-sm">
            <li
              onClick={() => goToPage(currentPage - 1)}
              className={`border px-3 py-1 rounded-full cursor-pointer text-gray-500 hover:text-black ${
                currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              &lt;
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  page === currentPage
                    ? 'bg-black text-white'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {page}
              </li>
            ))}

            <li
              onClick={() => goToPage(currentPage + 1)}
              className={`border px-3 py-1 rounded-full cursor-pointer text-gray-500 hover:text-black ${
                currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              &gt;
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
