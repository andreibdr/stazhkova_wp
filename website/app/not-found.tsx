import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Compass, MessageCircle, ArrowLeft, Search, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Страница не найдена (404) | Elena Stazhkova Real Estate',
  description: 'Похоже, эта страница переехала или адрес введен с ошибкой. Поможем вам сориентироваться на побережье Южной Флориды.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf7] text-[#31312c]">
      <Navbar lang="ru" />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Soft background decor / sunshine glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-amber-100/40 via-emerald-100/30 to-sky-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl w-full mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-100 shadow-xs text-xs font-semibold text-[#20c063] mb-6 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#20c063]" />
            <span>Кажется, вы немного отклонились от курса</span>
          </div>

          {/* 404 Large Number & Illustration Accent */}
          <div className="relative mb-6">
            <h1 className="text-8xl sm:text-9xl font-black tracking-tight text-gray-900/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white shadow-xl border border-gray-100 flex items-center justify-center text-[#20c063] rotate-3 hover:rotate-0 transition-transform">
                <Compass className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title & Friendly description */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#31312c] mb-3">
            Такой страницы на побережье пока нет
          </h2>
          <p className="text-base text-gray-600 max-w-md mx-auto mb-8 font-light leading-relaxed">
            Возможно, ссылка устарела или в адресе опечатка. Но не переживайте — лучшие дома и пляжи Майами никуда не делись!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href="/ru"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#20c063] hover:bg-[#1aa654] text-white font-bold rounded-2xl shadow-md shadow-emerald-600/15 transition-all transform hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              <span>На главную страницу</span>
            </Link>

            <a
              href="https://wa.me/13475154087?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%95%D0%BB%D0%B5%D0%BD%D0%B0!%20%D0%98%D1%89%D1%83%20%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%B2%20%D0%AE%D0%B6%D0%BD%D0%BE%D0%B9%20%D0%A4%D0%BB%D0%BE%D1%80%D0%B8%D0%B4%D0%B5."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 text-[#31312c] font-semibold rounded-2xl border border-gray-200 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#20c063]" />
              <span>Спросить Елену в WhatsApp</span>
            </a>
          </div>

          {/* Helpful Navigation Links Card */}
          <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 text-center sm:text-left">
              Популярные разделы сайта
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/ru/guides"
                className="group p-3.5 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <div className="text-sm font-bold text-gray-800 group-hover:text-[#20c063] transition-colors">
                  📚 Гайды покупателя
                </div>
                <div className="text-xs text-gray-500 font-light mt-1">
                  Схема покупки, POF, ипотека в США
                </div>
              </Link>

              <Link
                href="/ru/video"
                className="group p-3.5 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <div className="text-sm font-bold text-gray-800 group-hover:text-[#20c063] transition-colors">
                  🎥 Видео-туры
                </div>
                <div className="text-xs text-gray-500 font-light mt-1">
                  Обзоры районов Майами и домов
                </div>
              </Link>

              <Link
                href="/ru#quiz"
                className="group p-3.5 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <div className="text-sm font-bold text-gray-800 group-hover:text-[#20c063] transition-colors">
                  🎯 Подбор квартиры
                </div>
                <div className="text-xs text-gray-500 font-light mt-1">
                  Квиз за 1 минуту по вашим критериям
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer lang="ru" />
    </div>
  );
}
