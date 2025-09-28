'use client';

import Image from 'next/image';
import { FaHeart, FaBagShopping } from 'react-icons/fa6';
import Link from 'next/link';
import { useProducts } from '@/hooks/fetshproduct'; // Adjust path if needed
import { useBag } from '@/hooks/useBag';
import { useProductNavigation } from '@/hooks/useProductNavigation';
import { useLike } from '@/hooks/useToggleLike';
import { useState, useEffect, useCallback } from 'react';
import p1 from '@/assets/p1.png'; // Placeholder image

const FeaturedProducts: React.FC = () => {
  const { products: allProducts, loading, error } = useProducts("FeaturedProducts"); // Fetch all products (no state filter)
  const { addToBag } = useBag();
  const goToProduct = useProductNavigation();
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

  // Fetch initial like status and counts for featured products
  useEffect(() => {
    const fetchLikes = async () => {
      if (!allProducts.length) return;
      try {
        const userLikes = await getUserLikes();
        const likedProducts = userLikes.reduce((acc: Record<string, boolean>, like: any) => {
          acc[like.product._id] = true;
          return acc;
        }, {});

        const countsPromises = allProducts.map(p => getProductLikesCount(p._id));
        const counts = await Promise.all(countsPromises);

        const likesData = allProducts.reduce((acc, p, i) => {
          acc[p._id] = { liked: likedProducts[p._id] || false, count: counts[i] };
          return acc;
        }, {} as Record<string, { liked: boolean; count: number }>);

        setProductLikes(likesData);
      } catch (err) {
        console.error('Error fetching initial likes data:', err);
      }
    };

    fetchLikes();
  }, [allProducts, getUserLikes, getProductLikesCount]);

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

  if (loading) return <p>Loading featured products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!allProducts.length) return <p className="text-gray-500">No featured products found.</p>;

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
          {allProducts.slice(0, 4).map((product: any) => {
            const likesData = productLikes[product._id] || { liked: false, count: 0 };
            const originalPrice = product.price;
            const discount = product.discount || 0;
            const newPrice = discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;
            const showDiscount = discount > 0;
            const tag = product.tag || (product.state === 'sale' ? 'SALE' : product.state === 'new in store' ? 'NEW' : null);
            return (
              <div
                key={product._id}
                onClick={() => goToProduct(product)}
                className="relative group bg-white rounded-xl p-4 shadow hover:shadow-xl transition-all duration-300 w-full h-[350px] border border-gray-100 mx-auto cursor-pointer"
              >
                {/* Tag */}
                {tag && (
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full z-10 ${
                      tag === 'SALE'
                        ? 'bg-red-500 text-white'
                        : 'bg-pink-500 text-white'
                    }`}
                  >
                    {tag}
                  </span>
                )}

                {/* Heart Icon */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLike(product._id);
                  }}
                  className={`absolute top-3 right-3 z-10 transition-colors ${likesData.liked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                >
                  <FaHeart size={14} />
                </button>

                {/* Image */}
                <Image
                  src={product.imageUrls?.[0] || p1}
                  alt={product.name}
                  width={276}
                  height={160}
                  className="w-full h-40 object-contain mb-4"
                />

                {/* Product Info */}
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {product.category?.name || 'Uncategorized'}
                </h4>

                <div className="text-sm font-semibold text-gray-800 mb-1 truncate">
                  {product.name}
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-pink-600 font-bold text-sm">{newPrice.toFixed(2)} DT</span>
                  {showDiscount && (
                    <span className="text-xs line-through text-gray-400">{originalPrice.toFixed(2)} DT</span>
                  )}
                  {showDiscount && (
                    <span className="ml-auto text-xs text-pink-600 font-bold bg-pink-100 px-2 py-0.5 rounded-full">
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Hover Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToBag(product);
                  }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] py-2 bg-black text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition duration-300 z-10"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FaBagShopping size={14} />
                    ADD TO BAG
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;