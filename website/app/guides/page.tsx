import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuickBar from '@/components/QuickBar';
import { getGuides } from '@/lib/content';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'First Time Home Buyer? | South Florida Home Buying Guide',
  description:
    'How To Buy Your Dream Home Step By Step! Comprehensive guide on purchasing real estate in Miami and South Florida by licensed realtor Elena Stazhkova.',
  alternates: {
    canonical: 'https://stazhkova.com/guides',
    languages: {
      en: 'https://stazhkova.com/guides',
      ru: 'https://stazhkova.com/ru/guides',
      es: 'https://stazhkova.com/es/guides',
      'x-default': 'https://stazhkova.com/guides',
    },
  },
  openGraph: {
    title: 'First Time Home Buyer? | South Florida Home Buying Guide',
    description:
      'How To Buy Your Dream Home Step By Step! 7-step guide on purchasing real estate in Miami by realtor Elena Stazhkova.',
    url: 'https://stazhkova.com/guides',
    siteName: 'Elena Stazhkova Real Estate',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://stazhkova.com/images/elena.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'South Florida Home Buying Guide | Elena Stazhkova',
    description: 'Comprehensive 7-step guide to buying real estate in Miami.',
    images: ['https://stazhkova.com/images/elena.webp'],
  },
};

export default function GuidesPage() {
  const lang = 'en';
  const guides = getGuides(lang);

  return (
    <>
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
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                First Time Home Buyer?
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#31312c] tracking-tight">
              How To Buy Your Dream Home Step By Step!
            </h1>
            <p className="mt-3 text-lg text-gray-600 font-light">
              Essential South Florida real estate purchasing knowledge curated by licensed realtor Elena Stazhkova.
            </p>
          </div>

          {/* 3-column Grid matching WP Residence layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, idx) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 p-5"
              >
                <div>
                  {guide.image && (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-5 bg-gray-100 shadow-xs">
                      <Image
                        src={guide.image}
                        alt={guide.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-gray-900 shadow-sm border border-gray-100">
                        Step {guide.step || idx + 1}
                      </div>
                    </div>
                  )}

                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#20c063] transition-colors mb-3 line-clamp-2">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-gray-600 font-light line-clamp-3 leading-relaxed mb-4">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#20c063]">
                  <span>Read Step {guide.step || idx + 1}</span>
                  <div className="p-2 rounded-xl bg-emerald-50 group-hover:bg-[#20c063] text-[#20c063] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <QuickBar lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
