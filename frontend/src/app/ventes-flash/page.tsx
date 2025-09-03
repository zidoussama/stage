"use client";

import Image from "next/image";
import {
  Star,
  Heart,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  
} from "lucide-react";
import {FaExpand} from 'react-icons/fa6';
import type { Product } from "@/app/Accueil/types/accueil";
import { useProducts } from "@/hooks/fetshproduct";
import { useState } from "react";
import { useBag } from "@/hooks/useBag";
import { useProductNavigation } from "@/hooks/useProductNavigation";

// --- ProductCard component ---
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
    const { addToBag } = useBag();
    const goToProduct = useProductNavigation();
    function handleAddToBag(product: any) {
      addToBag({
        _id: product._id,
        name: product.name,
        price: product.price,
        categoryof: product.category.name,
        imageUrl: product.imageUrls[0],
      });
    }

  const discountedPrice =
    product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : null;

  return (
    <div
      onClick={() => goToProduct(product)}
      className={`flex items-start gap-4 p-4 h-full transition-colors duration-300 ${
        isHovered ? "bg-gray-50" : "bg-white"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-shrink-0">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          width={140}
          height={140}
          className="rounded-md object-cover w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]"
        />
      </div>

      <div className="flex-grow flex flex-col h-full relative">
        <div>
          <h3 className="font-semibold text-gray-800 text-base pr-8">
            {product.name}
          </h3>
          <div className="flex items-center my-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
            ))}
          </div>

          <div className="flex items-center gap-3 my-2">
            {discountedPrice ? (
              <>
                <span className="text-xl font-bold text-gray-900">
                  {discountedPrice} DT
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {product.price.toFixed(2)} DT
                </span>
                {!isHovered && (
                  <span className="bg-pink-500 text-white text-xs font-bold w-10 h-10 flex items-center justify-center rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                {product.price.toFixed(2)} :DT
              </span>
            )}
          </div>

          <p className="text-xs text-gray-600 mt-2 mb-4 leading-relaxed hidden sm:block">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <button className="bg-gray-800 text-white text-xs font-bold px-5 py-2.5 rounded-md hover:bg-pink-700 tracking-wider" onClick={() => handleAddToBag(product)}>
            ADD TO BAG
          </button>
          {isHovered && (
            <div className="bg-pink-500 text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full">
              %
            </div>
          )}
        </div>

        {isHovered && (
          <div className="absolute top-0 right-0 flex flex-col gap-3">
            <button className="text-gray-500 hover:text-red-500">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-800">
              <FaExpand className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Page ---
const VenteFlashPage: React.FC = () => {
  const { products, loading, error } = useProducts("vent flash");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-24 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Vente Flash</h2>
          <div className="text-right">
            <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Prix plus élevé
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
            </button>
            <p className="text-xs text-gray-500 mt-1">
              {loading ? "Chargement..." : `${products.length} résultats trouvés`}
            </p>
          </div>
        </div>

        {loading && <p className="text-center text-gray-500">Chargement des produits...</p>}
        {error && <p className="text-center text-pink-500">{error}</p>}

        {!loading && !error && (
          <div className="rounded-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 -m-px">
              {paginatedProducts.map((product, index) => (
                <div key={index} className="p-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12 mb-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="h-9 w-9 flex items-center justify-center rounded-full text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`h-9 w-9 flex items-center justify-center rounded-full font-medium text-sm transition-colors ${
                currentPage === page
                  ? "bg-gray-800 text-white"
                  : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="h-9 w-9 flex items-center justify-center rounded-full text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default VenteFlashPage;
