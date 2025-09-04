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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // null = all
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null); // ✅ wraps toggle + menu
  const router = useRouter();

  // ✅ Close dropdown when clicking outside the whole wrapper (toggle + menu)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (name: string | null) => {
    setSelectedCategory(name);        // ✅ updates label
    setDropdownOpen(false);           // close after select
  };

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchText.trim() !== '') params.append('q', searchText.trim());
    if (selectedCategory) params.append('category', selectedCategory);

    const queryString = params.toString();
    router.push(`/filter${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Main search container */}
      <div className="flex items-center border border-gray-300 rounded-full shadow-sm bg-white">
        {/* Dropdown toggle (shows current selection) */}
        <div
          onClick={toggleDropdown}
          className="flex items-center px-4 py-2 border-r border-gray-300 gap-1 text-gray-700 text-sm cursor-pointer select-none whitespace-nowrap relative"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          aria-label="Select category"
        >
          <span className="truncate max-w-[130px]">
            {selectedCategory ?? 'Toutes les catégories'}
          </span>
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
            if (e.key === 'Enter') handleSearch();
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

      {/* Dropdown list */}
      {dropdownOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-56 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {/* Default option = all categories */}
          <div
            onClick={() => handleCategorySelect(null)}
            className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
              !selectedCategory ? 'bg-gray-100 font-semibold' : ''
            }`}
          >
            Toutes les catégories
          </div>

          {/* Loading / Error */}
          {loading && <div className="px-4 py-2 text-sm text-gray-500 select-none">Chargement...</div>}
          {error && <div className="px-4 py-2 text-sm text-red-500 select-none">Erreur: {error}</div>}

          {/* Category list */}
          {!loading && !error && categories.map((category: Category, index: number) => (
            <div
              key={category.id ?? category.name ?? `category-${index}`}
              onClick={() => handleCategorySelect(category.name)}
              className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                selectedCategory === category.name ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
