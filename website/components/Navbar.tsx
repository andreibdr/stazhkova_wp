'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';

interface NavbarProps {
  lang: 'ru' | 'en' | 'es';
}

export default function Navbar({ lang }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLabels = {
    ru: {
      about: 'О Елене',
      work: 'Работаем с Еленой',
      reviews: 'Отзывы',
      guides: 'Гайды',
      video: 'Видео',
      findHome: 'Найти мой дом',
    },
    en: {
      about: 'About Elena',
      work: 'Work with Elena',
      reviews: 'Reviews',
      guides: 'Guides',
      video: 'Video',
      findHome: 'Find My Home',
    },
    es: {
      about: 'Sobre Elena',
      work: 'Trabaja con Elena',
      reviews: 'Reseñas',
      guides: 'Guías',
      video: 'Video',
      findHome: 'Encuéntrame mi casa',
    },
  }[lang];

  const langLinks = {
    ru: '/ru',
    en: '/',
    es: '/es',
  };

  const guidesLink = lang === 'en' ? '/guides' : `/${lang}/guides`;
  const videoLink = lang === 'en' ? '/video' : `/${lang}/video`;

  const setLangCookie = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Brand Logo */}
          <Link href={langLinks[lang]} className="flex items-center">
            <div className="relative w-48 sm:w-60 h-12 sm:h-14">
              <Image
                src="/images/logo_light_transparent.webp"
                alt="Elena Stazhkova Real Estate"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
            <a href="#about" className="hover:text-[#20c063] transition-colors">
              {navLabels.about}
            </a>
            <a href="#workelena" className="hover:text-[#20c063] transition-colors">
              {navLabels.work}
            </a>
            <a href="#reviews" className="hover:text-[#20c063] transition-colors">
              {navLabels.reviews}
            </a>
            <Link href={guidesLink} className="hover:text-[#20c063] transition-colors">
              {navLabels.guides}
            </Link>
            <Link href={videoLink} className="hover:text-[#20c063] transition-colors">
              {navLabels.video}
            </Link>
          </nav>

          {/* Actions & Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            {/* Lang switcher */}
            <div className="flex items-center bg-gray-100 rounded-full p-1 text-xs font-semibold">
              <Link
                href="/ru"
                onClick={() => setLangCookie('ru')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'ru' ? 'bg-[#20c063] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                RU
              </Link>
              <Link
                href="/"
                onClick={() => setLangCookie('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'en' ? 'bg-[#20c063] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                EN
              </Link>
              <Link
                href="/es"
                onClick={() => setLangCookie('es')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'es' ? 'bg-[#20c063] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                ES
              </Link>
            </div>

            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/13475154087"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-emerald-50 transition-colors"
              title="WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25d366]" />
            </a>

            {/* Direct Call Button */}
            <a
              href="tel:+13475154087"
              className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-[#20c063] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#20c063]" />
              <span>+1 (347) 515-4087</span>
            </a>

            {/* CTA Button */}
            <a
              href="#findmyhome"
              className="px-5 py-2.5 bg-[#20c063] hover:bg-[#1aa654] text-white text-sm font-semibold rounded-xl shadow-xs transition-all hover:shadow-md"
            >
              {navLabels.findHome}
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-semibold">
              <Link
                href="/ru"
                onClick={() => setLangCookie('ru')}
                className={`px-2 py-0.5 rounded-full ${lang === 'ru' ? 'bg-[#20c063] text-white' : 'text-gray-600'}`}
              >
                RU
              </Link>
              <Link
                href="/"
                onClick={() => setLangCookie('en')}
                className={`px-2 py-0.5 rounded-full ${lang === 'en' ? 'bg-[#20c063] text-white' : 'text-gray-600'}`}
              >
                EN
              </Link>
              <Link
                href="/es"
                onClick={() => setLangCookie('es')}
                className={`px-2 py-0.5 rounded-full ${lang === 'es' ? 'bg-[#20c063] text-white' : 'text-gray-600'}`}
              >
                ES
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-black"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-[#20c063]"
          >
            {navLabels.about}
          </a>
          <a
            href="#workelena"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-[#20c063]"
          >
            {navLabels.work}
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-[#20c063]"
          >
            {navLabels.reviews}
          </a>
          <Link
            href={guidesLink}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-[#20c063]"
          >
            {navLabels.guides}
          </Link>
          <Link
            href={videoLink}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-[#20c063]"
          >
            {navLabels.video}
          </Link>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <a
              href="tel:+13475154087"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-100 text-gray-800 rounded-xl font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-[#20c063]" />
              +1 (347) 515-4087
            </a>
            <a
              href="#findmyhome"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 bg-[#20c063] text-white rounded-xl font-semibold text-sm"
            >
              {navLabels.findHome}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
