'use client';

import { FC } from 'react';
import Image from 'next/image';
import { FaBolt, FaStar, FaHeart, FaEye, FaBagShopping, FaExpand } from 'react-icons/fa6';
import p1 from '@/assets/p1.png';
import { useProducts } from '../../../hooks/fetshproduct';
import { useRouter } from 'next/navigation';
import { useBag } from '@/hooks/useBag';
import { useProductNavigation } from '@/hooks/useProductNavigation';


const VenteFlash: FC = () => {
  const { products, loading, error } = useProducts("vent flash");
  const router = useRouter();
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

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

    return (
    <section className="px-6 py-12 bg-gray-50">
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-2xl font-bold text-gray-800">
          <FaBolt className="text-pink-500" />
          <span>Vente flash</span>
        </div>
        <button className="text-sm text-gray-700 hover:text-pink-500 flex items-center gap-1 font-medium" onClick={() => {
          router.push('/ventes-flash');
          }}>
          Voir plus <span className="text-lg">→</span>
          
        </button>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl">
          {products.slice(0, 5).map((product) => ( 
            <div key={product._id} className="group w-[230px] mx-auto">
              <div  className="relative bg-gray-200 rounded-xl flex items-center justify-center p-4 h-[240px] mb-4">
                {product.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-3 py-1.5 rounded-full font-bold z-10">
                    -{product.discount}%
                  </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button className="bg-white p-2.5 rounded-full shadow-md text-gray-700 hover:text-pink-500 transition-colors">
                    <FaHeart size={16} />
                  </button>

                  <button  className="bg-pink-500 text-white p-2.5 rounded-full shadow-md hover:bg-pink-600 transition-colors">
                    <FaEye size={16} />
                  </button>
                </div>
                <Image
                onClick={() => goToProduct(product)}
                  src={product.imageUrls?.[0] || p1}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute bottom-4 w-[85%] py-2.5 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 font-semibold">
                  <div className="flex items-center justify-center gap-2" onClick={() => handleAddToBag(product)}>
                    <FaBagShopping size={14} />
                    ADD TO BAG
                  </div>
                </button>
              </div>
              <div className="px-1">
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category?.name}</h4>
                <span className="text-sm font-semibold text-gray-800 mb-2 leading-tight block truncate hover:text-pink-500 underline decoration-pink-500/30 underline-offset-4 decoration-2">
                  {product.name}
                </span>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-pink-500 font-bold text-base">{product.price} DT</span>
                  {product.discount > 0 && (
                    <span className="text-sm line-through text-gray-400">
                      {(product.price / (1 - product.discount / 100)).toFixed(2)} DT
                    </span>
                  )}
                </div>
                <div className="flex items-center text-yellow-400 text-xs mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-gray-300" />
                  ))}
                  <span className="ml-2 text-gray-500">(0)</span>
                </div>
                <p className="text-xs text-gray-500">Stock: {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenteFlash;