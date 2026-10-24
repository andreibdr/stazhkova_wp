import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuickBar from '@/components/QuickBar';
import VideoGallery from '@/components/VideoGallery';
import YoutubeIcon from '@/components/icons/YoutubeIcon';
import { getChannelVideos } from '@/lib/youtube';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Miami Real Estate Video Reviews & Market Intelligence | Elena Stazhkova',
  description:
    'Watch latest video tours, property walkthroughs, market analytics, and neighborhood guides in South Florida by realtor Elena Stazhkova.',
  alternates: {
    canonical: 'https://stazhkova.com/video',
    languages: {
      en: 'https://stazhkova.com/video',
      ru: 'https://stazhkova.com/ru/video',
      es: 'https://stazhkova.com/es/video',
      'x-default': 'https://stazhkova.com/video',
    },
  },
};

export default async function VideoPage() {
  const lang = 'en';
  const videos = await getChannelVideos(lang);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://stazhkova.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Video Reviews',
        item: 'https://stazhkova.com/video',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar lang={lang} />
      <main className="flex-1 py-16 bg-[#f7fbfc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 uppercase tracking-wider">
                <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                Elena Stazhkova Real Estate TV
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#31312c] tracking-tight">
              South Florida Real Estate Video Reviews
            </h1>
            <p className="mt-3 text-lg text-gray-600 font-light">
              In-depth video analysis, development reviews, private island tours, and market insights straight from the field in Sunny Isles, Aventura, and Miami.
            </p>
          </div>

          {/* Dynamic Video Gallery */}
          <VideoGallery videos={videos} lang={lang} />
        </div>
      </main>
      <QuickBar lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
