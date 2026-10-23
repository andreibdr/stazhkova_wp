import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Star, Award, ShieldCheck, ArrowRight } from 'lucide-react';

interface HeroProps {
  content: any;
  lang: 'ru' | 'en' | 'es';
}

export default function Hero({ content, lang }: HeroProps) {
  const { hero, bullets } = content;
  const guidesLink = lang === 'en' ? '/guides' : `/${lang}/guides`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7fbfc] via-white to-[#f7fbfc] pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {hero.license_badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span>Zillow 5.0 Rating</span>
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#31312c] tracking-tight leading-tight">
              <span>{hero.title_line1} </span>
              <span className="text-[#20c063] block sm:inline">{hero.title_line2}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
              {hero.subtitle}
            </p>

            {/* Experience Highlight Pill */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs max-w-xl">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-[#20c063]">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium text-gray-800">
                {hero.experience_badge}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#quiz"
                className="px-6 py-3.5 bg-[#20c063] hover:bg-[#1aa654] text-white font-semibold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>{hero.cta_button}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href={guidesLink}
                className="px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-semibold text-base rounded-xl shadow-xs transition-all"
              >
                {hero.guides_button}
              </Link>
            </div>
          </div>

          {/* Right Column: Elena Photo with Glass Card Overlays */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/elena.webp"
                alt="Elena Stazhkova - Real Estate Agent Miami"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Bottom Card on Photo */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Elena Stazhkova</div>
                    <div className="text-xs text-emerald-600 font-medium">Licensed Florida REALTOR®</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-gray-900">Miami & Beaches</div>
                    <div className="text-xs text-gray-500">Luxury & Investment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Bullets */}
        <div className="mt-16 pt-12 border-t border-gray-200/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bullets.map((bullet: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
                <CheckCircle2 className="w-6 h-6 text-[#20c063] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
