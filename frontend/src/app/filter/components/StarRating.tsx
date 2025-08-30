import { FaStar } from 'react-icons/fa';

export const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < Math.round(rating) ? "text-pink-500" : "text-gray-300"} />
    ))}
  </div>
);