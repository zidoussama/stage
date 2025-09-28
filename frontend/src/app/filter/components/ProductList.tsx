'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';
import { FiHeart, FiMaximize, FiEye, FiShoppingCart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

import { useProductNavigation } from '@/hooks/useProductNavigation';
import { useBag } from '@/hooks/useBag';
import { useLike } from '@/hooks/useToggleLike';

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
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
    <div className="flex flex-col gap-6">
      {products.map(product => {
        const originalPrice = product.price;
        const discount = product.discount || 0;
        const newPrice = discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;
        const showDiscount = discount > 0;
        const likesData = productLikes[product._id] || { liked: false, count: 0 };
        return (
          <div onClick={() => goToProduct(product)} key={product._id} className="group bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row gap-6 relative">
            <div className="relative w-full sm:w-1/4 flex-shrink-0">
              <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
                <Image  src={product.imageUrls[0]} alt={product.name} width={200} height={200} className="w-full h-auto object-contain rounded-md" />
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <div className="flex items-baseline gap-3 my-2">
                <span className="text-3xl font-bold text-gray-900">{newPrice.toFixed(2)} TND</span>
                {showDiscount && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{originalPrice.toFixed(2)} TND</span>
                    <span className="bg-pink-600 text-white text-sm font-semibold px-3 py-1 rounded-full">-{discount}%</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed my-3 flex-grow">{product.description}</p>
            </div>

            <div className="flex flex-col justify-between items-center sm:items-end flex-shrink-0">
              <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLike(product._id);
                  }}
                  className={`p-2 border rounded-full bg-white/80 text-gray-600 hover:bg-gray-100 transition-colors ${
                    likesData.liked ? 'text-pink-500' : ''
                  }`}
                >
                  {likesData.liked ? <FaHeart size={18} /> : <FiHeart size={18} />}
                </button>
              </div>
              <button onClick={(e) => {
                e.stopPropagation();
                handleAddToBag(product);
              }} className="flex items-center gap-2 bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors">
                <FiShoppingCart size={18} />
                ADD TO BAG
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;