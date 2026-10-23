import React from 'react';
import { Search, Phone, Home } from 'lucide-react';

interface WhatNextProps {
  data: any;
}

export default function WhatNext({ data }: WhatNextProps) {
  const icons = [
    <Search key="0" className="w-5 h-5 text-[#20c063]" />,
    <Phone key="1" className="w-5 h-5 text-[#20c063]" />,
    <Home key="2" className="w-5 h-5 text-[#20c063]" />,
  ];

  return (
    <section id="whatnext" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-normal text-[#31312c] mb-12">
          {data.title}
        </h2>

        <div className="space-y-6 text-left max-w-2xl mx-auto mb-10">
          {data.items.map((item: string, idx: number) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-50 shrink-0 mt-0.5">
                {icons[idx % icons.length]}
              </div>
              <p className="text-[16px] sm:text-[17px] text-[#000000] leading-relaxed font-normal">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <a
            href="#findmyhome"
            className="inline-block px-9 py-4 bg-[#31312c] hover:bg-[#20c063] text-white font-bold text-sm tracking-wide uppercase rounded-xl shadow-md transition-all"
          >
            {data.button}
          </a>
        </div>
      </div>
    </section>
  );
}
