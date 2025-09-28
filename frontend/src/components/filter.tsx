// frontend/src/components/filter.tsx
'use client';

import { useState,useEffect } from 'react';
import useCategories from '@/app/Accueil/hooks/useCategories';
import { getAllBrand } from '@/hooks/useBrand'; // Adjust path if needed
import { ChevronDown } from 'lucide-react';

// Custom hook for brands
const useBrands = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getAllBrand();
        setBrands(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch brands');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};

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

// Reusable Checkbox List
interface CheckboxListProps {
  items: string[];
  category: string;
  filters: any;
  onFilterChange: (category: string, value: string | number) => void;
  expanded: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  category,
  filters,
  onFilterChange,
  expanded,
  setExpanded
}) => {
  const itemsToShow = expanded[category] ? items : items.slice(0, 5);
  const handleToggleExpand = () => {
    setExpanded(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="space-y-3">
      {itemsToShow.map(item => (
        <CheckboxItem
          key={item}
          id={`${category}-${item}`}
          label={item}
          checked={filters[category].includes(item)}
          onChange={() => onFilterChange(category, item)}
        />
      ))}
      {items.length > 5 && (
        <button
          onClick={handleToggleExpand}
          className={`text-sm font-medium transition-colors ${
            expanded[category]
              ? 'text-gray-500 hover:text-gray-700'
              : 'text-pink-600 hover:text-pink-700'
          }`}
        >
          {expanded[category] ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

// --- Filter Sidebar Props ---
interface FilterSidebarProps {
  filters: any;
  onFilterChange: (type: string, value: string | number) => void;
  onPriceChange: (price: number) => void;
  onClearAll: () => void;
  options: {
    genre: string[];
    brands: string[];
    typePeau: string[];
    concern: string[];
    ingredients: string[];
    size: string[];
  };
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onPriceChange,
  onClearAll,
  options
}) => {
  const { categories, loading: catLoading, error: catError } = useCategories();
  const { brands, loading: brandLoading, error: brandError } = useBrands();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    category: false,
    genre: false,
    brands: false,
    typePeau: false,
    concern: false,
    ingredients: false,
    size: false
  });

  if (catLoading || brandLoading) return <div className="text-gray-500">Loading filters...</div>;
  if (catError || brandError) return <div className="text-red-500">Error: {catError || brandError}</div>;

  const categoryNames = categories.map(cat => cat.name);
  const brandNames = brands.map(brand => brand.name);

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
        {/* Category Filter */}
        <FilterSection title="Catégorie">
          <CheckboxList
            items={categoryNames}
            category="category"
            filters={filters}
            onFilterChange={onFilterChange}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </FilterSection>

        {/* Genre Filter */}
        <FilterSection title="Genre">
          <CheckboxList
            items={options.genre}
            category="genre"
            filters={filters}
            onFilterChange={onFilterChange}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </FilterSection>

        {/* Brands Filter */}
        <FilterSection title="Brands">
          <CheckboxList
            items={brandNames}
            category="brands"
            filters={filters}
            onFilterChange={onFilterChange}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </FilterSection>

        {/* Skin Type Filter */}
        <FilterSection title="Type de peau">
          <CheckboxList
            items={options.typePeau}
            category="typePeau"
            filters={filters}
            onFilterChange={onFilterChange}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </FilterSection>

        {/* Concern Filter */}
        <FilterSection title="Concern">
          <CheckboxList
            items={options.concern}
            category="concern"
            filters={filters}
            onFilterChange={onFilterChange}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </FilterSection>

        {/* Ingredients Filter */}
        <FilterSection title="Ingredients">
          <CheckboxList
            items={options.ingredients}
            category="ingredients"
            filters={filters}
            onFilterChange={onFilterChange}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </FilterSection>

        {/* Size Filter */}
        <FilterSection title="Size">
          <CheckboxList
            items={options.size}
            category="size"
            filters={filters}
            onFilterChange={onFilterChange}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </FilterSection>
      </div>
    </aside>
  );
};

export default FilterSidebar;