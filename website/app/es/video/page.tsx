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
  title: 'Reseñas en video e inteligencia de bienes raíces en Miami | Elena Stazhkova',
  description:
    'Vea los últimos recorridos en video, visitas guiadas a propiedades y análisis de mercado en el sur de Florida por la agente Elena Stazhkova.',
  alternates: {
    canonical: 'https://stazhkova.com/es/video',
    languages: {
      en: 'https://stazhkova.com/video',
      ru: 'https://stazhkova.com/ru/video',
      es: 'https://stazhkova.com/es/video',
      'x-default': 'https://stazhkova.com/video',
    },
  },
};

export default async function SpanishVideoPage() {
  const lang = 'es';
  const videos = await getChannelVideos(lang);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://stazhkova.com/es',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Reseñas en video',
        item: 'https://stazhkova.com/es/video',
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
              href="/es"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 uppercase tracking-wider">
                <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                Canal de YouTube de Elena Stazhkova
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#31312c] tracking-tight">
              Reseñas en video e información de mercado
            </h1>
            <p className="mt-3 text-lg text-gray-600 font-light">
              Análisis en video en profundidad de desarrollos inmobiliarios, casas de lujo y oportunidades de inversión en Sunny Isles, Aventura y Miami.
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
