'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useCategories from '../hooks/useCategories';

export default function CategorySlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { categories, loading, error } = useCategories();

  const scrollNext = () => {
    sliderRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    sliderRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  if (loading) return <p className="text-center py-8">Chargement...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;

  const categoryList = categories;

  return (
    <section className="py-8 bg-white">
      <h2 className="text-center font-semibold text-lg text-gray-800 mb-6">
        Catégories
      </h2>

      <div className="relative max-w-7xl mx-auto px-4 flex items-center">
        {/* Left Arrow (hidden on small screens) */}
        <button
          onClick={scrollPrev}
          className="hidden md:flex absolute left-0 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <FaChevronLeft className="text-gray-500" />
        </button>

        {/* Scrollable category slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar snap-x w-full px-4 sm:px-10"
        >
          {categoryList.map((cat, index) => (
            <div
              key={cat.id || cat.id || index}
              onClick={() => setActiveIndex(index)}
              className={`snap-start flex flex-col items-center min-w-[100px] transition-all duration-200 cursor-pointer ${
                index === activeIndex ? 'text-pink-600 font-bold' : 'text-gray-700'
              }`}
            >
              <div
                className={`
                  rounded-full overflow-hidden border-4
                  w-20 h-20
                  sm:w-24 sm:h-24
                  md:w-28 md:h-28
                  ${index === activeIndex ? 'border-pink-500' : 'border-transparent'}
                `}
              >
                <Image
                  src={cat.imageUrl || '/placeholder.jpg'} // ✅ fallback image
                  alt={cat.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xs sm:text-sm md:text-base mt-2 text-center">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow (hidden on small screens) */}
        <button
          onClick={scrollNext}
          className="hidden md:flex absolute right-0 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <FaChevronRight className="text-gray-500" />
        </button>
      </div>
    </section>
  );
}
