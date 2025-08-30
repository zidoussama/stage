'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
  FiHeart, FiMaximize, FiEye, FiPercent, FiCopy, FiMinus, FiPlus,
  FiShoppingCart, FiChevronLeft, FiChevronRight, FiAlertCircle,
} from 'react-icons/fi';
import { FaStar, FaFacebookF, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { RiMessengerLine } from 'react-icons/ri';

import RelatedProducts from '@/components/RelatedProducts';
import Avis from '@/components/Avis';

import p1 from '@/assets/p1.png';

// --- Star Rating ---
interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={
            i < fullStars
              ? 'text-pink-500'
              : hasHalfStar && i === fullStars
              ? 'text-pink-300'
              : 'text-gray-300'
          }
        />
      ))}
    </div>
  );
};

// --- Tabs Section ---
const ProductInfoTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('avis');
  const totalReviews = 143;

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'composition', label: 'Composition' },
    { id: 'autres', label: 'Autres informations' },
    { id: 'avis', label: `Avis (${totalReviews})` },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <p>
            Rejuvenate and refresh your skin with our Rosewater Hydrating Mist...
          </p>
        );
      case 'composition':
        return (
          <div>
            <h4 className="font-semibold mb-2">Composition Gabriella Salvete Eye Mask</h4>
            <p className="mb-3 font-medium">Liste complète des ingrédients</p>
            <p className="text-sm mb-4">
              AQUA, GLYCERIN, XANTHAN GUM, etc...
            </p>
            <p className="text-xs italic text-gray-500">
              Le fabricant est responsable des ingrédients...
            </p>
          </div>
        );
      case 'autres':
        return (
          <div>
            <h4 className="font-semibold mb-4">Autres informations</h4>
            <ul className="list-disc list-inside text-sm mb-4">
              <li>Usage externe uniquement.</li>
              <li>Effectuez un test de tolérance.</li>
              <li>En cas d’irritation, cessez l’utilisation.</li>
            </ul>
            <p className="text-sm">
              Gabriella Salvete, Via G.B.PERGOLESI 8, MILANO, ITALY
            </p>
          </div>
        );
      case 'avis':
        return <Avis />;
      default:
        return null;
    }
  };

  return (
    <section className="py-10 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="border-b flex justify-between items-center">
          <nav className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'text-pink-600 border-pink-600'
                    : 'text-gray-500 border-transparent hover:text-pink-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <button className="hidden sm:flex items-center gap-2 text-xs text-gray-500 hover:text-gray-800">
            <FiAlertCircle size={14} />
            <span>Signaler le produit</span>
          </button>
        </div>
        <div className="pt-8 text-gray-600">{renderContent()}</div>
      </div>
    </section>
  );
};

// --- Main Product Page ---
const ProductPage: React.FC = () => {
  const thumbnails: StaticImageData[] = [p1, p1, p1, p1, p1];

  return (
    <div className="bg-white font-sans">
      <main className="container mx-auto px-4 pt-8 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="border rounded-lg overflow-hidden">
              <Image
                src={p1}
                alt="Rosewater Hydrating Mist"
                width={600}
                height={600}
                className="w-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="relative mt-4">
              <div className="flex items-center justify-center gap-2">
                <button className="text-gray-400 hover:text-gray-800">
                  <FiChevronLeft size={20} />
                </button>
                <div className="flex-1 grid grid-cols-5 gap-2">
                  {thumbnails.map((thumb, index) => (
                    <div
                      key={index}
                      className={`rounded-md overflow-hidden cursor-pointer ${
                        index === 0
                          ? 'border-2 border-pink-500'
                          : 'border border-gray-200'
                      }`}
                    >
                      <Image
                        src={thumb}
                        alt={`Thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
                <button className="text-gray-400 hover:text-gray-800">
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-700">
              <span>Partager</span>
              <div className="flex gap-2">
                <a href="#" aria-label="Twitter" className="social-btn"><FaTwitter /></a>
                <a href="#" aria-label="Facebook" className="social-btn"><FaFacebookF /></a>
                <a href="#" aria-label="WhatsApp" className="social-btn"><FaWhatsapp /></a>
                <a href="#" aria-label="Messenger" className="social-btn"><RiMessengerLine /></a>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Hamdi Parfumerie</p>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">
                  Rosewater Hydrating Mist
                </h1>
              </div>
              <div className="flex gap-2">
                <button className="icon-btn"><FiHeart /></button>
                <button className="icon-btn"><FiMaximize /></button>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <StarRating rating={4.5} />
                <span className="font-semibold ml-1">(4.5/5)</span>
              </div>
              <span className="divider" />
              <span>143 Avis</span>
              <span className="divider" />
              <span>2.3K Ventes</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">19.99 DT</span>
              <span className="tag">25%</span>
              <span className="line-through text-gray-400">26.50 DT</span>
              <button className="ml-auto icon-btn bg-pink-600 text-white">
                <FiEye />
              </button>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-semibold text-gray-800">Brève Description</h3>
              <p className="mt-2 text-sm text-gray-600">
                Hydrate et rafraîchit avec notre brume d'eau de rose...
              </p>
            </div>

            {/* Stock and Size */}
            <div className="mt-6 flex justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Taille</span>
                <button className="px-4 py-1.5 bg-white border rounded text-sm">90 ml</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Stock</span>
                <span className="text-sm text-gray-600">152</span>
              </div>
            </div>

            {/* Promo */}
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <FiPercent className="text-pink-600" />
                <h3 className="text-sm font-semibold">Voucher Promo</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Il y a 3 codes promo pour vous
              </p>
              <div className="mt-3 grid md:grid-cols-2 gap-3">
                {[{ code: 'GLOW15', discount: '5%' }, { code: 'BEAUTY20', discount: '20%' }].map((promo, i) => (
                  <div key={i} className="promo-card">
                    <div>
                      <p className="font-bold text-pink-600">{promo.discount} off</p>
                      <p className="text-xs mt-1">sur tout achat</p>
                      <p className="code">{promo.code}</p>
                    </div>
                    <button aria-label="Copier code" className="text-gray-400 hover:text-pink-600">
                      <FiCopy size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold mb-2">Quantité</h3>
              <div className="flex items-center border rounded-lg w-fit">
                <button className="p-3 text-gray-500 hover:bg-gray-100"><FiMinus /></button>
                <span className="px-6 font-semibold">2</span>
                <button className="p-3 text-gray-500 hover:bg-gray-100"><FiPlus /></button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <button className="btn-primary flex items-center justify-center gap-2">
                <FiShoppingCart size={18} />
                Ajouter au panier
              </button>
              <button className="btn-secondary">Acheter maintenant</button>
            </div>
          </div>
        </div>
      </main>

      <ProductInfoTabs />
      <RelatedProducts />
    </div>
  );
};

export default ProductPage;
