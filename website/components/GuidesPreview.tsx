import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
      subtitle: 'Все этапы сделки простым языком — от бюджета до получения ключей',
      all: 'Все статьи гайда',
      step: 'Шаг',
    },
    en: {
      tag: 'Knowledge Base',
      title: 'South Florida Home Buying Guide: Step-by-Step',
      subtitle: 'Everything you need to know about purchasing real estate in Miami',
      all: 'All Guide Chapters',
      step: 'Step',
    },
    es: {
      tag: 'Base de Conocimiento',
      title: 'Guía paso a paso para comprar en Florida',
      subtitle: 'Todo lo que necesita saber para adquirir su propiedad en Miami',
      all: 'Ver todos los capítulos',
      step: 'Paso',
    },
  }[lang];

  const guidesIndexLink = lang === 'en' ? '/guides' : `/${lang}/guides`;

  return (
    <section className="py-14 sm:py-16 bg-[#f7fbfc] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-2.5 inline-block">
              {titles.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#31312c] tracking-tight">
              {titles.title}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-gray-600 max-w-2xl font-light">
              {titles.subtitle}
            </p>
          </div>

          <Link
            href={guidesIndexLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-800 hover:text-[#20c063] hover:border-emerald-300 transition-colors shrink-0 shadow-xs"
          >
            <span>{titles.all}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {guides.map((guide, idx) => {
            const guideUrl =
              lang === 'en'
                ? `/guides/${guide.slug}`
                : `/${lang}/guides/${encodeURIComponent(guide.slug)}`;

            return (
              <Link
                key={guide.id}
                href={guideUrl}
                className="group p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100/60">
                    {titles.step} {guide.step || idx + 1}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#20c063] group-hover:translate-x-1 transition-all shrink-0" />
                </div>

                <h3 className="font-bold text-gray-900 text-sm sm:text-[15px] group-hover:text-[#20c063] transition-colors line-clamp-2 leading-snug">
                  {guide.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
