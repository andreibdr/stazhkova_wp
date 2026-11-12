import React from 'react';
import Link from 'next/link';
import { Home, Compass, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Page Not Found (404) | Elena Stazhkova Real Estate',
  description: 'Page not found. Discover South Florida luxury real estate with Elena Stazhkova.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf7] text-[#31312c]">
      <Navbar lang="en" />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Soft sunshine glow background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-amber-100/40 via-emerald-100/30 to-sky-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl w-full mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-100 shadow-xs text-xs font-semibold text-[#20c063] mb-6 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#20c063]" />
            <span>Seems you have drifted a bit off course</span>
          </div>

          {/* 404 Large Number & Compass Accent */}
          <div className="relative mb-6">
            <h1 className="text-8xl sm:text-9xl font-black tracking-tight text-gray-900/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white shadow-xl border border-gray-100 flex items-center justify-center text-[#20c063] rotate-3 hover:rotate-0 transition-transform">
                <Compass className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title & Description in English */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#31312c] mb-3">
            This shore has no such page yet
          </h2>
          <p className="text-base text-gray-600 max-w-md mx-auto mb-8 font-light leading-relaxed">
            The link might be outdated or there was a typo in the address. But no worries — South Florida’s finest beaches and homes are still right here!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#20c063] hover:bg-[#1aa654] text-white font-bold rounded-2xl shadow-md shadow-emerald-600/15 transition-all transform hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <a
              href="https://wa.me/13475154087?text=Hello%20Elena!%20I%20am%20looking%20for%20property%20in%20South%20Florida."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 text-[#31312c] font-semibold rounded-2xl border border-gray-200 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#20c063]" />
              <span>Ask Elena on WhatsApp</span>
            </a>
          </div>

          {/* Helpful Navigation Links Card */}
          <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 text-center sm:text-left">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/guides"
                className="group p-3.5 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <div className="text-sm font-bold text-gray-800 group-hover:text-[#20c063] transition-colors">
                  📚 Buyer Guides
                </div>
                <div className="text-xs text-gray-500 font-light mt-1">
                  Step-by-step process, POF, US mortgages
                </div>
              </Link>

              <Link
                href="/video"
                className="group p-3.5 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <div className="text-sm font-bold text-gray-800 group-hover:text-[#20c063] transition-colors">
                  🎥 Video Tours
                </div>
                <div className="text-xs text-gray-500 font-light mt-1">
                  Walkthroughs of Miami areas & estates
                </div>
              </Link>

              <Link
                href="/#quiz"
                className="group p-3.5 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <div className="text-sm font-bold text-gray-800 group-hover:text-[#20c063] transition-colors">
                  🎯 Find Your Home
                </div>
                <div className="text-xs text-gray-500 font-light mt-1">
                  1-minute quiz matching your criteria
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer lang="en" />
    </div>
  );
}
