'use client';

import { useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';

// --- Reusable Sub-components ---

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
      </button>      {isOpen && <div className="mt-4">{children}</div>}
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
    <span className={`text-gray-600 group-hover:text-pink-600 transition-colors ${checked ? 'text-pink-600 font-medium' : ''}`}>
      {label}
    </span>
  </label>
);

// --- THIS IS THE CORRECTED PriceSlider COMPONENT ---
interface PriceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({ value, onChange }) => {
  const MIN = 0;
  const MAX = 500;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const rangeWidth = (value / MAX) * 100;

  return (
    <div>
      <div className="relative h-5 pt-1">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200 rounded-full"></div>
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 bg-pink-600 rounded-full"
          style={{ width: `${rangeWidth}%` }}
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={value}
          onChange={handleChange}
          className="custom-range-slider absolute top-1/2 -translate-y-1/2 w-full"
        />
      </div>
      <p className="text-gray-500 text-sm pt-4">Prix : 0 DT - {value} DT</p>
    </div>
  );
};

interface RatingRowProps {
  stars: number;
  id: string;
  checked: boolean;
  onChange: () => void;
}

const RatingRow: React.FC<RatingRowProps> = ({ stars, id, checked, onChange }) => (
  <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer group">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="custom-checkbox"
    />
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < stars
              ? 'text-pink-500 fill-current'
              : 'text-grey-300 fill-current'
          }`}
        />
      ))}
    </div>
    {stars < 5 && <span className={`text-grey-600 group-hover:text-pink-600 transition-colors ${checked ? 'text-pink-600 font-medium' : ''}`}>& Up</span>}
  </label>
);

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
  const sections = {
    brands: ['Glowify Beauty', 'Luxe Lashes', 'PureGlow', 'Radiant Skincare', 'HairLux'],
    typePeau: ['Normal Skin', 'Dry Skin', 'Oily Skin', 'Combination Skin', 'Sensitive Skin'],
    concern: ['Acne', 'Aging', 'Dull Skin', 'Uneven Skin Tone', 'Dehydrated Skin', 'Eye Bags', 'Pregnancy'],
    ingredients: ['Niacinamide', 'Retinol', 'Glycolic Acid', 'Citric Acid', 'Hyaluronic Acid', 'Ceramide'],
  };

  return (
    <aside className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 self-start">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Filtrage</h2>
        <button onClick={onClearAll} className="text-sm text-gray-500 hover:text-pink-600 transition-colors">
          Effacer tous
        </button>
      </div>

      <div className="divide-y divide-gray-200">
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

        <FilterSection title="Brands">
          <div className="space-y-3">
            {sections.brands.map((item) => (
              <CheckboxItem
                key={item}
                id={item}
                label={item}
                checked={filters.brands.includes(item)}
                onChange={() => onFilterChange('brands', item)}
              />
            ))}
          </div>
          <button className="text-sm text-gray-600 mt-4 hover:text-pink-600">Plus categories</button>
        </FilterSection>

        <FilterSection title="Prix">
          <PriceSlider value={filters.price} onChange={onPriceChange} />
        </FilterSection>

        <FilterSection title="Rating">
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((starCount) => (
              <RatingRow
                key={starCount}
                stars={starCount}
                id={`rating-${starCount}`}
                checked={filters.rating.includes(starCount)}
                onChange={() => onFilterChange('rating', starCount)}
              />
            ))}
          </div>
        </FilterSection>

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