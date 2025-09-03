import React, { ReactNode } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sponsor from '@/components/Sponsor';
import { BagProvider } from '@/context/BagContext';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <BagProvider>
          <Navbar />
          {children}
          <Sponsor />
          <Footer />
        </BagProvider>
      </body>
    </html>
  );
}