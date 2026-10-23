import React from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

interface HeroProps {
  content: any;
  lang: 'ru' | 'en' | 'es';
}

export default function Hero({ content, lang }: HeroProps) {
  const { hero } = content;

  return (
    <section className="bg-[#f7fbfc] pt-14 pb-14 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Centered Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-[50px] tracking-tight leading-tight">
            <span className="font-light text-[#31312c]">{hero.title_main} </span>
            <span className="font-bold text-[#20c063]">{hero.title_accent}</span>
          </h1>
          <p className="mt-3 text-lg sm:text-[18px] text-[#31312c] font-light max-w-3xl mx-auto">
            {hero.subtitle}
          </p>
        </div>

        {/* 2 Columns: Photo (Left) + Bullets & CTA (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Elena Photo (lena-4.png) with vc_box_rounded */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
              <Image
                src={hero.photo || '/images/lena-4.png'}
                alt="Elena Stazhkova Real Estate Agent"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
              />
            </div>
          </div>

          {/* Right Column: 5 Bullet points with FontAwesome checkmark + CTA */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-4">
              {hero.bullets.map((bullet: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#20c063] shrink-0 mt-1" />
                  <p className="text-[15px] sm:text-[16px] text-[#000000] leading-relaxed font-normal">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>

            <p className="pt-2 text-[16px] font-medium text-gray-900 leading-relaxed">
              {hero.cta_text}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#findmyhome"
                className="inline-block px-8 py-3.5 bg-[#31312c] hover:bg-[#20c063] text-white font-bold text-sm tracking-wide uppercase rounded-xl shadow-md transition-all"
              >
                {hero.cta_button}
              </a>

              {/* Logo Emblem badge */}
              <div className="relative w-28 h-10 opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/logo.webp"
                  alt="Elena Stazhkova Emblem"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Official Real Estate Trust Badges */}
            <div className="pt-4 border-t border-gray-200/60 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500">
              <span className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700">
                REALTOR®
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700">
                Equal Housing Opportunity
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700">
                MLS Provider
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700">
                Zillow Premier Agent (5.0 ★)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
