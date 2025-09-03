'use client';

import Image from 'next/image';
import {
  FaChevronLeft,
  FaChevronRight,
  FaBagShopping,
  FaStar,
  FaHeart,
  FaExpand,
  FaEye
} from 'react-icons/fa6';
import { useProductNavigation } from '@/hooks/useProductNavigation';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/fetshproduct';
import { useBag } from '@/hooks/useBag';


export default function NewInStore() {
  const { products, loading, error } = useProducts('new in store');
  const router = useRouter();
  const goToProduct = useProductNavigation();
  const previewProduct = products[0];
  const imageUrls = previewProduct?.imageUrls || [];
  
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

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!products.length) {
    return <div className="text-center py-20 text-gray-500">No new products found.</div>;
  }

  return (
    <section className="px-4 sm:px-6 py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-wide">NEW IN STORE</h2>
          <button className="text-sm text-gray-600 hover:text-black font-medium" onClick={() => router.push('/NouveauProduit')}>Voir plus</button>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

{/* LEFT COLUMN: Product Grid */}
<div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10" >
  {products.slice(0, 6).map((product) => (
    <div key={product._id} className="group flex flex-col">
      <div onClick={() => goToProduct(product)} className="relative border border-gray-200 rounded-xl p-3 mb-4">
        {/* Hover Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-pink-500"><FaHeart size={14} /></button>
          <button className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-pink-500"><FaExpand size={14} /></button>
          <button className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-pink-500"><FaEye size={14} /></button>
        </div>

        {/* Product Image */}
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          width={180}
          height={180}
          className="w-full h-65 object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Add to Bag Button */}
        <button onClick={() => handleAddToBag(product)} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 font-semibold flex items-center justify-center gap-2">
          <FaBagShopping size={12} /> ADD TO BAG
        </button>
      </div>

      {/* Product Info */}
      <div className="text-left">
        <h4 className="text-[10px] uppercase text-gray-500 tracking-wider mb-1">{product.category.name}</h4>
        <p className="text-sm font-medium text-gray-800 mb-2 truncate">{product.name}</p>
        <p className="text-lg font-bold text-gray-900">{product.price} DT</p>
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < 4 ? 'text-pink-500' : 'text-gray-300'} />
          ))}
          <span className="ml-1">(4.0/5) | 25 Sold</span>
        </div>
      </div>
    </div>
  ))}
</div>


          {/* RIGHT COLUMN: Product Detail View */}
          <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-gray-200 shadow-lg flex flex-col gap-5 self-start">
            <div className="relative aspect-square w-full overflow-hidden rounded-[20px]">
              {imageUrls.length > 0 && (
                <Image
                  src={imageUrls[0]}
                  alt="Preview Product"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center items-center">
              <FaChevronLeft className="text-gray-400 hover:text-black cursor-pointer" />
              {imageUrls.map((img, i) => (
                <div key={i} className={`p-1 rounded-lg border-2 ${i === 1 ? 'border-black' : 'border-gray-200'}`}>
                  <div className="relative w-24 h-24 rounded-md overflow-hidden">
                    <Image src={img} alt={`thumb ${i + 1}`} fill className="object-cover" />
                  </div>
                </div>
              ))}
              <FaChevronRight className="text-gray-400 hover:text-black cursor-pointer" />
            </div>

            {/* Product Details */}
            {previewProduct && (
              <div>
                <h4 className="text-xs text-gray-500 uppercase mb-1">{previewProduct.category.name}</h4>
                <p className="text-lg font-bold text-gray-900 mb-1">{previewProduct.name}</p>
                <div className="flex items-center text-xs text-gray-400 gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < 4 ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                  <span className="ml-1">(4.0/5) | 25 Sold</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-6">{previewProduct.price} DT</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs text-gray-600 font-semibold">QUANTITY</span>
                  <div className="flex items-center border rounded-full px-3 py-1">
                    <button className="text-gray-500 text-lg focus:outline-none">-</button>
                    <span className="px-4 font-semibold">1</span>
                    <button className="text-gray-500 text-lg focus:outline-none">+</button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAddToBag(previewProduct)} className="flex-grow py-3 text-sm rounded-full border border-pink-500 bg-white text-pink-500 font-semibold hover:bg-pink-50 transition flex items-center justify-center gap-1.5">
                    <FaBagShopping /> ADD TO BAG
                  </button>
                  <button className="flex-grow py-3 text-sm rounded-full bg-black text-white hover:opacity-90 transition font-semibold" onClick={() => goToProduct(previewProduct)}>View</button>
                  <button className="p-3 border rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition"><FaHeart /></button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
