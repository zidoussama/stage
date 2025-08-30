"use client";

import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaPinterestP } from 'react-icons/fa';
import Image from 'next/image';
import logo from '@/assets/logo/logow.png'; // Adjust the path as necessary
import { useRouter } from 'next/navigation'; 

// Helper component for footer link columns to avoid repetition
// This component is fine as is, but we'll adjust its parent container for alignment.
type FooterLink = {
  name: string;
  url: string;
};

type FooterLinkColumnProps = {
  title: string;
  links: FooterLink[];
};

const FooterLinkColumn: React.FC<FooterLinkColumnProps> = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.name}>
          <a href={link.url} className="text-gray-400 hover:text-white transition-colors duration-300">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  // Data for the link columns (unchanged)
  const infoLinks = [
    { name: 'Contact us', url: '#' },
    { name: 'Career', url: '#' },
    { name: 'My Account', url: '#' },
    { name: 'Order & Returns', url: '#' },
    { name: 'FAQs', url: '#' },
  ];

  const shopLinks = [
    { name: 'Women', url: '#' },
    { name: 'Men', url: '#' },
    { name: 'Clothes', url: '#' },
    { name: 'Accessories', url: '#' },
    { name: 'Blog', url: '#' },
  ];

  const servicesLinks = [
    { name: 'Orders FAQs', url: '#' },
    { name: 'Shipping', url: '#' },
    { name: 'Privacy Policy', url: '#' },
    { name: 'Return & Refund', url: '#' },
  ];

  return (
    <footer className="bg-[#1c1c1c]">
      
      <div className="container mx-auto px-6 lg:px-35 py-25">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-center md:text-left">
          <div className="md:col-span-12 lg:col-span-3">
            <div className="text-2xl md:text-3xl font-bold text-white mb-4">
                <div
                className="cursor-pointer flex items-center"
                onClick={() => {
                  const router = useRouter();
                  router.push('/Accueil');
                }}
                >
                          <Image
                          src={logo}
                          alt="logo"
                          width={317}
                          height={29}
                          
                           ></Image>
                           
                        </div>
            </div>
            <div className="space-y-3 text-sm text-gray-400">
              <p><strong className="font-semibold text-white mr-2">Mail:</strong>hi.avitex@gmail.com</p>
              <p><strong className="font-semibold text-white mr-2">Phone:</strong>1-333-345-6868</p>
              <p><strong className="font-semibold text-white mr-2">Address:</strong>549 Oak St, Crystal Lake, IL 60014</p>
            </div>
          </div>
          <div className="md:col-span-4 lg:col-span-2">
            <FooterLinkColumn title="Information" links={infoLinks} />
          </div>
          <div className="md:col-span-4 lg:col-span-2">
            <FooterLinkColumn title="Quick Shop" links={shopLinks} />
          </div>
          <div className="md:col-span-4 lg:col-span-2">
            <FooterLinkColumn title="Customer Services" links={servicesLinks} />
          </div>
          <div className="md:col-span-12 lg:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Sign up for our newsletter and get 10% off your first purchase
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your e-mail"
                className="w-full p-3 rounded-md bg-white text-gray-900 placeholder-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </form>
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-300"><FaFacebookF size={20} /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-300"><FaInstagram size={20} /></a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors duration-300"><FaYoutube size={20} /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-300"><FaTwitter size={20} /></a>
              <a href="#" aria-label="Pinterest" className="text-gray-400 hover:text-white transition-colors duration-300"><FaPinterestP size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-16 pt-8">
          <p className="text-center text-sm text-gray-500">
            ©2023 Anvogue. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;