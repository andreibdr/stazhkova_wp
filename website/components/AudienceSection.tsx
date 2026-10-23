import React from 'react';
import { Search, TrendingUp, Compass, Key } from 'lucide-react';

interface AudienceProps {
  data: any;
}

export default function AudienceSection({ data }: AudienceProps) {
  const icons = [
    <Search key="0" className="w-6 h-6 text-[#20c063]" />,
    <TrendingUp key="1" className="w-6 h-6 text-[#20c063]" />,
    <Compass key="2" className="w-6 h-6 text-[#20c063]" />,
    <Key key="3" className="w-6 h-6 text-[#20c063]" />,
  ];

  return (
    <section id="workelena" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-3 inline-block">
            Специализация
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#31312c] tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#f7fbfc] border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {icons[idx % icons.length]}
              </div>
              <h3 className="text-xl font-bold text-[#31312c] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
