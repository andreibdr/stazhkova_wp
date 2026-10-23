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
  title: 'Видеообзоры недвижимости Майами и Флориды | Елена Стажкова',
  description:
    'Смотрите авторские видеообзоры новостроек, районов Майами, Санни-Айлс, Авентуры и инвестиционной недвижимости от лицензированного риелтора Елены Стажковой.',
};

export default async function RussianVideoPage() {
  const lang = 'ru';
  const videos = await getChannelVideos();

  return (
    <>
      <Navbar lang={lang} />
      <main className="flex-1 py-16 bg-[#f7fbfc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <Link
              href="/ru"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>На главную</span>
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 uppercase tracking-wider">
                <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                YouTube Канал Елены Стажковой
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#31312c] tracking-tight">
              Видеообзоры и аналитика недвижимости
            </h1>
            <p className="mt-3 text-lg text-gray-600 font-light">
              Честный разбор проектов, закрытых комьюнити, скидок от застройщиков и актуального состояния рынка Майами и Южной Флориды.
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
