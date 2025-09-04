'use client';

import { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import useCategories from '../app/Accueil/hooks/useCategories';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/category';

type SearchBarProps = {
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const { categories, loading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tout les catégories');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownListRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debug: Check if dropdown is rendering but not visible
  useEffect(() => {
    if (dropdownOpen && dropdownListRef.current) {
      console.log('Dropdown rendered at:', dropdownListRef.current.getBoundingClientRect());
    }
  }, [dropdownOpen]);

  const handleCategorySelect = (name: string) => {
    setSelectedCategory(name);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchText.trim() !== '') {
      params.append('q', searchText.trim());
    }

    if (selectedCategory !== 'Tout les catégories') {
      params.append('category', selectedCategory);
    }

    const queryString = params.toString();
    const targetPath = `/filter${queryString ? `?${queryString}` : ''}`;
    router.push(targetPath);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main search container - now without overflow-hidden */}
      <div className="flex items-center border border-gray-300 rounded-full shadow-sm bg-white">
        {/* Dropdown toggle */}
        <div
          ref={dropdownRef}
          onClick={toggleDropdown}
          className="flex items-center px-4 py-2 border-r border-gray-300 gap-1 text-gray-700 text-sm cursor-pointer select-none whitespace-nowrap relative"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          aria-label="Select category"
        >
          <span className="truncate max-w-[130px]">{selectedCategory}</span>
          <BiChevronDown 
            size={20} 
            className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Trouvez votre rêve ici"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 px-4 py-2 text-sm outline-none bg-transparent"
          aria-label="Search products"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-pink-500 hover:bg-pink-600 transition-colors duration-200 text-white p-3 rounded-r-full flex items-center justify-center"
          aria-label="Search"
        >
          <FaSearch size={16} />
        </button>
      </div>

      {/* Dropdown list - moved outside the main container */}
      {dropdownOpen && (
        <div 
          ref={dropdownListRef}
          className="absolute top-full left-0 z-50 mt-1 w-56 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          style={{ 
            // Force visibility for debugging
            border: '1px solid #e5e7eb',
            opacity: 1,
            display: 'block',
          }}
        >
          {/* Default option */}
          <div
            onClick={() => handleCategorySelect('Tout les catégories')}
            className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
              selectedCategory === 'Tout les catégories' ? 'bg-gray-100 font-semibold' : ''
            }`}
          >
            Tout les catégories
          </div>

          {/* Loading state */}
          {loading && (
            <div className="px-4 py-2 text-sm text-gray-500 select-none">Chargement...</div>
          )}

          {/* Error state */}
          {error && (
            <div className="px-4 py-2 text-sm text-red-500 select-none">Erreur: {error}</div>
          )}

          {/* Category list */}
          {!loading && !error && categories.length > 0 && (
            categories.map((category: Category, index: number) => (
              <div
                key={category.id ?? category.name ?? `category-${index}`}
                onClick={() => handleCategorySelect(category.name)}
                className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                  selectedCategory === category.name ? 'bg-gray-100 font-semibold' : ''
                }`}
              >
                {category.name}
              </div>
            ))
          )}

          {/* Empty state */}
          {!loading && !error && categories.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500 select-none">Aucune catégorie disponible</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;