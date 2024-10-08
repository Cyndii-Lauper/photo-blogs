import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { clsx } from 'clsx/lite';
import { IBM_Plex_Mono } from 'next/font/google';
import {
  BASE_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from '@/site/config';
import AppStateProvider from '@/state/AppStateProvider';
import ToasterWithThemes from '@/toast/ToasterWithThemes';
import PhotoEscapeHandler from '@/photo/PhotoEscapeHandler';
import { Metadata } from 'next/types';
import { ThemeProvider } from 'next-themes';
import Nav from '@/site/Nav';
import Footer from '@/site/Footer';
import CommandK from '@/site/CommandK';
import SwrConfigClient from '../state/SwrConfigClient';
import AdminBatchEditPanel from '@/admin/AdminBatchEditPanel';
import SmoothScroll from '@/app/components/SmoothScroll';

import '../site/globals.css';
import '../site/sonner.css';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  ...BASE_URL && { metadataBase: new URL(BASE_URL) },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: [{
    url: '/favicon.ico',
    rel: 'icon',
    type: 'image/png',
    sizes: '180x180',
  }, {
    url: '/favicons/light.png',
    rel: 'icon',
    media: '(prefers-color-scheme: light)',
    type: 'image/png',
    sizes: '32x32',
  }, {
    url: '/favicons/dark.png',
    rel: 'icon',
    media: '(prefers-color-scheme: dark)',
    type: 'image/png',
    sizes: '32x32',
  }, {
    url: '/favicons/apple-touch-icon.png',
    rel: 'icon',
    type: 'image/png',
    sizes: '180x180',
  }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={ibmPlexMono.variable}>
        <AppStateProvider>
          <SwrConfigClient>
            <ThemeProvider attribute="class">
              <main className={clsx(
                'mx-3 mb-3',
                'lg:mx-6 lg:mb-6',
                // Center on large screens
                // 1280px width defined in components/SiteGrid.tsx
                '3xl:mx-auto 3xl:w-[1280px]',
              )}>
                <Nav siteDomainOrTitle={'Photo Blogs'} />
                <AdminBatchEditPanel />
                <div className={clsx(
                  'min-h-[16rem] sm:min-h-[30rem]',
                  'mb-12',
                )}>
                  <SmoothScroll>{children}</SmoothScroll>
                </div>
                <Footer />
              </main>
              <CommandK />
            </ThemeProvider>
          </SwrConfigClient>
          <Analytics debug={true} />
          <SpeedInsights debug={true}  />
          <PhotoEscapeHandler />
          <ToasterWithThemes />
        </AppStateProvider>
      </body>
    </html>
  );
}
