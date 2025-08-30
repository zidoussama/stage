// src/app/Accueil/components/TrendingBanner.tsx
'use client';

import Image from 'next/image';
// Make sure this path to your image is correct
import trendingImg from '@/assets/image1.png';

export const TrendingBanner = () => {
  return (
    <section className="px-4 sm:px-6 py-10 bg-white">
      <div className="max-w-7xl mx-auto rounded-xl overflow-hidden">
        <Image
          src={trendingImg}
          alt="Trending Product Banner"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};