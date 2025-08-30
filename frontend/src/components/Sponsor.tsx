import React from 'react';
import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';

import insta1 from '@/assets/logo/1.png'; 
import insta2 from '@/assets/logo/2.png';
import insta3 from '@/assets/logo/3.png';
import insta4 from '@/assets/logo/4.png';
import insta5 from '@/assets/logo/5.png';

// Replace these with your actual logo files
import logo1 from '@/assets/logo/shangxi.png';
import logo2 from '@/assets/logo/logocher.png';
import logo3 from '@/assets/logo/vanfaba.png';
import logo4 from '@/assets/logo/carolin.png';
import logo5 from '@/assets/logo/panadoxn.png';
import logo6 from '@/assets/logo/penn.png';


// --- Step 2: The component data. No need to change this part. ---
const instagramPosts = [
  { id: 1, imageSrc: insta1, link: '#', hasIcon: false },
  { id: 2, imageSrc: insta2, link: '#', hasIcon: false },
  { id: 3, imageSrc: insta3, link: '#', hasIcon: true }, // The middle one with the icon
  { id: 4, imageSrc: insta4, link: '#', hasIcon: false },
  { id: 5, imageSrc: insta5, link: '#', hasIcon: false },
];

const sponsors = [
  { id: 1, name: 'Shangxi', logoSrc: logo1 },
  { id: 2, name: 'Cheryl', logoSrc: logo2 },
  { id: 3, name: 'Vanfaba', logoSrc: logo3 },
  { id: 4, name: 'Carolin', logoSrc: logo4 },
  { id: 5, name: 'Panadoxn', logoSrc: logo5 },
  { id: 6, name: 'Penny W. Textiles', logoSrc: logo6 },
];


export default function Sponsor() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hamdi Parfumerie On Instagram
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            #Anvougetheme
          </p>
        </div>

        {/* Instagram Posts Grid */}
        <div className="mt-12 flex justify-center items-center gap-4 md:gap-6 flex-wrap">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group block w-36 h-36 md:w-44 md:h-44"
            >
              <Image
                src={post.imageSrc}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              {post.hasIcon && (
                 <div className="absolute inset-0 flex items-center justify-center  bg-opacity-10 rounded-2xl">
                    <div className="bg-white p-3 rounded-full shadow-lg">
                      <FaInstagram className="text-gray-800 text-2xl" />
                    </div>
                 </div>
              )}
               
            </a>
          ))}
        </div>

        {/* Sponsor Logos */}
        <div className="mt-20">
            <div className="flex justify-center items-center gap-10 md:gap-14 flex-wrap">
                {sponsors.map((sponsor) => (
                    <div key={sponsor.id} className="flex justify-center">
                        <Image
                            src={sponsor.logoSrc}
                            alt={`${sponsor.name} logo`}
                            width={140}
                            height={40}
                            className="object-contain h-8 md:h-10 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}