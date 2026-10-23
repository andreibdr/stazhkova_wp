import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Guide } from '@/lib/content';

interface GuidesPreviewProps {
  guides: Guide[];
  lang: 'ru' | 'en' | 'es';
}

export default function GuidesPreview({ guides, lang }: GuidesPreviewProps) {
  const titles = {
    ru: {
      tag: 'База знаний',
      title: 'Пошаговый гайд: Покупка недвижимости в США',
      subtitle: 'Все этапы сделки простым и понятным языком — от бюджета до получения ключей',
      all: 'Все статьи гайда',
      step: 'Шаг',
      read: 'Читать шаг',
    },
    en: {
      tag: 'Knowledge Base',
      title: 'South Florida Home Buying Guide: Step-by-Step',
      subtitle: 'Everything you need to know about purchasing real estate in Miami — from budgeting to closing',
      all: 'All Guide Chapters',
      step: 'Step',
      read: 'Read Step',
    },
    es: {
      tag: 'Base de Conocimiento',
      title: 'Guía paso a paso para comprar en Florida',
      subtitle: 'Todo lo que necesita saber para adquirir su propiedad en Miami',
      all: 'Ver todos los capítulos',
      step: 'Paso',
      read: 'Leer paso',
    },
  }[lang];

  const guidesIndexLink = lang === 'en' ? '/guides' : `/${lang}/guides`;

  return (
    <section className="py-20 bg-[#f7fbfc] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-3 inline-block">
              {titles.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#31312c] tracking-tight">
              {titles.title}
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-2xl font-light">
              {titles.subtitle}
            </p>
          </div>

          <Link
            href={guidesIndexLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:text-[#20c063] hover:border-emerald-300 transition-colors shrink-0 shadow-xs"
          >
            <span>{titles.all}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, idx) => {
            const guideUrl =
              lang === 'en'
                ? `/guides/${guide.slug}`
                : `/${lang}/guides/${encodeURIComponent(guide.slug)}`;

            return (
              <Link
                key={guide.id}
                href={guideUrl}
                className="group p-6 rounded-3xl bg-white border border-gray-100 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100/50">
                      {titles.step} {guide.step || idx + 1}
                    </span>
                    <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-[#20c063] transition-colors" />
                  </div>

                  <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 group-hover:text-[#20c063] transition-colors line-clamp-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-light line-clamp-3 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-[#20c063]">
                  <span>{titles.read}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
