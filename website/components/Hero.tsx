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
    <section className="bg-[#f7fbfc] pt-12 pb-14 border-b border-gray-100 relative overflow-hidden">
      {/* Subtle Florida Palms Watermark pinned directly to the bottom border & aligned to the right */}
      <div className="absolute right-2 sm:right-8 lg:right-16 xl:right-24 bottom-0 w-48 sm:w-64 md:w-80 lg:w-96 pointer-events-none select-none z-0 opacity-[0.07] overflow-hidden leading-none">
        <Image
          src="/images/florida-palms-silhouette.png"
          alt=""
          width={812}
          height={1112}
          className="w-full h-auto object-contain object-bottom block"
          priority={false}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Centered Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-[50px] tracking-tight leading-tight">
            <span className="font-light text-[#31312c]">{hero.title_main} </span>
            <span className="font-bold text-[#20c063]">{hero.title_accent}</span>
          </h1>
          <p className="mt-3 text-lg sm:text-[18px] text-[#31312c] font-light max-w-3xl mx-auto">
            {hero.subtitle}
          </p>
        </div>

        {/* 2 Columns: Photo (Left) + Bullets & CTA (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center lg:items-end">
          {/* Left Column: Full Elena Photo without podlozhka, matching full text height */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-end">
            <Image
              src={hero.photo || '/images/lena-4.webp'}
              alt="Elena Stazhkova Real Estate Agent"
              width={673}
              height={1013}
              priority
              className="w-auto h-auto max-h-[500px] sm:max-h-[560px] lg:max-h-[620px] object-contain object-bottom drop-shadow-sm"
            />
          </div>

          {/* Right Column: 5 Bullet points with FontAwesome checkmark + CTA */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-3.5">
              {hero.bullets.map((bullet: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#20c063] shrink-0 mt-0.5" />
                  <p className="text-[15px] sm:text-[16px] text-[#000000] leading-relaxed font-normal">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>

            <p className="pt-2 text-[15px] sm:text-[16px] font-medium text-gray-900 leading-relaxed">
              {hero.cta_text}
            </p>

            <div className="pt-2">
              <a
                href="#findmyhome"
                className="inline-block px-8 py-3.5 bg-[#31312c] hover:bg-[#20c063] text-white font-bold text-sm tracking-wide uppercase rounded-xl shadow-md transition-all"
              >
                {hero.cta_button}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
