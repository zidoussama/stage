import Image, { StaticImageData } from 'next/image'; // <-- ADD StaticImageData to the import
import { FaHeart, FaShoppingBag } from 'react-icons/fa';

type Product = {
  name: string;
  image: StaticImageData; // <-- CHANGE THIS LINE from 'string'
  price: number;
  originalPrice?: number;
  discount?: string;
  badge?: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    // 'group' enables group-hover effects on child elements.
    <div className="group relative flex flex-col">
      
      {/* Top section: The image frame with hover elements inside */}
      <div className="relative bg-gray-50 rounded-xl p-4 aspect-square overflow-hidden">
        {/* Badge (e.g., 'SOLDE', 'NEW') */}
        {product.badge && (
          <div className={`absolute top-4 left-4 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 ${
            product.badge === 'NEW' ? 'bg-pink-500' : 'bg-red-500'
          }`}>
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart Icon (Always visible) */}
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm text-gray-500 hover:text-red-500 transition-colors z-10">
          <FaHeart size={14} />
        </button>

        {/* Product Image */}
        <div className="relative w-full h-full">
            <Image
              src={product.image} // This now correctly accepts the StaticImageData object
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
        </div>

        {/* Hover buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center items-center gap-2 opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button className="flex-grow bg-gray-800 text-white text-xs font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-black transition-colors">
            <FaShoppingBag />
            ADD TO BAG
          </button>
          <button className="bg-white border border-gray-300 p-3 rounded-lg text-gray-600 hover:border-black hover:text-black transition-colors">
            <FaHeart size={16} />
          </button>
        </div>
      </div>

      {/* Bottom section: Product text (always visible) */}
      <div className="text-center pt-4">
        <h3 className="text-sm text-gray-800 font-medium mb-1 truncate w-full">{product.name}</h3>
        <div className="flex items-center justify-center gap-2">
            <p className="text-base text-gray-900 font-semibold">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
            )}
            {product.discount && (
                <p className="text-xs text-white font-bold bg-pink-500 px-1.5 py-0.5 rounded-md">{product.discount}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;