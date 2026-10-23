import React from 'react';

interface ProcessProps {
  data: any;
}

export default function ProcessSection({ data }: ProcessProps) {
  return (
    <section id="steps" className="py-20 bg-[#f7fbfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-3 inline-block">
            Дорожная карта
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#31312c] tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {data.items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl font-black text-emerald-100 mb-6 font-mono">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#31312c] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-light">
                  {item.desc}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-50 flex items-center text-xs font-bold text-[#20c063]">
                <span>Шаг {idx + 1} из 3</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
