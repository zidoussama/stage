// frontend/src/app/filter/page.tsx
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiList, FiGrid, FiChevronDown, FiX } from 'react-icons/fi';
import { Product } from '@/types/product';
import { getAllProducts } from '@/hooks/useProduct';
import FilterSidebar from '@/components/filter';
import ProductGrid from './components/ProductGrid';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';

interface Filters {
  category: string[];
  genre: string[];
  brands: string[];
  rating: number[];
  typePeau: string[];
  concern: string[];
  ingredients: string[];
  size: string[];
  price: number;
  search: string;
}

const initialFilters: Filters = {
  category: [],
  genre: [],
  brands: [],
  rating: [],
  typePeau: [],
  concern: [],
  ingredients: [],
  size: [],
  price: 500,
  search: '',
};

const ShopPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = view === 'grid' ? 16 : 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // Initialize filters from URL params
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';

    const newFilters: Filters = {
      ...initialFilters,
      search: q,
      category: category ? [category] : [],
    };

    setFilters(newFilters);
    setCurrentPage(1);
  }, [searchParams]);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.category.length > 0) params.set('category', filters.category[0]); // Assuming single category for URL

    // Add other filters if needed, but for now, just q and category
    const queryString = params.toString();
    router.replace(`/filter?${queryString}`, { scroll: false });
  }, [filters.search, filters.category, router]);

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];
    return products.filter((product) => {
      // Search
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Category
      if (filters.category.length > 0 && !filters.category.includes(product.category?.name || '')) {
        return false;
      }

      // Genre
      if (filters.genre.length > 0 && !filters.genre.includes(product.genre || '')) {
        return false;
      }

      // Brands - Updated for object/string handling
      const brandName = typeof product.Brand === 'object' ? product.Brand?.name || '' : product.Brand || '';
      if (filters.brands.length > 0 && !filters.brands.includes(brandName)) {
        return false;
      }

      // Type de peau (array match any)
      if (filters.typePeau.length > 0) {
        const typePeau = Array.isArray(product.typedepeau) ? product.typedepeau : [];
        if (!typePeau.some((tp: string) => filters.typePeau.includes(tp))) {
          return false;
        }
      }

      // Concern (array match any)
      if (filters.concern.length > 0) {
        const concern = Array.isArray(product.concern) ? product.concern : [];
        if (!concern.some((c: string) => filters.concern.includes(c))) {
          return false;
        }
      }

      // Ingredients (array match any)
      if (filters.ingredients.length > 0) {
        const ingredients = Array.isArray(product.ingredients) ? product.ingredients : [];
        if (!ingredients.some((i: string) => filters.ingredients.includes(i))) {
          return false;
        }
      }

      // Size (array match any)
      if (filters.size.length > 0) {
        const size = Array.isArray(product.size) ? product.size : [];
        if (!size.some((s: string) => filters.size.includes(s))) {
          return false;
        }
      }

      // Rating (exact match)
      const rating = typeof product.rating === 'number' ? product.rating : 0;
      if (filters.rating.length > 0 && !filters.rating.includes(rating)) {
        return false;
      }

      // Price
      const price = typeof product.price === 'number' ? product.price : 0;
      if (price > filters.price) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const handleFilterChange = (type: string, value: string | number) => {
    if (type === 'price' || type === 'search') return;
    setFilters(prev => {
      const currentKey = type as keyof Filters;
      const current = prev[currentKey] as (string | number)[];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value) 
        : [...current, value];
      return { ...prev, [currentKey]: updated };
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handlePriceChange = (price: number) => {
    setFilters(prev => ({ ...prev, price: Math.max(0, price) }));
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  // Map keys to readable labels for Résultat trouvé
  const filterLabels: Record<string, string> = {
    category: 'Catégorie',
    genre: 'Genre',
    brands: 'Brands',
    rating: 'Rating',
    typePeau: 'Type de peau',
    concern: 'Concern',
    ingredients: 'Ingredients',
    size: 'Size',
  };

  // Build active filters for display
  const activeFilters = Object.entries(filters).flatMap(([key, values]) => {
    if (key === 'price' || key === 'search' || !Array.isArray(values)) return [];
    return values.map(v => ({
      type: key,
      label: filterLabels[key] || key,
      value: v,
    }));
  });

  // Pagination logic
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + productsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  // Dynamic filter options from products (only non-empty) - Updated brands line
  const options = useMemo(() => ({
    genre: [...new Set(products.map(p => p.genre || '').filter(Boolean))],
    brands: [...new Set(products.map(p => (typeof p.Brand === 'object' ? p.Brand?.name : p.Brand) || '').filter(Boolean))],
    typePeau: [...new Set((products.map(p => Array.isArray(p.typedepeau) ? p.typedepeau : [p.typedepeau || '']).flat()).filter(Boolean))],
    concern: [...new Set((products.map(p => Array.isArray(p.concern) ? p.concern : [p.concern || '']).flat()).filter(Boolean))],
    ingredients: [...new Set((products.map(p => Array.isArray(p.ingredients) ? p.ingredients : [p.ingredients || '']).flat()).filter(Boolean))],
    size: [...new Set((products.map(p => Array.isArray(p.size) ? p.size : [p.size || '']).flat()).filter(Boolean))],
  }), [products]);

  return (
    <div className="bg-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Makeups</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onPriceChange={handlePriceChange}
              onClearAll={handleClearAll}
              options={options}
            />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Résultat trouvé */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-800">Résultat trouvé</h2>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {activeFilters.length > 0 ? (
                    <>
                      <span className="font-semibold text-gray-600">Filtres actifs:</span>
                      {activeFilters.map(({ type, label, value }) => (
                        <span
                          key={`${type}-${value}`}
                          className="flex items-center gap-1 bg-white pl-3 pr-2 py-1 rounded-full border"
                        >
                          {type === 'rating' ? `${value} Stars` : String(value)}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFilterChange(type, value);
                            }}
                            className="ml-1 hover:text-red-500"
                          >
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
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setView('list')}
                      className={`p-2 ${view === 'list' ? 'bg-pink-100 text-pink-600' : 'bg-white hover:bg-gray-100'}`}
                    >
                      <FiList />
                    </button>
                    <button
                      onClick={() => setView('grid')}
                      className={`p-2 ${view === 'grid' ? 'bg-pink-100 text-pink-600' : 'bg-white hover:bg-gray-100'}`}
                    >
                      <FiGrid />
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">{totalProducts} produits trouvés</p>
            </div>

            {/* Products */}
            {paginatedProducts.length > 0 ? (
              view === 'grid' ? (
                <ProductGrid products={paginatedProducts} />
              ) : (
                <ProductList products={paginatedProducts} />
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun produit trouvé.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;