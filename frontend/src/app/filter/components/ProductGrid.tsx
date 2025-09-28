'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';
import { FiHeart, FiMaximize, FiEye } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useProductNavigation } from '@/hooks/useProductNavigation';
import { useBag } from '@/hooks/useBag';
import { useLike } from '@/hooks/useToggleLike';

interface Props {
  products: Product[];
}

const ProductGrid: React.FC<Props> = ({ products }) => {
  const goToProduct = useProductNavigation();
  const { addToBag } = useBag();
  const { toggleLike, getUserLikes, getProductLikesCount } = useLike();
  
  const [productLikes, setProductLikes] = useState<Record<string, { liked: boolean; count: number }>>({});

  function handleAddToBag(product: any) {
        addToBag({
          _id: product._id,
          name: product.name,
          price: product.price,
          categoryof: product.category.name,
          imageUrl: product.imageUrls[0],
        });
      }

  // Fetch initial like status and counts for all products
  useEffect(() => {
    const fetchLikes = async () => {
      if (!products.length) return;
      try {
        const userLikes = await getUserLikes();
        const likedProducts = userLikes.reduce((acc: Record<string, boolean>, like: any) => {
          acc[like.product._id] = true;
          return acc;
        }, {});

        const countsPromises = products.map(p => getProductLikesCount(p._id));
        const counts = await Promise.all(countsPromises);

        const likesData = products.reduce((acc, p, i) => {
          acc[p._id] = { liked: likedProducts[p._id] || false, count: counts[i] };
          return acc;
        }, {} as Record<string, { liked: boolean; count: number }>);

        setProductLikes(likesData);
      } catch (err) {
        console.error('Error fetching initial likes data:', err);
      }
    };

    fetchLikes();
  }, [products, getUserLikes, getProductLikesCount]);

  // Toggle like handler
  const handleToggleLike = useCallback(async (productId: string) => {
    try {
      const data = await toggleLike(productId);
      const newLiked = data.like.is_liked;
      setProductLikes(prev => ({
        ...prev,
        [productId]: { ...prev[productId], liked: newLiked }
      }));

      // Re-fetch count
      const newCount = await getProductLikesCount(productId);
      setProductLikes(prev => ({
        ...prev,
        [productId]: { ...prev[productId], count: newCount }
      }));
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  }, [toggleLike, getProductLikesCount]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => {
        const originalPrice = product.price;
        const discount = product.discount || 0;
        const newPrice = discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;
        const showDiscount = discount > 0;
        const likesData = productLikes[product._id] || { liked: false, count: 0 };
        return (
          <div  onClick={() => goToProduct(product)} key={product._id} className="group relative bg-gray-100 rounded-xl p-4 flex flex-col">
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleLike(product._id);
                }}
                className={`p-2 border rounded-full bg-white/80 ${likesData.liked ? 'text-pink-500' : 'text-gray-600'}`}
              >
                {likesData.liked ? <FaHeart size={18} /> : <FiHeart size={18} />}
              </button>
            </div>
            <div className="relative mb-4">
              <Image src={product.imageUrls[0]} alt={product.name} width={250} height={250} className="w-full h-auto object-contain rounded-md" />
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-full bg-gray-800 text-white font-semibold py-2.5 rounded-lg" onClick={(e) => {
                  e.stopPropagation();
                  handleAddToBag(product);
                }}>ADD TO BAG</button>
              </div>
            </div>
            <div className="text-center mt-auto">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <div className="flex justify-center items-baseline gap-2 mt-2">
                <span className="font-bold text-gray-900">{newPrice.toFixed(2)}TND</span>
                {showDiscount && (
                  <>
                    <span className="text-sm text-gray-400 line-through">{originalPrice.toFixed(2)} TND</span>
                    <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-md">-{discount}%</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;