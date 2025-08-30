'use client';

import Image from 'next/image';

// Import the specific static images for this component
import grid1 from '@/assets/grid1.png'; 
import grid2 from '@/assets/grid2.png'; 
import grid3 from '@/assets/grid3.png'; 
import grid4 from '@/assets/grid4.png';

export const HeroGrid = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-4 w-full">
        
        {/* Large Image Section */}
        <div className="group relative bg-gray-200 aspect-[2.32/1] w-full md:max-w-[1758px] mx-auto overflow-hidden rounded-lg">
          <Image
            src={grid1}
            alt="Large promotional banner"
            
            className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full object-fill"
            priority // This helps Next.js load the most important image faster

          />

        </div>

        {/* Smaller Image Sections in a 3-column grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="group relative bg-gray-200 aspect-[1.59/1] w-full md:max-w-[570px] mx-auto overflow-hidden rounded-lg">
            <Image
              src={grid2}
              alt="Small promotional banner 1"
              
              className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full object-fill"
              
            />
          </div>
          <div className="group relative bg-gray-200 aspect-[1.59/1] w-full md:max-w-[570px] mx-auto overflow-hidden rounded-lg">
            <Image
              src={grid3}
              alt="Small promotional banner 2"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="group relative bg-gray-200 aspect-[1.59/1] w-full md:max-w-[570px] mx-auto overflow-hidden rounded-lg">
            <Image
              src={grid4}
              alt="Small promotional banner 3"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};