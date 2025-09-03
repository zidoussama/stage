'use client';

import React, { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import Description from './Description';
import Composition from './Composition';
import AutresInformations from './AutresInformations';
import Avis from '@/components/Avis';

interface ProductData {
  description: string;
  composition: string;
  autresInfo: string;
}

interface ProductInfoTabsProps {
  productData: ProductData;
}

const ProductInfoTabs: React.FC<ProductInfoTabsProps> = ({ productData }) => {
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
        return <Description description={productData.description} />;
      case 'composition':
        return <Composition composition={productData.composition} />;
      case 'autres':
        return <AutresInformations autresInfo={productData.autresInfo} />;
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

export default ProductInfoTabs;
