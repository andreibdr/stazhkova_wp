import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

interface WorkProps {
  data: any;
}

export default function WorkWithElena({ data }: WorkProps) {
  return (
    <section id="workelena" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[#31312c]">
            <span className="font-bold text-[#20c063]">{data.title_accent} </span>
            <span className="font-light text-[#31312c]">{data.title_main}</span>
          </h2>
        </div>

        {/* 2 Columns: 10 Questions Checklist (Left) + Circular Elena Image (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-[17px] text-[#000000] font-normal leading-relaxed">
              {data.intro}
            </p>

            <ul className="space-y-3 pt-2">
              {data.questions.map((q: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#20c063] shrink-0 mt-0.5" />
                  <span className="text-[15px] sm:text-[16px] text-[#000000] leading-relaxed">
                    {q}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {/* Circular Photo matching vc_box_circle_2 image01.jpg */}
            <div className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-full overflow-hidden shadow-2xl border-8 border-[#f7fbfc]">
              <Image
                src="/images/image01.jpg"
                alt="Work with Elena Stazhkova"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 320px"
              />
            </div>
          </div>
        </div>

        {/* Banner with original styling: border-radius: 30px, white bg, center text */}
        <div className="my-14 p-8 sm:p-12 rounded-[30px] bg-white border border-gray-100 shadow-xl text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#31312c] leading-snug max-w-4xl mx-auto">
            {data.banner}
          </h3>
        </div>

        {/* 3 Columns: Parts 1, 2, 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Part 1 */}
          <div className="p-8 rounded-3xl bg-[#f7fbfc] border border-gray-100 space-y-4">
            <h4 className="text-xl font-bold text-[#31312c]">
              {data.parts[0].title}
            </h4>
            <p className="text-sm sm:text-[15px] text-[#000000] leading-relaxed font-light">
              {data.parts[0].p1}
            </p>
            <p className="text-sm sm:text-[15px] text-[#000000] leading-relaxed font-light">
              {data.parts[0].p2}
            </p>
            <p className="text-sm sm:text-[15px] text-[#000000] leading-relaxed font-light">
              {data.parts[0].p3}
            </p>
          </div>

          {/* Part 2 */}
          <div className="p-8 rounded-3xl bg-[#f7fbfc] border border-gray-100 space-y-4">
            <h4 className="text-xl font-bold text-[#31312c]">
              {data.parts[1].title}
            </h4>
            <p className="text-sm sm:text-[15px] text-[#000000] leading-relaxed font-light">
              {data.parts[1].p1}
            </p>
            {data.parts[1].bullets && (
              <ul className="space-y-2.5 pt-1">
                {data.parts[1].bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#000000] font-light">
                    <span className="text-[#20c063] font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-sm sm:text-[15px] text-[#000000] leading-relaxed font-light pt-2">
              {data.parts[1].p2}
            </p>
          </div>

          {/* Part 3 */}
          <div className="p-8 rounded-3xl bg-[#f7fbfc] border border-gray-100 space-y-4">
            <h4 className="text-xl font-bold text-[#31312c]">
              {data.parts[2].title}
            </h4>
            <p className="text-sm sm:text-[15px] text-[#000000] leading-relaxed font-light">
              {data.parts[2].p1}
            </p>
            {data.parts[2].bullets && (
              <ul className="space-y-2.5 pt-1">
                {data.parts[2].bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#000000] font-light">
                    <span className="text-[#20c063] font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-sm sm:text-[15px] text-[#000000] leading-relaxed font-light pt-2">
              {data.parts[2].p2}
            </p>
            {data.parts[2].quote && (
              <blockquote className="p-3.5 bg-white rounded-xl border-l-4 border-[#20c063] text-xs sm:text-sm italic text-gray-700">
                {data.parts[2].quote}
              </blockquote>
            )}
            <p className="text-sm sm:text-[15px] text-[#000000] leading-relaxed font-light pt-2">
              {data.parts[2].p3}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-4">
          <a
            href="#findmyhome"
            className="inline-block px-8 py-3.5 bg-[#31312c] hover:bg-[#20c063] text-white font-bold text-sm tracking-wide uppercase rounded-xl shadow-md transition-all"
          >
            {data.parts[0].button || 'Find My Home'}
          </a>
        </div>
      </div>
    </section>
  );
}
