import type { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  title: 'Subscribe — MR NEWS',
  description:
    'Create your free MR NEWS account. Choose your delivery time, set your interests, and receive a personalised AI-curated briefing every day in your inbox.',
  alternates: {
    canonical: '/login',
  },
  openGraph: {
    title: 'Subscribe to MR NEWS — Your Daily AI Briefing',
    description:
      'Sign up free. Choose what time you want the news. Get seven hand-picked stories delivered by AI every single day.',
    url: '/login',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Subscribe to MR NEWS',
    description:
      'Sign up free. Choose what time you want the news. Get seven hand-picked stories delivered by AI every day.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
// MR NEWS — Executive Morning Intelligence Platform
