import Image from 'next/image';
import { FiHeart, FiMaximize, FiEye, FiShoppingCart } from 'react-icons/fi';
import { Product } from '@/app/filter/types/shop';
import { StarRating } from './StarRating';

export const ProductListCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="group bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row gap-6 relative">
        {/* ... JSX for the list card ... */}
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <StarRating rating={product.rating} />
        {/* ... */}
    </div>
);
// (Your full JSX for ProductListCard goes here)