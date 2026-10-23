'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Home } from 'lucide-react';

interface QuickBarProps {
  lang: 'ru' | 'en' | 'es';
}

export default function QuickBar({ lang }: QuickBarProps) {
  const homePath = lang === 'en' ? '/' : `/${lang}`;

  const labels = {
    ru: { call: 'Звонок', wa: 'WhatsApp', quiz: 'Подобрать дом' },
    en: { call: 'Call', wa: 'WhatsApp', quiz: 'Find Home' },
    es: { call: 'Llamar', wa: 'WhatsApp', quiz: 'Buscar' },
  }[lang];

  const handleQuizClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el =
      document.getElementById('findmyhome') ||
      document.getElementById('quiz') ||
      document.getElementById('quiz-box');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 sm:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        <a
          href="tel:+13475154087"
          className="flex flex-col items-center justify-center py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
        >
          <Phone className="w-5 h-5 text-gray-700" />
          <span className="text-[10px] font-bold mt-0.5">{labels.call}</span>
        </a>

        <a
          href="https://wa.me/13475154087"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-[10px] font-bold mt-0.5">{labels.wa}</span>
        </a>

        <Link
          href={`${homePath}#findmyhome`}
          onClick={handleQuizClick}
          className="flex flex-col items-center justify-center py-1.5 rounded-xl bg-[#20c063] text-white hover:bg-[#1aa654] transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">{labels.quiz}</span>
        </Link>
      </div>
    </div>
  );
}
