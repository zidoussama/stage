import React, { ReactNode } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sponsor from '@/components/Sponsor';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        {children}
        <Sponsor />
        <Footer />
      </body>
    </html>
  );
}