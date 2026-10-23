import React from 'react';
import { MapPin } from 'lucide-react';

interface AreasProps {
  data: any;
}

export default function AreasSection({ data }: AreasProps) {
  return (
    <section id="areas" className="py-20 bg-[#f7fbfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-3 inline-block">
            География
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#31312c] tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data.items.map((area: any, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#20c063] flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {area.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                  {area.desc}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-50 text-xs font-bold text-[#20c063]">
                South Florida
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
