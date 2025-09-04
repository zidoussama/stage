'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { getAllBrand } from '../hooks/useBrand'; // ✅ adjust path if needed

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

// --- PriceSlider + RatingRow unchanged ---
// (I’ll keep them as you wrote above)

// --- Sidebar Component ---

interface FilterSidebarProps {
  filters: {
    genre: string[];
    brands: string[];
    price: number;
    rating: number[];
    typePeau: string[];
    concern: string[];
    ingredients: string[];
  };
  onFilterChange: (section: string, value: string | number) => void;
  onPriceChange: (value: number) => void;
  onClearAll: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onPriceChange,
  onClearAll,
}) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);

  // ✅ Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getAllBrand();
        // adapt depending on API shape: if it's [{id, name}], map to names
        setBrands(data.map((b: any) => b.name));
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoadingBrands(false);
      }
    };
    fetchBrands();
  }, []);

  const sections = {
    typePeau: [
      'Normal Skin',
      'Dry Skin',
      'Oily Skin',
      'Combination Skin',
      'Sensitive Skin',
    ],
    concern: [
      'Acne',
      'Aging',
      'Dull Skin',
      'Uneven Skin Tone',
      'Dehydrated Skin',
      'Eye Bags',
      'Pregnancy',
    ],
    ingredients: [
      'Niacinamide',
      'Retinol',
      'Glycolic Acid',
      'Citric Acid',
      'Hyaluronic Acid',
      'Ceramide',
    ],
  };

  return (
    <aside className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 self-start">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Filtrage</h2>
        <button
          onClick={onClearAll}
          className="text-sm text-gray-500 hover:text-pink-600 transition-colors"
        >
          Effacer tous
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {/* --- Genre --- */}
        <FilterSection title="Genre">
          <div className="space-y-3">
            <CheckboxItem
              label="Male"
              id="male"
              checked={filters.genre.includes('Male')}
              onChange={() => onFilterChange('genre', 'Male')}
            />
            <CheckboxItem
              label="Female"
              id="female"
              checked={filters.genre.includes('Female')}
              onChange={() => onFilterChange('genre', 'Female')}
            />
          </div>
        </FilterSection>

        {/* --- Brands from API --- */}
        <FilterSection title="Brands">
          <div className="space-y-3">
            {loadingBrands ? (
              <p className="text-sm text-gray-500">Chargement...</p>
            ) : (
              brands.map((item) => (
                <CheckboxItem
                  key={item}
                  id={item}
                  label={item}
                  checked={filters.brands.includes(item)}
                  onChange={() => onFilterChange('brands', item)}
                />
              ))
            )}
          </div>
        </FilterSection>

       

        {/* --- Type de peau --- */}
        <FilterSection title="Type de peau">
          <div className="space-y-3">
            {sections.typePeau.map((item) => (
              <CheckboxItem
                key={item}
                id={item}
                label={item}
                checked={filters.typePeau.includes(item)}
                onChange={() => onFilterChange('typePeau', item)}
              />
            ))}
          </div>
        </FilterSection>

        {/* --- Concern --- */}
        <FilterSection title="Concern">
          <div className="space-y-3">
            {sections.concern.map((item) => (
              <CheckboxItem
                key={item}
                id={item}
                label={item}
                checked={filters.concern.includes(item)}
                onChange={() => onFilterChange('concern', item)}
              />
            ))}
          </div>
        </FilterSection>

        {/* --- Ingredients --- */}
        <FilterSection title="Ingredients">
          <div className="space-y-3">
            {sections.ingredients.map((item) => (
              <CheckboxItem
                key={item}
                id={item}
                label={item}
                checked={filters.ingredients.includes(item)}
                onChange={() => onFilterChange('ingredients', item)}
              />
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
};

export default FilterSidebar;
