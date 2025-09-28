// /components/RelatedProducts.tsx (updated component)
'use client';

import React from 'react';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import { useParams } from 'next/navigation';
import { useRelatedProducts } from '@/hooks/useRelatedProducts'; // Adjust path
import { useBag } from '@/hooks/useBag';
import { useProductNavigation } from '@/hooks/useProductNavigation';
import { useLike } from '@/hooks/useToggleLike';
import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product'; // Adjust path to your type

// --- Single Product Card Component (UPDATED) ---
type ProductCardProps = {
  product: Product;
  onAddToBag: (product: Product) => void;
  goToProduct: (product: Product) => void;
  isLiked: boolean;
  onToggleLike: (productId: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToBag, 
  goToProduct, 
  isLiked, 
  onToggleLike 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const originalPrice = product.price;
  const discount = product.discount || 0;
  const newPrice = discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;
  const showDiscount = discount > 0;
  const tag = product.tag || (product.state === 'sale' ? 'SALE' : product.state === 'new in store' ? 'NEW' : null);

  return (
    <div 
      onClick={() => goToProduct(product)}
      className="group relative text-center border border-transparent hover:border-gray-200 hover:shadow-lg rounded-lg p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className="relative bg-gray-100 rounded-lg overflow-hidden">
          <Image 
            src={product.imageUrls[0] || '/placeholder.png'} 
            alt={product.name} 
            width={300} 
            height={300} 
            className="w-full h-auto object-cover"
          />
          {tag && (
            <span
              className={`absolute top-3 left-[-6px] text-xs font-bold uppercase py-1.5 px-3 rounded-r-full z-10 ${
                tag === 'SALE' ? 'bg-red-500 text-white' : 'bg-pink-500 text-white'
              }`}
            >
              {tag}
            </span>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(product._id);
            }}
            className={`absolute top-3 right-3 z-10 transition-colors ${isLiked ? 'text-pink-500' : 'text-gray-700 opacity-0 group-hover:opacity-100'}`}
          >
            <FiHeart size={22} />
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-sm md:text-base text-gray-800 font-medium">{product.name}</h3>
          <div className="mt-1 flex justify-center items-baseline gap-2">
            <p className="text-base text-gray-900 font-bold">{newPrice.toFixed(2)} DT</p>
            {showDiscount && (
              <>
                <p className="text-sm text-gray-400 line-through">{originalPrice.toFixed(2)} DT</p>
                <p className="text-xs font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-md">
                  -{discount}%
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToBag(product);
          }}
          className="w-full bg-black text-white font-bold py-2.5 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
};

// --- Main Related Products Section ---
const RelatedProducts = () => {
  const params = useParams();
  const productId = params?.id as string; // Extract ID from URL like /ProductDetails/:id
  const { relatedProducts, loading, error } = useRelatedProducts(productId);
  const { addToBag } = useBag();
  const goToProduct = useProductNavigation();
  const { toggleLike, getUserLikes, getProductLikesCount } = useLike();
  
  const [productLikes, setProductLikes] = useState<Record<string, { liked: boolean; count: number }>>({});

  const handleAddToBag = (product: Product) => {
    addToBag({
      _id: product._id,
      name: product.name,
      price: product.price,
      categoryof: product.category.name,
      imageUrl: product.imageUrls[0],
    });
  };

  // Fetch initial like status and counts for related products
  useEffect(() => {
    const fetchLikes = async () => {
      if (!relatedProducts.length) return;
      try {
        const userLikes = await getUserLikes();
        const likedProducts = userLikes.reduce((acc: Record<string, boolean>, like: any) => {
          acc[like.product._id] = true;
          return acc;
        }, {});

        const countsPromises = relatedProducts.map(p => getProductLikesCount(p._id));
        const counts = await Promise.all(countsPromises);

        const likesData = relatedProducts.reduce((acc, p, i) => {
          acc[p._id] = { liked: likedProducts[p._id] || false, count: counts[i] };
          return acc;
        }, {} as Record<string, { liked: boolean; count: number }>);

        setProductLikes(likesData);
      } catch (err) {
        console.error('Error fetching initial likes data:', err);
      }
    };

    fetchLikes();
  }, [relatedProducts, getUserLikes, getProductLikesCount]);

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

  if (loading) return <div className="text-center py-8">Loading related products...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!relatedProducts.length) return <div className="text-center py-8 text-gray-500">No related products found.</div>;

  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {relatedProducts.map((product) => {
            const likesData = productLikes[product._id] || { liked: false, count: 0 };
            return (
              <ProductCard 
                key={product._id} 
                product={product}
                onAddToBag={handleAddToBag}
                goToProduct={goToProduct}
                isLiked={likesData.liked}
                onToggleLike={handleToggleLike}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;