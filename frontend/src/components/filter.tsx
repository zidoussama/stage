'use client';

import { useState } from 'react';
import useProductData from '../hooks/useFilter';
import { ChevronDown } from 'lucide-react';

// --- Reusable Sub-components (unchanged) ---
interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({ title, children, defaultOpen = true }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="py-5 border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center"
      >
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform transform ${
            isOpen ? '' : '-rotate-90'
          }`}
        />
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

interface CheckboxItemProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, id, checked, onChange }) => (
  <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer group">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="custom-checkbox"
    />
    <span
      className={`text-gray-600 group-hover:text-pink-600 transition-colors ${
        checked ? 'text-pink-600 font-medium' : ''
      }`}
    >
      {label}
    </span>
  </label>
);

// --- Filter Sidebar ---
interface FilterState {
  genre: string[];
  skinType: string[];
  concern: string[];
  ingredient: string[];
  size: string[];
}

const FilterSidebar = () => {
  const {
    uniqueGenres,
    uniqueSkinTypes,
    uniqueConcerns,
    uniqueIngredients,
    uniqueSizes,
    loading,
    error
  } = useProductData();

  const [filters, setFilters] = useState<FilterState>({
    genre: [],
    skinType: [],
    concern: [],
    ingredient: [],
    size: []
  });

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentFilters = [...prev[category]];
      const index = currentFilters.indexOf(value);

      if (index > -1) {
        currentFilters.splice(index, 1);
      } else {
        currentFilters.push(value);
      }

      return {
        ...prev,
        [category]: currentFilters
      };
    });
  };

  const handleClearAll = () => {
    setFilters({
      genre: [],
      skinType: [],
      concern: [],
      ingredient: [],
      size: []
    });
  };

  if (loading) return <div className="text-gray-500">Loading filters...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <aside className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 self-start">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Filtrage</h2>
        <button
          onClick={handleClearAll}
          className="text-sm text-gray-500 hover:text-pink-600 transition-colors"
        >
          Effacer tous
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {/* Genre Filter */}
        <FilterSection title="Genre">
          <div className="space-y-3">
            {uniqueGenres.map(genre => (
              <CheckboxItem
                key={genre}
                id={genre}
                label={genre}
                checked={filters.genre.includes(genre)}
                onChange={() => handleFilterChange('genre', genre)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Skin Type Filter */}
        <FilterSection title="Type de peau">
          <div className="space-y-3">
            {uniqueSkinTypes.map(skinType => (
              <CheckboxItem
                key={skinType}
                id={skinType}
                label={skinType}
                checked={filters.skinType.includes(skinType)}
                onChange={() => handleFilterChange('skinType', skinType)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Concern Filter */}
        <FilterSection title="Concern">
          <div className="space-y-3">
            {uniqueConcerns.map(concern => (
              <CheckboxItem
                key={concern}
                id={concern}
                label={concern}
                checked={filters.concern.includes(concern)}
                onChange={() => handleFilterChange('concern', concern)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Ingredient Filter */}
        <FilterSection title="Ingredients">
          <div className="space-y-3">
            {uniqueIngredients.map(ingredient => (
              <CheckboxItem
                key={ingredient}
                id={ingredient}
                label={ingredient}
                checked={filters.ingredient.includes(ingredient)}
                onChange={() => handleFilterChange('ingredient', ingredient)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Size Filter */}
        <FilterSection title="Size">
          <div className="space-y-3">
            {uniqueSizes.map(size => (
              <CheckboxItem
                key={size}
                id={size}
                label={size}
                checked={filters.size.includes(size)}
                onChange={() => handleFilterChange('size', size)}
              />
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
};

export default FilterSidebar;
