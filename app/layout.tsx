import type { Metadata } from 'next';
import React from 'react';
import '@/styles/style.css';
import '@/styles/login.css';
import { Providers } from './providers';
import { InkCursor } from './components/InkCursor';

export const metadata: Metadata = {
  title: 'MR NEWS — The AI Newsletter That Reads Itself',
  description: 'Six hundred sources. Seven stories. Five minutes. The AI newsletter curated for humans.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Special+Elite&family=IM+Fell+English:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <InkCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
