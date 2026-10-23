import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://stazhkova.com'),
  title: {
    default: 'Elena Stazhkova | Licensed Miami Real Estate Agent & Investment Consultant',
    template: '%s | Elena Stazhkova Real Estate',
  },
  description:
    'Find your dream home or high-yield investment property in South Florida with Elena Stazhkova. Miami, Sunny Isles Beach, Aventura. License #3352133.',
  keywords: [
    'Elena Stazhkova',
    'Miami real estate agent',
    'Sunny Isles Beach realtor',
    'Aventura real estate',
    'риелтор в майами',
    'купить квартиру в майами',
    'недвижимость флорида',
    'bienes raices miami',
  ],
  authors: [{ name: 'Elena Stazhkova', url: 'https://stazhkova.com' }],
  creator: 'Elena Stazhkova',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stazhkova.com',
    title: 'Elena Stazhkova | Miami Real Estate Agent',
    description:
      'Discover luxury and investment properties in South Florida. Expert guidance from licensed realtor Elena Stazhkova.',
    siteName: 'Elena Stazhkova Real Estate',
    images: [
      {
        url: '/images/elena.webp',
        width: 1200,
        height: 630,
        alt: 'Elena Stazhkova - Real Estate Agent Miami',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elena Stazhkova | Miami Real Estate Agent',
    description:
      'Discover luxury and investment properties in South Florida with licensed realtor Elena Stazhkova.',
    images: ['/images/elena.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#20c063',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-white">
        {children}
      </body>
    </html>
  );
}
