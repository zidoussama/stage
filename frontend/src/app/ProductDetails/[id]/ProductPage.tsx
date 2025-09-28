'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import {
  FiHeart, FiMinus, FiPlus, FiShoppingCart,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { FaStar, FaFacebookF, FaWhatsapp, FaTwitter, FaHeart } from 'react-icons/fa';
import { RiMessengerLine } from 'react-icons/ri';

import RelatedProducts from '@/components/RelatedProducts';
import ProductInfoTabs from '../components/ProductInfoTabs';
import { useLike } from '../../../hooks/useToggleLike';
import useProductById from '@/hooks/useProduct';
import { useBag } from '@/hooks/useBag';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={
            i < fullStars
              ? 'text-pink-500'
              : hasHalfStar && i === fullStars
              ? 'text-pink-300'
              : 'text-gray-300'
          }
        />
      ))}
    </div>
  );
};

interface ProductPageProps {
  productId: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  // Fetch product by ID using custom hook
  const { product, loading, error } = useProductById(productId);

  // Bag context
  const { addToBag } = useBag();
  const { toggleLike, getUserLikes, getProductLikesCount } = useLike();

  // Handlers
  const increase = useCallback(() => setQuantity(prev => prev + 1), []);
  const decrease = useCallback(() => setQuantity(prev => (prev > 1 ? prev - 1 : 1)), []);

  const handleAddToBag = useCallback(() => {
    if (!product) return;
    addToBag(
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        categoryof: product.category.name,
        imageUrl: product.imageUrls[0],
      },
      quantity
    );
  }, [product, quantity, addToBag]);

  // Fetch initial like status and count
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [userLikes, productLikes] = await Promise.all([
          getUserLikes(),
          getProductLikesCount(productId)
        ]);
        const hasLiked = userLikes.some((like: any) => like.product._id === productId);
        setLiked(hasLiked);
        setCount(productLikes);
      } catch (err) {
        console.error('Error fetching initial data:', err);
      }
    };

    fetchInitialData();
  }, [productId, getUserLikes, getProductLikesCount]);

  // Toggle like
  const handleToggleLike = useCallback(async () => {
    if (!product) return;
    try {
      const data = await toggleLike(product._id);
      setLiked(data.like.is_liked);
      const newCount = await getProductLikesCount(product._id);
      setCount(newCount);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  }, [product?._id, toggleLike, getProductLikesCount]);

  // Loading/Error states
  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product: {error}</p>;
  if (!product) return <p>Product not found</p>;

  // Discount calculation
  const isOnSale = product.state === 'sale' && product.discount > 0;
  const discountedPrice = isOnSale
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const productData = {
    description: product.description,
    composition: product.Composition || '',
    autresInfo: product.otherinfo || '',
  };

  return (
    <div className="bg-white font-sans">
      <main className="container mx-auto px-4 pt-8 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column: Images */}
          <div>
            <div className="border rounded-lg overflow-hidden">
              <Image
                src={product.imageUrls[0] || '/placeholder.png'}
                alt={product.name}
                width={600}
                height={600}
                className="w-full object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="relative mt-4 flex items-center justify-center gap-2">
              <button className="text-gray-400 hover:text-gray-800">
                <FiChevronLeft size={20} />
              </button>
              <div className="flex-1 grid grid-cols-5 gap-2">
                {product.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className={`rounded-md overflow-hidden cursor-pointer ${
                      index === 0 ? 'border-2 border-pink-500' : 'border border-gray-200'
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
              <button className="text-gray-400 hover:text-gray-800">
                <FiChevronRight size={20} />
              </button>
            </div>

            {/* Social Sharing */}
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-700">
              <span>Partager</span>
              <div className="flex gap-2">
                <a href="#" aria-label="Twitter" className="social-btn"><FaTwitter /></a>
                <a href="#" aria-label="Facebook" className="social-btn"><FaFacebookF /></a>
                <a href="#" aria-label="WhatsApp" className="social-btn"><FaWhatsapp /></a>
                <a href="#" aria-label="Messenger" className="social-btn"><RiMessengerLine /></a>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleToggleLike}
                  className={`icon-btn ${liked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                  aria-label="Toggle Like"
                >
                  {liked ? <FaHeart /> : <FiHeart />}
                </button>
                <span className="text-xs text-gray-500">({count})</span>
              </div>
            </div>


            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">{discountedPrice.toFixed(2)} DT</span>
              {isOnSale && (
                <>
                  <span className="tag">{product.discount}%</span>
                  <span className="line-through text-gray-400">{product.price.toFixed(2)} DT</span>
                </>
              )}
              
            </div>

            {/* Description */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-semibold text-gray-800">Brève Description</h3>
              <p className="mt-2 text-sm text-gray-600">{product.description}</p>
            </div>

            {/* Stock and Size */}
            <div className="mt-6 flex justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Taille</span>
                <button className="px-4 py-1.5 bg-white border rounded text-sm">{product.size || '90 ml'}</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Stock</span>
                <span className="text-sm text-gray-600">{product.stock}</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border rounded">
                <button onClick={decrease} className="px-3 py-1 border-r text-gray-600"><FiMinus /></button>
                <input
                  type="number"
                  className="w-12 text-center focus:outline-none"
                  value={quantity}
                  readOnly
                />
                <button onClick={increase} className="px-3 py-1 border-l text-gray-600"><FiPlus /></button>
              </div>
              <button
                onClick={handleAddToBag}
                className="btn-primary flex justify-center items-center gap-2 bg-pink-600 rounded-full w-52 h-10 text-sm text-white text-center"
              >
                <FiShoppingCart /> Add to Cart
              </button>
            </div>

          </div>
        </div>

        {/* Tabs for Product Info */}
        <ProductInfoTabs productData={productData} />

        {/* Related Products */}
        <RelatedProducts />
      </main>
    </div>
  );
};

export default ProductPage;