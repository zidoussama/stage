import Image from 'next/image';
import { FiHeart, FiMaximize, FiEye } from 'react-icons/fi';
import { Product } from '@/app/filter/types/shop';

export const ProductGridCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="group relative bg-gray-100 rounded-xl p-4 flex flex-col">
        {/* ... JSX for the grid card ... */}
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        {/* ... */}
    </div>
);
// (Your full JSX for ProductGridCard goes here)