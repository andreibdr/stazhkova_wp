import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuickBar from '@/components/QuickBar';
import { getGuides } from '@/lib/content';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guías de compra de bienes raíces en Florida | Elena Stazhkova',
  description:
    'Guía completa paso a paso para comprar propiedades en Miami y el sur de Florida por la realtor licenciada Elena Stazhkova.',
};

export default function SpanishGuidesPage() {
  const lang = 'es';
  const guides = getGuides(lang);

  return (
    <>
      <Navbar lang={lang} />
      <main className="flex-1 py-16 bg-[#f7fbfc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <Link
              href="/es"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </Link>
            <h1 className="text-4xl font-extrabold text-[#31312c] tracking-tight">
              Guía para Comprar Propiedades en Florida
            </h1>
            <p className="mt-3 text-lg text-gray-600 font-light">
              Base de conocimientos elaborada por Elena Stazhkova para compradores e inversionistas.
            </p>
          </div>

          <div className="space-y-4">
            {guides.map((guide, idx) => (
              <Link
                key={guide.id}
                href={`/es/guides/${encodeURIComponent(guide.slug)}`}
                className="block p-6 rounded-3xl bg-white border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                        Paso {idx + 1}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#20c063] transition-colors">
                      {guide.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 font-light leading-relaxed">
                      {guide.excerpt}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 group-hover:bg-emerald-50 text-gray-400 group-hover:text-[#20c063] transition-colors shrink-0">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <QuickBar lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
