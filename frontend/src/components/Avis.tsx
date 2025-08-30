'use client';

import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FiThumbsUp } from 'react-icons/fi';

// Define types for review data
interface ReviewSummary {
  average: number;
  total: number;
  breakdown: { stars: number; count: number }[];
}

interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  likes: number;
}

// --- DUMMY DATA FOR REVIEWS ---
const reviewSummary: ReviewSummary = {
  average: 4.5,
  total: 143,
  breakdown: [
    { stars: 5, count: 50 },
    { stars: 4, count: 83 },
    { stars: 3, count: 10 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
};

const individualReviews: Review[] = [
  {
    name: 'Daniella',
    rating: 4,
    date: 'March 23, 2023',
    text: 'I am obsessed with these Silk Lash Extensions! They give my lashes the perfect amount of length and volume without looking over-the-top. They feel so lightweight and comfortable, I forget I’m wearing them. Plus, they stay put all day and night. Highly recommend!',
    likes: 12,
  },
  {
    name: 'Lee Ann',
    rating: 4,
    date: 'March 23, 2023',
    text: 'I can’t get enough of these Silk Lash Extensions! They make my eyes pop and give me that extra boost of confidence. They’re incredibly comfortable to wear, and the quality is top-notch. The lightweight feel and natural look are just perfect. I’ll never go back to regular mascara!',
    likes: 12,
  },
  {
    name: 'Brandon',
    rating: 4,
    date: 'March 23, 2023',
    text: 'I’ve tried many different false lashes, but Luxe Lashes’ Silk Lash Extensions are by far the best. The quality is outstanding, and they give my lashes a natural-looking flutter that I love. The band is so flexible and easy to apply. These are a game-changer for achieving glamorous eyes!',
    likes: 12,
  },
];

// --- Star Rating Helper ---
interface StarRatingProps {
  rating: number;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5 }) => {
  const stars: React.ReactElement[] = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(<FaStar key={i} className={i <= rating ? 'text-pink-500' : 'text-gray-300'} />);
  }
  return <div className="flex items-center">{stars}</div>;
};

// --- Single Review Card Component ---
interface SingleReviewProps {
  review: Review;
}

const SingleReview: React.FC<SingleReviewProps> = ({ review }) => (
  <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-100 last:border-b-0">
    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full"></div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h4 className="font-semibold text-gray-800">{review.name}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <StarRating rating={review.rating} />
            <span>({review.rating}/5)</span>
          </div>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">{review.date}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed my-3">{review.text}</p>
      <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-pink-600 transition-colors">
        <FiThumbsUp />
        <span>{review.likes}</span>
      </button>
    </div>
  </div>
);

// --- Rating Breakdown Bar Component ---
interface RatingBarProps {
  stars: number;
  count: number;
  total: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ stars, count, total }) => {
  const percentage: number = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-gray-600">{stars}</span>
      <FaStar className="text-pink-500" />
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="text-gray-500 w-8 text-right">{count}</span>
    </div>
  );
};

// --- Main Avis Component ---
const Avis: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      {/* Left Column: Summary */}
      <div className="lg:col-span-4">
        <h3 className="text-xl font-bold mb-2">Avis</h3>
        <div className="flex items-center gap-3">
          <p className="text-4xl font-bold text-gray-800">{reviewSummary.average.toFixed(1)}/5</p>
          <div className="flex flex-col">
            <StarRating rating={reviewSummary.average} />
            <span className="text-xs text-gray-500">{reviewSummary.total} Reviews</span>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          {reviewSummary.breakdown.map((item) => (
            <RatingBar key={item.stars} stars={item.stars} count={item.count} total={reviewSummary.total} />
          ))}
        </div>
      </div>

      {/* Right Column: Individual Reviews */}
      <div className="lg:col-span-8">
        {individualReviews.map((review, index) => (
          <SingleReview key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Avis;