'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FiHeart, FiMaximize, FiEye, FiList, FiGrid, FiChevronDown, FiX, FiShoppingCart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import FilterSidebar from '@/components/filter'; 
import p1 from '@/assets/p1.png'; 
import p2 from '@/assets/p1.png'; 
import p3 from '@/assets/p1.png';
import p4 from '@/assets/p1.png';

// --- TYPES ---
import type { StaticImageData } from 'next/image';

interface Product {
  id: number;
  name: string;
  image: string | StaticImageData;
  rating: number;
  reviewCount: number;
  description: string;
  price: number;
  salePrice: number | null;
  discount: number | null;
  badge: {
    type: 'new' | 'percent' | 'solde' | null;
    text: string;
  } | null;
}

interface Filters {
  genre: string[];
  brands: string[];
  rating: number[];
  typePeau: string[];
  concern: string[];
  ingredients: string[];
  price: number;
}

// --- DUMMY DATA ---
const baseProducts: Product[] = [
  { id: 1, name: 'Satin Trousers With Elastic', image: p1, rating: 4.5, reviewCount: 143, description: 'Rejuvenate and refresh your skin with our Rosewater Hydrating Mist. Infused with the essence of roses, it hydrates, soothes, and revitalizes, leaving your skin with a healthy and radiant glow.', price: 98.00, salePrice: 68.00, discount: 25, badge: null },
  { id: 2, name: 'Straight Trousers', image: p2, rating: 4.0, reviewCount: 98, description: 'A classic straight mascara for a timeless look.', price: 68.00, salePrice: null, discount: null, badge: { type: 'new', text: 'NEW' } },
  { id: 3, name: 'Biker-Style Leggings', image: p3, rating: 4.8, reviewCount: 210, description: 'The perfect tool for flawless foundation application.', price: 98.00, salePrice: 68.00, discount: 25, badge: { type: 'percent', text: '25%' } },
  { id: 4, name: 'Jacquard Fluid Trousers', image: p4, rating: 4.2, reviewCount: 75, description: 'Define your eyes with this sharp, long-lasting eyeliner.', price: 68.00, salePrice: null, discount: null, badge: null },
];

const products: Product[] = Array.from({ length: 28 }, (_, i) => ({ ...baseProducts[i % baseProducts.length], id: i + 1 }));

// --- UPDATED initialFilters ---
const initialFilters: Filters = {
  genre: [],
  brands: [],
  rating: [],
  typePeau: [],
  concern: [],
  ingredients: [],
  price: 500, // Changed from [0, 500] to a single value
};

// --- HELPER COMPONENTS ---
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<FaStar key={i} className={i <= rating ? 'text-pink-500' : 'text-gray-300'} />);
  }
  return <div className="flex items-center">{stars}</div>;
};

const ProductGridCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="group relative bg-gray-100 rounded-xl p-4 flex flex-col">
    {product.badge && (
      <div
        className={`absolute top-3 left-3 z-10 text-white text-xs font-bold uppercase
                ${product.badge.type === 'solde' ? 'bg-orange-500 px-3 py-1 rounded-md' : ''}
                ${product.badge.type === 'new' ? 'bg-pink-500 w-10 h-10 rounded-full flex items-center justify-center' : ''}
                ${product.badge.type === 'percent' ? 'bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center' : ''}`}
      >
        {product.badge.text}
      </div>
    )}
    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="p-2 border rounded-full bg-white/80"><FiHeart size={18} /></button>
      <button className="p-2 border rounded-full bg-white/80"><FiMaximize size={18} /></button>
      <button className="p-2 border rounded-full bg-pink-600 text-white"><FiEye size={18} /></button>
    </div>
    <div className="relative mb-4">
      <Image src={product.image} alt={product.name} width={250} height={250} className="w-full h-auto object-contain rounded-md" />
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-full bg-gray-800 text-white font-semibold py-2.5 rounded-lg">ADD TO BAG</button>
      </div>
    </div>
    <div className="text-center mt-auto">
      <h3 className="font-semibold text-gray-800">{product.name}</h3>
      <div className="flex justify-center items-baseline gap-2 mt-2">
        {product.salePrice ? (
          <>
            <span className="font-bold text-gray-900">${product.salePrice.toFixed(2)}</span>
            <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
            <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-md">-{product.discount}%</span>
          </>
        ) : (
          <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
        )}
      </div>
    </div>
  </div>
);

const ProductListCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="group bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row gap-6 relative">
    <div className="relative w-full sm:w-1/4 flex-shrink-0">
      {product.badge && (
        <div className="absolute top-0 left-0 w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold z-10 -translate-x-1/4 -translate-y-1/4">
          <span>{product.badge.text}</span>
        </div>
      )}
      <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
        <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-auto object-contain rounded-md" />
      </div>
    </div>

    <div className="flex-1 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <div className="flex items-center gap-2 my-2 text-xs text-gray-500">
        <StarRating rating={product.rating} />
        <span>({product.rating}/5) | {product.reviewCount} Reviews</span>
      </div>

      <div className="flex items-baseline gap-3 my-2">
        {product.salePrice ? (
          <>
            <span className="text-3xl font-bold text-gray-900">${product.salePrice.toFixed(2)}</span>
            <span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
            <span className="bg-pink-600 text-white text-sm font-semibold px-3 py-1 rounded-full">-{product.discount}%</span>
          </>
        ) : (
          <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
        )}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed my-3 flex-grow">
        {product.description}
      </p>
    </div>

    <div className="flex flex-col justify-between items-center sm:items-end flex-shrink-0">
      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 border rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-100"><FiHeart size={18} /></button>
        <button className="p-2 border rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-100"><FiMaximize size={18} /></button>
        <button className="p-2 border rounded-full bg-pink-600 text-white shadow-lg"><FiEye size={18} /></button>
      </div>
      <button className="flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors">
        <FiShoppingCart size={18} />
        ADD TO BAG
      </button>
    </div>
  </div>
);


// --- MAIN SHOP PAGE COMPONENT ---
const ShopPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filters, setFilters] = useState<Filters>(initialFilters);

  // --- Filter Handlers ---
  const handleFilterChange = (type: string, value: string | number) => {
    // Only handle array-type filters, skip 'price'
    if (type === 'price') return;
    setFilters(prev => {
      const currentValues = Array.isArray(prev[type as keyof Filters]) ? (prev[type as keyof Filters] as (string | number)[]) : [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item: string | number) => item !== value)
        : [...currentValues, value];
      return { ...prev, [type]: newValues };
    });
  };

  const handlePriceChange = (newPrice: number) => {
    setFilters(prev => ({ ...prev, price: newPrice }));
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
  };

  const activeFilterEntries = Object.entries(filters).flatMap(([type, values]) => {
    if (type === 'price' || !Array.isArray(values) || values.length === 0) {
      return [];
    }
    return values.map(value => ({ type, value }));
  });

  return (
    <div className="bg-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Makeups</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            {/* Pass state and handlers to the sidebar */}
            <FilterSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
              onPriceChange={handlePriceChange}
              onClearAll={handleClearAll}
            />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-800">Résultat trouvé</h2>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                {/* This section is now dynamic */}
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {activeFilterEntries.length > 0 ? (
                    <>
                      <span className="font-semibold text-gray-600">Filtres actifs:</span>
                      {activeFilterEntries.map(({ type, value }) => (
                        <span key={`${type}-${value}`} className="flex items-center gap-1 bg-white pl-3 pr-2 py-1 rounded-full">
                          {type === 'rating' ? `${value} Stars` : value}
                          <button onClick={() => handleFilterChange(type, value)}>
                            <FiX size={16} />
                          </button>
                        </span>
                      ))}
                    </>
                  ) : (
                    <span className="text-gray-500">Aucun filtre actif</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-700">
                    <span>Prix plus élevé</span>
                    <FiChevronDown />
                  </button>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={() => setView('list')} className={`p-2 transition-colors ${view === 'list' ? 'bg-pink-100 text-pink-600' : 'bg-white'}`}><FiList /></button>
                    <button onClick={() => setView('grid')} className={`p-2 transition-colors ${view === 'grid' ? 'bg-pink-100 text-pink-600' : 'bg-white'}`}><FiGrid /></button>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">96 de 1 résultats trouvés</p>
            </div>

            <div className={view === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "flex flex-col gap-6"
            }>
              {products.map((product) => (
                view === 'grid' 
                  ? <ProductGridCard key={product.id} product={product} />
                  : <ProductListCard key={product.id} product={product} />
              ))}
            </div>

            <div className="flex justify-center items-center mt-8">
              <nav className="flex items-center gap-2">
                <button className="p-2 opacity-50"><FiChevronLeft /></button>
                <button className="w-8 h-8 rounded-md bg-gray-800 text-white font-semibold">1</button>
                <button className="w-8 h-8 rounded-md hover:bg-gray-200 font-semibold">2</button>
                <button className="p-2"><FiChevronRight /></button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;