'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Lang = 'en' | 'ru' | 'es';

const content = {
  en: {
    badge: 'Seems you have drifted a bit off course',
    title: 'This shore has no such page yet',
    desc: 'The link might be outdated or there was a typo in the address. But no worries — South Florida’s finest beaches and homes are still right here!',
    homeBtn: 'Back to Home',
    homeLink: '/',
    whatsappBtn: 'Ask Elena on WhatsApp',
    whatsappMsg: 'Hello Elena! I am looking for property in South Florida.',
    popularTitle: 'Popular Destinations',
    guidesTitle: '📚 Buyer Guides',
    guidesDesc: 'Step-by-step buying process, POF, US mortgages',
    guidesLink: '/guides',
    videoTitle: '🎥 Video Tours',
    videoDesc: 'Walkthroughs of Miami areas & private estates',
    videoLink: '/video',
    quizTitle: '🎯 Find Your Property',
    quizDesc: '1-minute interactive quiz for your criteria',
    quizLink: '/#quiz',
  },
  ru: {
    badge: 'Кажется, вы немного отклонились от курса',
    title: 'Такой страницы на побережье пока нет',
    desc: 'Возможно, ссылка устарела или в адресе опечатка. Но не переживайте — лучшие дома и пляжи Майами никуда не делись!',
    homeBtn: 'На главную страницу',
    homeLink: '/ru',
    whatsappBtn: 'Спросить Елену в WhatsApp',
    whatsappMsg: 'Здравствуйте, Елена! Ищу недвижимость в Южной Флориде.',
    popularTitle: 'Популярные разделы сайта',
    guidesTitle: '📚 Гайды покупателя',
    guidesDesc: 'Схема покупки, POF, ипотека в США',
    guidesLink: '/ru/guides',
    videoTitle: '🎥 Видео-туры',
    videoDesc: 'Обзоры районов Майами и домов',
    videoLink: '/ru/video',
    quizTitle: '🎯 Подбор квартиры',
    quizDesc: 'Квиз за 1 минуту по вашим критериям',
    quizLink: '/ru#quiz',
  },
  es: {
    badge: 'Parece que te has desviado un poco de rumbo',
    title: 'Aún no existe esta página en la costa',
    desc: 'Es posible que el enlace haya caducado o haya un error tipográfico. ¡Pero no te preocupes, las mejores casas y playas de Miami te están esperando!',
    homeBtn: 'Ir al inicio',
    homeLink: '/es',
    whatsappBtn: 'Consultar a Elena por WhatsApp',
    whatsappMsg: '¡Hola Elena! Busco propiedades en el sur de Florida.',
    popularTitle: 'Secciones destacadas',
    guidesTitle: '📚 Guías del comprador',
    guidesDesc: 'Paso a paso de compra, POF, hipotecas en EE.UU.',
    guidesLink: '/es/guides',
    videoTitle: '🎥 Tours en video',
    videoDesc: 'Recorridos por zonas de Miami y residencias',
    videoLink: '/es/video',
    quizTitle: '🎯 Encuentra tu casa',
    quizDesc: 'Quiz de 1 minuto según tus criterios',
    quizLink: '/es#quiz',
  },
};

export default function NotFoundClient() {
  const pathname = usePathname() || '';
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    // 1. Detect from current URL pathname
    if (pathname.startsWith('/ru/') || pathname === '/ru') {
      setLang('ru');
      return;
    }
    if (pathname.startsWith('/es/') || pathname === '/es') {
      setLang('es');
      return;
    }

    // 2. If no prefix in path, inspect cookie
    const match = document.cookie.match(/NEXT_LOCALE=(ru|es|en)/);
    if (match && (match[1] === 'ru' || match[1] === 'es' || match[1] === 'en')) {
      setLang(match[1]);
      return;
    }

    // 3. Inspect browser language
    const navLang = navigator.language || '';
    if (navLang.toLowerCase().startsWith('ru')) {
      setLang('ru');
      return;
    }
    if (navLang.toLowerCase().startsWith('es')) {
      setLang('es');
      return;
    }

    setLang('en');
  }, [pathname]);

  const handleLangChange = (targetLang: Lang) => {
    setLang(targetLang);
    document.cookie = `NEXT_LOCALE=${targetLang}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const t = content[lang];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf7] text-[#31312c]">
      <Navbar lang={lang} onLangChange={handleLangChange} />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Soft sunshine background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-amber-100/40 via-emerald-100/30 to-sky-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl w-full mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-100 shadow-xs text-xs font-semibold text-[#20c063] mb-6 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#20c063]" />
            <span>{t.badge}</span>
          </div>

          {/* 404 Large Number & Compass Accent */}
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

          {/* Title & Description */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#31312c] mb-3">
            {t.title}
          </h2>
          <p className="text-base text-gray-600 max-w-md mx-auto mb-8 font-light leading-relaxed">
            {t.desc}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href={t.homeLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#20c063] hover:bg-[#1aa654] text-white font-bold rounded-2xl shadow-md shadow-emerald-600/15 transition-all transform hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              <span>{t.homeBtn}</span>
            </Link>

            <a
              href={`https://wa.me/13475154087?text=${encodeURIComponent(t.whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 text-[#31312c] font-semibold rounded-2xl border border-gray-200 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#20c063]" />
              <span>{t.whatsappBtn}</span>
            </a>
          </div>

          {/* Helpful Navigation Links Card */}
          <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 text-center sm:text-left">
              {t.popularTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href={t.guidesLink}
                className="group p-3.5 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <div className="text-sm font-bold text-gray-800 group-hover:text-[#20c063] transition-colors">
                  {t.guidesTitle}
                </div>
                <div className="text-xs text-gray-500 font-light mt-1">
                  {t.guidesDesc}
                </div>
              </Link>

              <Link
                href={t.videoLink}
                className="group p-3.5 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <div className="text-sm font-bold text-gray-800 group-hover:text-[#20c063] transition-colors">
                  {t.videoTitle}
                </div>
                <div className="text-xs text-gray-500 font-light mt-1">
                  {t.videoDesc}
                </div>
              </Link>

              <Link
                href={t.quizLink}
                className="group p-3.5 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <div className="text-sm font-bold text-gray-800 group-hover:text-[#20c063] transition-colors">
                  {t.quizTitle}
                </div>
                <div className="text-xs text-gray-500 font-light mt-1">
                  {t.quizDesc}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
