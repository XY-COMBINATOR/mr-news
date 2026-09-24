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
    default: 'MR NEWS — Daily Frontier Tech & Global Intelligence',
    template: '%s | MR NEWS',
  },
  description:
    'Seven essential stories. Five minutes. MR NEWS delivers distilled morning intelligence on technology, policy, and capital markets directly to your inbox at your chosen hour.',
  keywords: [
    'executive morning briefing',
    'tech market intelligence',
    'global wire news',
    'frontier technology digest',
    'venture capital news',
    'daily executive briefing',
    'MR NEWS',
    'silicon valley newsletter',
    'morning briefing',
  ],
  authors: [{ name: 'MR NEWS Editorial Desk', url: BASE_URL }],
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
    title: 'MR NEWS — Daily Frontier Tech & Global Intelligence',
    description:
      'Seven essential stories. Five minutes. Distilled morning intelligence on technology, policy, and capital markets delivered daily.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MR NEWS — Daily Frontier Tech & Global Intelligence',
        type: 'image/png',
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: 'summary_large_image',
    site: '@mrnewspaper',
    creator: '@mrnewspaper',
    title: 'MR NEWS — Daily Frontier Tech & Global Intelligence',
    description:
      'Seven essential stories. Five minutes. High-signal morning briefing for operators and investors.',
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
          'Executive morning news briefing — six hundred wire sources distilled to seven essential stories, five minutes, delivered at your chosen hour.',
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
        name: 'MR NEWS — Daily Frontier Tech & Global Intelligence',
        isPartOf: { '@id': `${BASE_URL}/#website` },
        about: { '@id': `${BASE_URL}/#organization` },
        description:
          'Subscribe to the MR NEWS morning briefing. Six hundred wire sources. Seven essential stories. Five minutes. Delivered at the hour you choose.',
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
          'An executive morning briefing synthesizing global news from 600+ wires into 7 essential stories, delivered daily.',
        publishingPrinciples: `${BASE_URL}/about`,
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />

        {/* Fontshare: Switzer + Sentient */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&f[]=sentient@400i&display=swap"
          rel="stylesheet"
        />

        {/* Favicon set */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme colour for browser chrome */}
        <meta name="theme-color" content="#101012" />
        <meta name="msapplication-TileColor" content="#101012" />

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
// MR NEWS — Executive Morning Intelligence Platform
