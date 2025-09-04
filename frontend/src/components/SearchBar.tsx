'use client';

import { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import useCategories from '../app/Accueil/hooks/useCategories'; // Adjust path as needed
import { useRouter } from 'next/navigation';
import { Category } from '@/types/category'; // Adjust path as needed

type SearchBarProps = {
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const { categories, loading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tout les catégories');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Handle selecting a category
  const handleCategorySelect = (name: string) => {
    setSelectedCategory(name);
    setDropdownOpen(false);
    console.log('Category selected:', name); // Debugging log
  };

  // Handle form submission or search button click
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchText.trim() !== '') {
      params.append('q', searchText.trim());
    }

    // Only append the category parameter if a specific category is selected
    if (selectedCategory !== 'Tout les catégories') {
      params.append('category', selectedCategory);
    }

    const queryString = params.toString();
    const targetPath = `/filter${queryString ? `?${queryString}` : ''}`;

    console.log('Navigating to:', targetPath); // Debugging log
    router.push(targetPath);
  };

  return (
    <div className={`relative flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm bg-white ${className}`}>
      {/* Dropdown toggle */}
      <div
        ref={dropdownRef}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center px-4 py-2 border-r border-gray-300 gap-1 text-gray-700 text-sm cursor-pointer select-none whitespace-nowrap relative"
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen}
        aria-label="Select category"
      >
        <span className="truncate max-w-[130px]">{selectedCategory}</span>
        <BiChevronDown size={20} />
      </div>

      {/* Dropdown list */}
      {dropdownOpen && (
        <div className="absolute top-full left-0 z-[9999] mt-1 w-56 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
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
          {!loading &&
            !error &&
            categories.map((category: Category, index: number) => (
              <div
                key={category.id ?? category.name ?? `category-${index}`} // Added fallback for key
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

      {/* Search input */}
      <input
        type="text"
        placeholder="Trouvez votre rêve ici"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="flex-1 px-4 py-2 text-sm outline-none bg-transparent"
        aria-label="Search products"
        onKeyDown={(e) => { // Added keydown handler for Enter press
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
  );
};

export default SearchBar;