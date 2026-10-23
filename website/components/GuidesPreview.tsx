import React from 'react';
import Link from 'next/link';
import {
  Compass,
  BadgeDollarSign,
  Handshake,
  FileSignature,
  ClipboardCheck,
  Landmark,
  KeyRound,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Guide } from '@/lib/content';

interface GuidesPreviewProps {
  guides: Guide[];
  lang: 'ru' | 'en' | 'es';
}

const stepMeta: Record<
  number,
  {
    icon: React.ComponentType<{ className?: string }>;
    category: { ru: string; en: string; es: string };
  }
> = {
  1: {
    icon: Compass,
    category: { ru: 'Маршрут', en: 'Roadmap', es: 'Ruta' },
  },
  2: {
    icon: BadgeDollarSign,
    category: { ru: 'Финансы & POF', en: 'Finances & POF', es: 'Finanzas y POF' },
  },
  3: {
    icon: Handshake,
    category: { ru: 'Агент & MLS', en: 'Realtor & MLS', es: 'Agente y MLS' },
  },
  4: {
    icon: FileSignature,
    category: { ru: 'Оффер & Эскроу', en: 'Offer & Escrow', es: 'Oferta y Escrow' },
  },
  5: {
    icon: ClipboardCheck,
    category: { ru: 'Инспекция', en: 'Inspection', es: 'Inspección' },
  },
  6: {
    icon: Landmark,
    category: { ru: 'Ипотека', en: 'Mortgage Loan', es: 'Aprobación' },
  },
  7: {
    icon: KeyRound,
    category: { ru: 'Ключи от дома', en: 'Closing & Keys', es: 'Cierre y Llaves' },
  },
};

export default function GuidesPreview({ guides, lang }: GuidesPreviewProps) {
  const titles = {
    ru: {
      tag: 'Инфографика & База знаний',
      title: '7 шагов к покупке недвижимости во Флориде',
      subtitle: 'Понятный визуальный маршрут сделки — от первого расчёта бюджета до получения ключей',
      all: 'Все статьи гайда',
      step: 'Шаг',
      read: 'Читать шаг',
    },
    en: {
      tag: 'Infographics & Guide',
      title: '7 Steps to Buying Real Estate in South Florida',
      subtitle: 'A clear visual roadmap — from initial financing to receiving your keys',
      all: 'All Guide Chapters',
      step: 'Step',
      read: 'Read step',
    },
    es: {
      tag: 'Infografía y Guía',
      title: '7 pasos para comprar una propiedad en Florida',
      subtitle: 'Una guía visual completa — desde el presupuesto inicial hasta la entrega de llaves',
      all: 'Ver todos los capítulos',
      step: 'Paso',
      read: 'Leer paso',
    },
  }[lang];

  const ctaCard = {
    ru: {
      badge: 'Финал',
      title: 'Готовы сделать первый шаг к покупке?',
      subtitle: 'Пройдите короткий 60-секундный подбор или свяжитесь со мной напрямую.',
      button: 'Подобрать дом',
    },
    en: {
      badge: 'Take Action',
      title: 'Ready to Take the First Step to Your Home?',
      subtitle: 'Take the quick 60-second quiz or reach out directly to start your journey.',
      button: 'Find My Home',
    },
    es: {
      badge: 'Acción',
      title: '¿Listo para dar el primer paso hacia su hogar?',
      subtitle: 'Complete el cuestionario rápido de 60 segundos o contácteme directamente.',
      button: 'Encontrar mi casa',
    },
  }[lang];

  const guidesIndexLink = lang === 'en' ? '/guides' : `/${lang}/guides`;

  return (
    <section className="py-12 sm:py-20 bg-[#f7fbfc] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
          <div>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-2.5 sm:mb-3 inline-block">
              {titles.tag}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#31312c] tracking-tight">
              {titles.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl font-light">
              {titles.subtitle}
            </p>
          </div>

          <Link
            href={guidesIndexLink}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:text-[#20c063] hover:border-emerald-300 transition-colors shrink-0 shadow-xs"
          >
            <span>{titles.all}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Symmetric Grid of Infographic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {guides.slice(0, 7).map((guide, idx) => {
            const stepNumber = guide.step || idx + 1;
            const meta = stepMeta[stepNumber] || {
              icon: Compass,
              category: { ru: 'Гайд', en: 'Guide', es: 'Guía' },
            };
            const IconComponent = meta.icon;
            const categoryName = meta.category[lang] || meta.category.en;

            const guideUrl =
              lang === 'en'
                ? `/guides/${guide.slug}`
                : `/${lang}/guides/${encodeURIComponent(guide.slug)}`;

            return (
              <Link
                key={guide.id}
                href={guideUrl}
                className="relative aspect-auto sm:aspect-square p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-gray-100 hover:border-[#20c063] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-xs"
              >
                {/* Big subtle watermark step number */}
                <div className="absolute top-3 right-4 sm:right-5 text-4xl sm:text-6xl font-black text-gray-100/80 group-hover:text-emerald-100/90 transition-colors select-none pointer-events-none">
                  0{stepNumber}
                </div>

                {/* Top: Infographic Icon */}
                <div className="relative z-10">
                  <div className="mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#eafaf1] text-[#20c063] border border-emerald-100/80 flex items-center justify-center group-hover:bg-[#20c063] group-hover:text-white group-hover:scale-105 transition-all shadow-xs">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  {/* Micro-category */}
                  <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    {categoryName}
                  </span>

                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-[#20c063] transition-colors line-clamp-2 sm:line-clamp-3">
                    {guide.title}
                  </h3>
                </div>

                {/* Bottom: Infographic Action Row */}
                <div className="relative z-10 mt-4 sm:mt-0 pt-3 sm:pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500 group-hover:text-[#20c063] transition-colors">
                  <span className="flex items-center gap-1.5">
                    <span>{titles.read}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <span className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-[#20c063] transition-colors" />
                </div>
              </Link>
            );
          })}

          {/* 8th Card: Symmetric CTA completing the 4x2 grid */}
          <div className="relative aspect-auto sm:aspect-square p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1f201d] via-[#2a2c27] to-[#1f201d] text-white flex flex-col justify-between shadow-xl border border-gray-800 hover:border-[#20c063] hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#20c063]/20 text-[#20c063] border border-[#20c063]/30 flex items-center justify-center group-hover:scale-105 transition-all">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/50">
                  {ctaCard.badge}
                </span>
              </div>

              <h3 className="font-bold text-white text-base sm:text-[17px] leading-snug mb-1.5 sm:mb-2">
                {ctaCard.title}
              </h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
                {ctaCard.subtitle}
              </p>
            </div>

            <div className="relative z-10 mt-4 sm:mt-0 pt-3">
              <a
                href="#findmyhome"
                className="w-full py-2.5 px-4 bg-[#20c063] hover:bg-[#1aa654] text-white rounded-xl text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-2 shadow-md transition-all group-hover:shadow-emerald-500/20"
              >
                <span>{ctaCard.button}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
