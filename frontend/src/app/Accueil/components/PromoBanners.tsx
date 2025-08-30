// src/app/Accueil/components/PromoBanners.tsx
'use client';

import Image from 'next/image';
// Make sure these paths to your images are correct
import card1 from '@/assets/card1.png';
import card2 from '@/assets/card2.png';
import card3 from '@/assets/card3.png';

export const PromoBanners = () => {
  return (
    <section className="px-4 sm:px-6 py-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT COLUMN: Large Banner */}
          <div className="lg:col-span-3 relative h-80 lg:h-auto lg:aspect-[4/3] rounded-2xl overflow-hidden group">
            <Image
              src={card1}
              alt="Save 20% limited time offer"
              fill
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>

          {/* RIGHT COLUMN: Two smaller banners stacked */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden group">
              <Image
                src={card2}
                alt="Free shipping offer"
                fill
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden group">
              <Image
                src={card3}
                alt="Exclusive discounts"
                fill
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};