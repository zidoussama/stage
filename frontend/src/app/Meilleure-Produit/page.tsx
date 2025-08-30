import Image, { StaticImageData } from 'next/image';
import {
  Star,
  Heart,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import p1 from '@/assets/p1.png';

// --- Types ---
interface Product {
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  image: StaticImageData;
}

// --- Reusable Components ---

// 1. Product Card
interface ProductCardProps {
  product: Product;
  isSpecial?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isSpecial = false }) => {
  return (
    <div
      className={`flex items-start gap-4 p-4 h-full ${
        isSpecial ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          width={140}
          height={140}
          className="rounded-md object-cover w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]"
        />
      </div>

      <div className="flex-grow flex flex-col h-full relative">
        {/* Main Content */}
        <div>
          <h3 className="font-semibold text-gray-800 text-base pr-8">
            {product.name}
          </h3>
          <div className="flex items-center my-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
            ))}
          </div>
          <div className="flex items-center gap-3 my-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
            {!isSpecial && (
              <span className="bg-pink-500 text-white text-xs font-bold w-10 h-10 flex items-center justify-center rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-2 mb-4 leading-relaxed hidden sm:block">
            {product.description}
          </p>
        </div>

        {/* Action Buttons & Badges */}
        <div className="mt-auto flex justify-between items-center">
          <button className="bg-gray-800 text-white text-xs font-bold px-5 py-2.5 rounded-md hover:bg-gray-700 tracking-wider">
            ADD TO BAG
          </button>
          {isSpecial && (
            <div className="bg-pink-500 text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full">
              %
            </div>
          )}
        </div>

        {/* Special Icons (only for the first card) */}
        {isSpecial && (
          <div className="absolute top-0 right-0 flex flex-col gap-3">
            <button className="text-gray-500 hover:text-red-500">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Pagination
const Pagination: React.FC = () => {
  const pages = [1, 2, 3, 4, 5];
  const currentPage = 1;

  return (
    <nav className="flex justify-center items-center gap-2 mt-12 mb-8">
      <button className="h-9 w-9 flex items-center justify-center rounded-full text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
        <ChevronLeft className="h-5 w-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`h-9 w-9 flex items-center justify-center rounded-full font-medium text-sm transition-colors ${
            currentPage === page
              ? 'bg-gray-800 text-white'
              : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      <button className="h-9 w-9 flex items-center justify-center rounded-full text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
};

// --- Main Page ---

const MeilleureProduitPage: React.FC = () => {
  const productData: Product = {
    name: 'Satin Trousers With Dastic',
    price: 68.0,
    originalPrice: 88.0,
    discount: 25,
    description:
      'Rejuvenate and refresh your skin with our Biowave™ Moisturizing Mist. Infused with the essence of roses, it hydrates, soothes, and revitalizes, leaving your skin with a healthy sun-kissed glow.',
    image: p1,
  };

  const products = Array(10).fill(productData);

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-24 py-10">
        {/* Top section with title and sorting */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Meilleure produit</h2>
          <div className="text-right">
            <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Prix plus élevé
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
            </button>
            <p className="text-xs text-gray-500 mt-1">10 187 résultats trouvés</p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="rounded-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 -m-px">
            {products.map((product, index) => (
              <div key={index} className="p-2">
                <ProductCard product={product} isSpecial={index === 0} />
              </div>
            ))}
          </div>
        </div>

        <Pagination />
      </main>
    </div>
  );
};

export default MeilleureProduitPage;
