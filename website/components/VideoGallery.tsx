'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, ExternalLink, Calendar } from 'lucide-react';
import YoutubeIcon from '@/components/icons/YoutubeIcon';
import { YouTubeVideo } from '@/lib/youtube';

interface VideoGalleryProps {
  videos: YouTubeVideo[];
  lang: 'ru' | 'en' | 'es';
}

export default function VideoGallery({ videos, lang }: VideoGalleryProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(
    videos.length > 0 ? videos[0].id : null
  );

  const activeVideo = videos.find((v) => v.id === activeVideoId) || videos[0];

  const t = {
    ru: {
      tag: 'YouTube Канал',
      channelName: '@ElenaStazhkova',
      subscribe: 'Подписаться на канал',
      watchOnYt: 'Смотреть на YouTube',
      nowPlaying: 'Сейчас воспроизводится',
      latestVideos: 'Все видеообзоры',
    },
    en: {
      tag: 'YouTube Channel',
      channelName: '@ElenaStazhkova',
      subscribe: 'Subscribe on YouTube',
      watchOnYt: 'Watch on YouTube',
      nowPlaying: 'Now Playing',
      latestVideos: 'All Video Tours & Analysis',
    },
    es: {
      tag: 'Canal de YouTube',
      channelName: '@ElenaStazhkova',
      subscribe: 'Suscribirse al canal',
      watchOnYt: 'Ver en YouTube',
      nowPlaying: 'Reproduciendo ahora',
      latestVideos: 'Todos los recorridos en video',
    },
  }[lang];

  return (
    <div className="space-y-12">
      {/* Featured / Active Video Player */}
      {activeVideo && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 uppercase tracking-wider mb-2">
                <YoutubeIcon className="w-3.5 h-3.5" />
                {t.nowPlaying}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {activeVideo.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {activeVideo.published}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-colors"
              >
                <span>{t.watchOnYt}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.youtube.com/@ElenaStazhkova?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>{t.subscribe}</span>
              </a>
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}

      {/* Grid of all videos */}
      <div>
        <h4 className="text-2xl font-bold text-[#31312c] mb-6">
          {t.latestVideos}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => {
            const isSelected = video.id === activeVideoId;

            return (
              <div
                key={video.id}
                onClick={() => {
                  setActiveVideoId(video.id);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`group cursor-pointer bg-white rounded-3xl p-4 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-red-500 ring-2 ring-red-100 shadow-lg'
                    : 'border-gray-100 hover:border-red-300 hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={video.thumbnail || `/images/youtube/${video.id}.jpg`}
                      alt={video.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 group-hover:scale-110 text-white flex items-center justify-center shadow-lg transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <h5 className="font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-red-600 transition-colors mb-2">
                    {video.title}
                  </h5>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {video.published}
                  </span>
                  <span className="font-semibold text-red-600 group-hover:underline">
                    Play Video
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
