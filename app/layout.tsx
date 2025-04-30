import React from 'react';

export const metadata = {
  title: 'XEON', 
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./logo.png" /> 
      </head>
      <body>{children}</body>
    </html>
  );
}