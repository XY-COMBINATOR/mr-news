import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Subscribe | MR NEWS',
  description:
    'Create your free MR NEWS account. Set your topic beats and receive a personalised AI-curated briefing every night at 22:00.',
  alternates: {
    canonical: '/login',
  },
  openGraph: {
    title: 'Subscribe to MR NEWS: Your Daily AI Briefing',
    description:
      'Sign up free. Get seven hand-picked stories delivered by AI every night at 22:00, ready to read with your morning coffee.',
    url: '/login',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Subscribe to MR NEWS',
    description:
      'Sign up free. Get seven hand-picked stories delivered by AI every night at 22:00.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
