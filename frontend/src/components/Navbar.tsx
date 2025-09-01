'use client';

import { useState } from 'react';
import {
  FaFireAlt,
  FaBolt,
  FaPlus,
  FaSearch,
  FaShoppingCart,
  FaRegCommentDots,
  FaBell,
  FaUser,
} from 'react-icons/fa';
import Image from 'next/image';
import { HiMenuAlt3 } from 'react-icons/hi';
import { BiChevronDown } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import logo from '@/assets/logo/logopar.png';

type SearchBarProps = {
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ className }) => (
  <div className={`flex items-center border rounded-full overflow-hidden shadow-sm bg-gray-100 ${className}`}>
    <div className="flex items-center px-3 border-r gap-1 text-gray-600 text-sm cursor-pointer">
      <span>Tout les catégories</span>
      <BiChevronDown size={18} />
    </div>
    <input
      type="text"
      placeholder="Trouvez votre rêve ici"
      className="flex-1 px-3 py-2 bg-transparent outline-none text-sm"
    />
    <button className="bg-pink-500 text-white p-2 rounded-r" aria-label="Search">
      <FaSearch />
    </button>
  </div>
);

type MenuButtonProps = {
  icon?: React.ReactNode;
  text: string;
  bgColor: string;
  onClick: () => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({ icon, text, bgColor, onClick }) => (
  <button
    className={`${bgColor} px-3 py-2 rounded-full text-sm flex items-center gap-2 justify-center w-32 h-10 transition-transform whitespace-nowrap ${
      bgColor.includes('bg-white') ? 'text-black hover:bg-gray-100' : 'text-white'
    } ${
      bgColor.includes('bg-orange-500') ? 'hover:bg-orange-600' : ''
    } ${
      bgColor.includes('bg-pink-500') ? 'hover:bg-pink-600' : ''
    } hover:scale-105`}
    aria-label={text}
    onClick={onClick}
    type="button"
  >
    {icon && icon} {text}
  </button>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleButtonClick = (buttonText: string) => {
    switch (buttonText) {
      case 'Soldes':
        router.push('/solde');
        break;
      case 'Vente Flash':
        router.push('/ventes-flash');
        break;
      case 'Nouveau produit':
        router.push('/NouveauProduit');
        break;
      default:
        console.log(`Clicked ${buttonText}`);
    }
    setMobileMenuOpen(false); // Optional: close mobile menu on click
  };

  return (
    <header className="w-full">
      {/* Top black bar */}
      <div className="bg-gray-900 text-white px-4 py-5 flex justify-center items-center text-sm font-semibold relative">
        <span className="text-center flex items-center gap-2">
          LIVRAISON GRATUITE à partir de 150 DT d’achat
          <span className="bg-pink-500 text-white text-xs w-8 h-8 flex items-center justify-center rounded-full font-bold ml-1">
            50%
          </span>
        </span>
      </div>

      {/* Logo and icons */}
      <div className="bg-white shadow px-4 md:px-6 py-3">
        <div className="flex justify-between items-center flex-wrap gap-4">
          {/* Logo */}
          <div className="cursor-pointer flex items-center" onClick={() => router.push('/Accueil')}>
            <Image src={logo} alt="logo" width={317} height={29} />
          </div>

          {/* Desktop search bar */}
          <SearchBar className="hidden md:flex max-w-xl flex-1" />

          {/* Icons - hidden when mobile menu is open */}
          <div
            className={`text-gray-600 text-lg transition-all duration-200 ${
              mobileMenuOpen ? 'hidden' : 'flex'
            } items-center gap-4`}
          >
            <FaShoppingCart className="cursor-pointer" aria-label="Shopping Cart" onClick={() => router.push('/bag')} />
            <FaRegCommentDots className="cursor-pointer" aria-label="Comments" />
            <FaBell className="cursor-pointer" aria-label="Notifications" />
            <FaUser className="w-8 h-8 bg-gray-200 rounded-full cursor-pointer border" aria-label="User Profile" />
          </div>
        </div>
      </div>

      {/* Menu + Buttons */}
      <div className="bg-white px-4 md:px-6 py-3 border-t">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            {/* Mobile menu toggle button */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <HiMenuAlt3 size={24} />
            </button>

            {/* Desktop menu label */}
            <div className="hidden md:flex items-center gap-2 text-gray-600">
              <HiMenuAlt3 size={24} />
              <span>Menu</span>
            </div>

            {/* Menu buttons (desktop only) */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <MenuButton icon={<FaFireAlt />} text="Soldes" bgColor="bg-red-500" onClick={() => handleButtonClick('Soldes')} />
              <MenuButton icon={<FaBolt />} text="Vente Flash" bgColor="bg-pink-500" onClick={() => handleButtonClick('Vente Flash')} />
              <MenuButton icon={<FaPlus />} text="Nouveau produit" bgColor="bg-pink-500" onClick={() => handleButtonClick('Nouveau produit')} />
              <MenuButton icon={null} text="Bons plans" bgColor="bg-white" onClick={() => handleButtonClick('Bons plans')} />
              <MenuButton icon={null} text="Nous contacter" bgColor="bg-white" onClick={() => handleButtonClick('Nous contacter')} />
              <MenuButton icon={null} text="Aide !" bgColor="bg-white" onClick={() => handleButtonClick('Aide !')} />
            </div>
          </div>

          {/* Location - only desktop */}
          <div className="hidden sm:flex text-sm text-gray-500 items-center gap-1 cursor-pointer">
            <MdLocationOn size={16} />
            Tunis, Nabeul
            <BiChevronDown size={16} />
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`md:hidden mt-4 space-y-3 transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col gap-2">
            <MenuButton icon={<FaFireAlt />} text="Soldes" bgColor="bg-orange-500" onClick={() => handleButtonClick('Soldes')} />
            <MenuButton icon={<FaBolt />} text="Vente Flash" bgColor="bg-pink-500" onClick={() => handleButtonClick('Vente Flash')} />
            <MenuButton icon={<FaPlus />} text="Nouveau produit" bgColor="bg-pink-500" onClick={() => handleButtonClick('Nouveau produit')} />
            <MenuButton icon={null} text="Bons plans" bgColor="bg-white" onClick={() => handleButtonClick('Bons plans')} />
            <MenuButton icon={null} text="Nous contacter" bgColor="bg-white" onClick={() => handleButtonClick('Nous contacter')} />
            <MenuButton icon={null} text="Aide !" bgColor="bg-white" onClick={() => handleButtonClick('Aide !')} />
          </div>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
