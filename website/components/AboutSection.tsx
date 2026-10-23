import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface AboutProps {
  data: any;
}

export default function AboutSection({ data }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-[#f7fbfc] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[#31312c]">
            <span className="font-bold text-[#20c063]">{data.title_accent} </span>
            <span className="font-light text-[#31312c]">{data.title_main}</span>
          </h2>
        </div>

        {/* 2 Columns: Photo (Left) + 3 Message Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Original Elena Photo (Elena_green.webp) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src={data.photo || '/images/elena_green.webp'}
                alt="Elena Stazhkova"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
          </div>

          {/* Right: 3 Styled Message Boxes matching WP alert-info, alert-success, vista_blue */}
          <div className="lg:col-span-7 space-y-5">
            {/* Box 1: Alert Info (Blue) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#eef7fd] border border-[#d2ebfc] text-[#24587c] flex items-start gap-3.5 shadow-xs">
              <ChevronRight className="w-5 h-5 text-[#31708f] shrink-0 mt-0.5" />
              <p className="text-[14px] sm:text-[15px] leading-relaxed font-normal">
                {data.messages[0]}
              </p>
            </div>

            {/* Box 2: Alert Success (Green) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#edf7ee] border border-[#cbe9cc] text-[#2b6a2f] flex items-start gap-3.5 shadow-xs">
              <ChevronRight className="w-5 h-5 text-[#3c763d] shrink-0 mt-0.5" />
              <p className="text-[14px] sm:text-[15px] leading-relaxed font-normal">
                {data.messages[1]}
              </p>
            </div>

            {/* Box 3: Vista Blue (Indigo / Soft Blue) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#f0f4f9] border border-[#d6e2f1] text-[#2c476c] flex items-start gap-3.5 shadow-xs">
              <ChevronRight className="w-5 h-5 text-[#4169e1] shrink-0 mt-0.5" />
              <p className="text-[14px] sm:text-[15px] leading-relaxed font-normal">
                {data.messages[2]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
