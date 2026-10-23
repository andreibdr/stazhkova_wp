import React from 'react';
import Image from 'next/image';
import { GraduationCap, Award, Globe, PhoneCall } from 'lucide-react';

interface AboutProps {
  data: any;
  lang: 'ru' | 'en' | 'es';
}

export default function AboutSection({ data, lang }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#f7fbfc]">
              <Image
                src="/images/elena-agent.webp"
                alt="Elena Stazhkova"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xl font-bold">Elena Stazhkova</div>
                <div className="text-xs text-emerald-300 font-medium">Realtor® & Investment Consultant</div>
                <div className="text-xs text-gray-200 mt-1">FL License #3352133</div>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider inline-block">
              {data.title}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#31312c] tracking-tight">
              {data.subtitle}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              <p>{data.p1}</p>
              <p>{data.p2}</p>
              <p>{data.p3}</p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#f7fbfc] border border-gray-100">
                <GraduationCap className="w-6 h-6 text-[#20c063] mb-2" />
                <div className="font-bold text-gray-900 text-sm">МГУ им. Ломоносова</div>
                <div className="text-xs text-gray-500">Магистр экономики</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#f7fbfc] border border-gray-100">
                <Award className="w-6 h-6 text-[#20c063] mb-2" />
                <div className="font-bold text-gray-900 text-sm">15+ Лет Опыта</div>
                <div className="text-xs text-gray-500">Инвестиции & Аналитика</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#f7fbfc] border border-gray-100">
                <Globe className="w-6 h-6 text-[#20c063] mb-2" />
                <div className="font-bold text-gray-900 text-sm">3 Языка</div>
                <div className="text-xs text-gray-500">Русский, English, Español</div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/13475154087"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#20c063] hover:bg-[#1aa654] text-white font-semibold rounded-xl shadow-xs transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>
                  {lang === 'ru'
                    ? 'Связаться с Еленой'
                    : lang === 'es'
                    ? 'Contactar a Elena'
                    : 'Get in Touch with Elena'}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
