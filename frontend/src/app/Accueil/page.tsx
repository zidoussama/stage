'use client';
import {Product, Banner, Category, HomePageData} from '@/app/Accueil/types/accueil';
// Part 1: Import the custom hook and all necessary components
import { useAccueilPage } from '@/app/Accueil/hooks/useAccueilPage';
import { HeroGrid } from '@/app/Accueil/components/HeroGrid';
import CategorySlider from '@/app/Accueil/components/CategorySlider';
import VentFlash from '@/app/Accueil/components/VentFlash';
import FeaturedProducts from '@/app/Accueil/components/FeaturedProducts';
import  {TrendingBanner}  from '@/app/Accueil/components/TrendingBanner';
import NewInStore from '@/app/Accueil/components/newinstore';
import  {PromoBanners}  from '@/app/Accueil/components/PromoBanners';
import BestSellerProducts from '@/app/Accueil/components/BestSellerProducts';

// --- MAIN PAGE COMPONENT ---
export default function Accueil() {
  // Part 2: Call the hook to get all state and logic for the page
  const { data, isLoading } = useAccueilPage();

  // Part 3: Handle the loading state while data is being "fetched"
  if (isLoading || !data) {
    // In a real application, you would replace this with a more sophisticated skeleton loader
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-xl font-semibold text-gray-800">Loading...</div>
      </div>
    );
  }

  // Part 4: If data is loaded, render the full page with all its components
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-8 bg-white space-y-12">
        {/* Each component receives the specific data it needs as props */}
        
        <HeroGrid />
        
        <CategorySlider  />
        
        <VentFlash />
        
        <FeaturedProducts />
        
        <TrendingBanner />
        
        <NewInStore />
        
        <PromoBanners/>
        
        <BestSellerProducts  />
        
      </div>
    </section>
  );
}