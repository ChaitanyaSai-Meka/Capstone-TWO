import { Playfair_Display, Lato } from 'next/font/google';
import React from 'react';


const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair', 
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata = {
  title: 'XEON',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" /> 
      </head>
      <body className={`${playfairDisplay.variable} ${lato.variable}`}>
        {children}
      </body>
    </html>
  );
}