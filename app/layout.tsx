import type { Metadata } from 'next';
import React from 'react';
import '@/styles/style.css';
import '@/styles/login.css';
import { Providers } from './providers';
import { InkCursor } from './components/InkCursor';

const BASE_URL = process.env.NEXTAUTH_URL || 'https://mr-news.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Core ── */
  title: {
    default: 'MR NEWS — The AI Newsletter That Reads Itself',
    template: '%s | MR NEWS',
  },
  description:
    'Six hundred sources. Seven stories. Five minutes. MR NEWS is the AI-powered daily briefing that reads the world\'s news so you don\'t have to — delivered to your inbox at the hour you choose.',
  keywords: [
    'AI newsletter',
    'daily news briefing',
    'automated news summary',
    'tech news digest',
    'AI curated news',
    'news email subscription',
    'MR NEWS',
    'artificial intelligence news',
    'news aggregator',
    'morning briefing',
  ],
  authors: [{ name: 'MR NEWS Editorial Engine', url: BASE_URL }],
  creator: 'MR NEWS',
  publisher: 'MR NEWS',
  category: 'news',

  /* ── Canonical ── */
  alternates: {
    canonical: '/',
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /* ── Open Graph ── */
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'MR NEWS',
    title: 'MR NEWS — The AI Newsletter That Reads Itself',
    description:
      'Six hundred sources. Seven stories. Five minutes. AI-powered daily intelligence delivered to your inbox at your chosen hour.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MR NEWS — The AI Newsletter That Reads Itself',
        type: 'image/png',
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: 'summary_large_image',
    site: '@mrnewspaper',
    creator: '@mrnewspaper',
    title: 'MR NEWS — The AI Newsletter That Reads Itself',
    description:
      'Six hundred sources. Seven stories. Five minutes. Sign up for your personalised AI briefing.',
    images: ['/og-image.png'],
  },

  /* ── Verification (add keys after claiming in Search Console) ── */
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? '',
  },

  /* ── App / PWA ── */
  applicationName: 'MR NEWS',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MR NEWS',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* JSON-LD structured data */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'MR NEWS',
        description:
          'AI-powered daily news briefing — six hundred sources distilled to seven stories, five minutes, delivered at your hour.',
        publisher: { '@id': `${BASE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'MR NEWS',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/assets/brand/mr_news_logo.svg`,
          width: 512,
          height: 512,
        },
        sameAs: [],
      },
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/#webpage`,
        url: BASE_URL,
        name: 'MR NEWS — The AI Newsletter That Reads Itself',
        isPartOf: { '@id': `${BASE_URL}/#website` },
        about: { '@id': `${BASE_URL}/#organization` },
        description:
          'Sign up for the AI-powered daily news briefing. Six hundred sources. Seven stories. Five minutes. Delivered at the hour you choose.',
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'ReadAction',
          target: [BASE_URL],
        },
      },
      {
        '@type': 'NewsMediaOrganization',
        '@id': `${BASE_URL}/#news-org`,
        name: 'MR NEWS',
        url: BASE_URL,
        foundingDate: '2024',
        description:
          'An AI-powered newsletter that synthesises global news from 600+ sources into 7 essential stories, delivered daily.',
        publishingPrinciples: `${BASE_URL}/about`,
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Special+Elite&family=IM+Fell+English:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* Favicon set */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme colour for browser chrome */}
        <meta name="theme-color" content="#e8ddc2" />
        <meta name="msapplication-TileColor" content="#e8ddc2" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
