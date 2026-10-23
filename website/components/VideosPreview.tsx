'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowRight } from 'lucide-react';
import YoutubeIcon from '@/components/icons/YoutubeIcon';
import { YouTubeVideo } from '@/lib/youtube';

interface VideosPreviewProps {
  videos: YouTubeVideo[];
  lang: 'ru' | 'en' | 'es';
}

export default function VideosPreview({ videos, lang }: VideosPreviewProps) {
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);

  const t = {
    ru: {
      tag: 'YouTube Канал',
      title: 'Видеообзоры недвижимости Майами',
      subtitle: 'Актуальные обзоры жилых комплексов, закрытых островов и аналитика цен от Елены Стажковой',
      all: 'Все видеообзоры',
      play: 'Смотреть видео',
    },
    en: {
      tag: 'YouTube Channel',
      title: 'South Florida Real Estate Video Tours',
      subtitle: 'Latest development walkthroughs, private island home tours, and market analytics by Elena Stazhkova',
      all: 'View All Videos',
      play: 'Watch Video',
    },
    es: {
      tag: 'Canal de YouTube',
      title: 'Recorridos en video por bienes raíces en Miami',
      subtitle: 'Últimos análisis de proyectos, islas privadas e información de mercado por Elena Stazhkova',
      all: 'Ver todos los videos',
      play: 'Ver video',
    },
  }[lang];

  const videoPageLink = lang === 'en' ? '/video' : `/${lang}/video`;

  return (
    <section id="video" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 uppercase tracking-wider mb-3">
              <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
              {t.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#31312c] tracking-tight">
              {t.title}
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-2xl font-light">
              {t.subtitle}
            </p>
          </div>

          <Link
            href={videoPageLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:text-red-600 hover:border-red-300 transition-colors shrink-0 shadow-xs"
          >
            <span>{t.all}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 3).map((video) => (
            <div
              key={video.id}
              onClick={() => setModalVideoId(video.id)}
              className="group cursor-pointer p-4 rounded-3xl bg-white border border-gray-100 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-gray-100 shadow-xs">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 group-hover:scale-110 text-white flex items-center justify-center shadow-lg transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-red-600">
                <span>{t.play}</span>
                <span className="text-gray-400 font-normal">{video.published}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      {modalVideoId && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${modalVideoId}?autoplay=1`}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </section>
  );
}
