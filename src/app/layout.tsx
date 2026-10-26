import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import { OctoProvider } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import LiveChatWidget from '@/components/chat/LiveChatWidget';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    template: '%s | OCTO - Smart Business Tools, Connected',
    default: 'OCTO | One Platform. Many Possibilities.',
  },
  description: BRAND.description,
  keywords: [
    'OCTO',
    'OCTO Tap',
    'Google Review Card',
    'NFC Review',
    'Kartu Review Google',
    'Smart Business Tools',
    'OCTO Insights',
    'OCTO Loyalty',
    'Reputasi Bisnis Lokal',
  ],
  authors: [{ name: 'OCTO Ecosystem' }],
  metadataBase: new URL('https://octo.id'),
  openGraph: {
    title: 'OCTO - One Platform. Many Possibilities.',
    description: BRAND.description,
    siteName: 'OCTO Platform',
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-OCTO.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/favicon-OCTO.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#FAFBFC] text-[#142740] selection:bg-[#E8F8FA] selection:text-[#00AFC4]">
        <OctoProvider>
          <Suspense fallback={<div className="h-16 border-b border-[#E1E7EC] bg-white" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <LiveChatWidget />
        </OctoProvider>
      </body>
    </html>
  );
}
