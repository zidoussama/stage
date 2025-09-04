'use client';

import React, { useEffect, useState } from 'react';
import { FiList, FiGrid, FiChevronDown, FiX } from 'react-icons/fi';
import { Product } from '@/types/product';
import { getAllProducts } from '@/hooks/useProduct';
import FilterSidebar from '@/components/filter';
import ProductGrid from './components/ProductGrid';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';

interface Filters {
  genre: string[];
  brands: string[];
  rating: number[];
  typePeau: string[];
  concern: string[];
  ingredients: string[];
  price: number;
}

const initialFilters: Filters = {
  genre: [],
  brands: [],
  rating: [],
  typePeau: [],
  concern: [],
  ingredients: [],
  price: 500,
};

const ShopPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = view === 'grid' ? 16 : 8;

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (type: string, value: string | number) => {
    if (type === 'price') return;
    setFilters(prev => {
      const current = prev[type as keyof Filters] as (string | number)[];
      const updated = current.includes(value) ? current.filter(item => item !== value) : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const handlePriceChange = (price: number) => {
    setFilters(prev => ({ ...prev, price }));
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
  };

  const activeFilters = Object.entries(filters).flatMap(([key, values]) => {
    if (key === 'price' || !Array.isArray(values)) return [];
    return values.map(v => ({ type: key, value: v }));
  });

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(startIdx, startIdx + productsPerPage);

  return (
    <div className="bg-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Makeups</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
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
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {activeFilters.length > 0 ? (
                    <>
                      <span className="font-semibold text-gray-600">Filtres actifs:</span>
                      {activeFilters.map(({ type, value }) => (
                        <span key={`${type}-${value}`} className="flex items-center gap-1 bg-white pl-3 pr-2 py-1 rounded-full">
                          {type === 'rating' ? `${value} Stars` : value}
                          <button onClick={() => handleFilterChange(type, value)}><FiX size={16} /></button>
                        </span>
                      ))}
                    </>
                  ) : <span className="text-gray-500">Aucun filtre actif</span>}
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-700">
                    <span>Prix plus élevé</span>
                    <FiChevronDown />
                  </button>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-pink-100 text-pink-600' : 'bg-white'}`}><FiList /></button>
                    <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-pink-100 text-pink-600' : 'bg-white'}`}><FiGrid /></button>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">{products.length} produits trouvés</p>
            </div>

            {view === 'grid' ? (
              <ProductGrid products={paginatedProducts} />
            ) : (
              <ProductList products={paginatedProducts} />
            )}

            <div className="flex justify-center items-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
