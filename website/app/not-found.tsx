import React from 'react';
import NotFoundClient from '@/components/NotFoundClient';

export const metadata = {
  title: 'Page Not Found (404) | Elena Stazhkova Real Estate',
  description: 'Page not found. Discover South Florida luxury real estate with Elena Stazhkova.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
