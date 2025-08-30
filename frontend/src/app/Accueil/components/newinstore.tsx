'use client';

import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaBagShopping, FaStar, FaHeart, FaExpand, FaEye } from 'react-icons/fa6';

// Using your specified image imports
import p1 from '@/assets/products/pro1.png'; 
import p2 from '@/assets/products/pro2.png';
import p3 from '@/assets/products/pro3.png';
import p4 from '@/assets/products/pro4.png';
import p5 from '@/assets/products/pro5.png';
import p6 from '@/assets/products/pro6.png';
import previewImg from '@/assets/products/pro7.png';
import thumb1 from '@/assets/products/pro71.png';
import thumb2 from '@/assets/products/pro72.png';
import thumb3 from '@/assets/products/pro73.png';

const newProducts = [
  { id: 1, name: 'Radiant Creamy Concealer', category: 'MAKEUP', price: '$39.99', rating: 4.5, sold: 20, image: p1 },
  { id: 2, name: 'Eyeshadow Palette', category: 'EYES MAKEUP', price: '$29.99', rating: 4.9, sold: 31, image: p2 },
  { id: 3, name: 'Hyaluronic Acid Serum', category: 'SKINCARE', price: '$19.99', rating: 4.8, sold: 19, image: p3 },
  { id: 4, name: 'Curl Defining Cream', category: 'HAIRCARE', price: '$24.99', rating: 4.6, sold: 17, image: p4 },
  { id: 5, name: 'Liquid Eyeliner', category: 'EYES MAKEUP', price: '$14.99', rating: 4.7, sold: 26, image: p5, isFeatured: true },
  { id: 6, name: 'Matte Setting Powder', category: 'FACE MAKEUP', price: '$12.99', rating: 4.5, sold: 18, image: p6 },
];

const thumbnailImages = [thumb1, thumb2, thumb3];

export default function NewInStore() {
  return (
    <section className="px-4 sm:px-6 py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-wide">NEW IN STORE</h2>
          <button className="text-sm text-gray-600 hover:text-black font-medium">Voir plus</button>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Product Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10">
            {newProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className={`relative ${product.isFeatured ? 'bg-pink-50' : 'border border-gray-200'} rounded-xl p-3 mb-4`}>
                  
                  {/* Hover Icons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-pink-500"><FaHeart size={14} /></button>
                      <button className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-pink-500"><FaExpand size={14} /></button>
                      <button className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-pink-500"><FaEye size={14} /></button>
                  </div>

                  {/* Corrected Image class */}
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={180} 
                    height={180} 
                    className="w-full h-65 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Hover "Add to Bag" Button */}
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 font-semibold flex items-center justify-center gap-2">
                    <FaBagShopping size={12} /> ADD TO BAG
                  </button>
                </div>
                
                <div className="text-left">
                  <h4 className="text-[10px] uppercase text-gray-500 tracking-wider mb-1">{product.category}</h4>
                  <p className="text-sm font-medium text-gray-800 mb-2 truncate">{product.name}</p>
                  <p className="text-lg font-bold text-gray-900">{product.price}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    {[...Array(5)].map((_, i) => (<FaStar key={i} className={i < Math.round(product.rating) ? 'text-pink-500' : 'text-gray-300'} />))}
                    <span className="ml-1">({product.rating}/5) | {product.sold} Sold</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Product Detail View */}
          <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-gray-200 shadow-lg flex flex-col gap-5 self-start">
            <div className="relative aspect-square w-full overflow-hidden rounded-[20px]">
  <Image 
    src={previewImg} 
    alt="Preview Product" 
    fill 
    className="object-cover" 
  />
</div>
            
            {/* --- THIS IS THE CORRECTED THUMBNAIL SECTION --- */}
            <div className="flex gap-3 justify-center items-center">
              <FaChevronLeft className="text-gray-400 hover:text-black cursor-pointer" />
              {thumbnailImages.map((thumb, i) => (
                <div key={i} className={`p-1 rounded-lg border-2 ${i === 1 ? 'border-black' : 'border-gray-200'}`}>
                  {/* Inner div to enforce square size */}
                  <div className="relative w-24 h-24 rounded-md overflow-hidden">
                     <Image src={thumb} alt={`thumb ${i+1}`} fill className="object-cover" />
                  </div>
                </div>
              ))}
              <FaChevronRight className="text-gray-400 hover:text-black cursor-pointer" />
            </div>
            
            <div>
              <h4 className="text-xs text-gray-500 uppercase mb-1">EYES MAKEUP</h4>
              <p className="text-lg font-bold text-gray-900 mb-1">Mascara Perfect Black</p>
              <div className="flex items-center text-xs text-gray-400 gap-1 mb-4">
                  <FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /><FaStar className="text-gray-300" />
                  <span className="ml-1">(4.7/5) | 56 Sold</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-6">16.85 DT</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs text-gray-600 font-semibold">QUANTITY</span>
                <div className="flex items-center border rounded-full px-3 py-1">
                  <button className="text-gray-500 text-lg focus:outline-none">-</button>
                  <span className="px-4 font-semibold">2</span>
                  <button className="text-gray-500 text-lg focus:outline-none">+</button>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-grow py-3 text-sm rounded-full border border-pink-500 bg-white text-pink-500 font-semibold hover:bg-pink-50 transition flex items-center justify-center gap-1.5">
                  <FaBagShopping /> ADD TO BAG
                </button>
                <button className="flex-grow py-3 text-sm rounded-full bg-black text-white hover:opacity-90 transition font-semibold">Acheter</button>
                <button className="p-3 border rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition"><FaHeart /></button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}