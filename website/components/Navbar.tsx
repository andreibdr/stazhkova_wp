'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';
import LangSetter from '@/components/LangSetter';

interface NavbarProps {
  lang: 'ru' | 'en' | 'es';
}

export default function Navbar({ lang }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLabels = {
    ru: {
      about: 'Обо мне',
      work: 'Как я работаю',
      reviews: 'Отзывы',
      guides: 'Гайды',
      video: 'Видео',
      findHome: 'Найти мой дом',
    },
    en: {
      about: 'About Me',
      work: 'Work with Me',
      reviews: 'Reviews',
      guides: 'Guides',
      video: 'Video',
      findHome: 'Find My Home',
    },
    es: {
      about: 'Sobre mí',
      work: 'Cómo trabajo',
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

  const homePath = lang === 'en' ? '/' : `/${lang}`;
  const aboutLink = `${homePath}#about`;
  const workLink = `${homePath}#workelena`;
  const reviewsLink = `${homePath}#reviews`;
  const findHomeLink = `${homePath}#findmyhome`;

  const handleAnchorClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const pathname = usePathname() || '';

  const getTargetUrl = (targetLang: 'en' | 'ru' | 'es') => {
    let sub = '';
    if (pathname.includes('/guides')) sub = '/guides';
    else if (pathname.includes('/video')) sub = '/video';

    if (targetLang === 'en') {
      return (sub || '/') + '?lang=en';
    }
    return `/${targetLang}${sub || ''}?lang=${targetLang}`;
  };

  const setLangCookie = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <LangSetter lang={lang} />
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
            <Link href={aboutLink} className="hover:text-[#20c063] transition-colors">
              {navLabels.about}
            </Link>
            <Link href={workLink} className="hover:text-[#20c063] transition-colors">
              {navLabels.work}
            </Link>
            <Link href={reviewsLink} className="hover:text-[#20c063] transition-colors">
              {navLabels.reviews}
            </Link>
            <Link href={guidesLink} className="hover:text-[#20c063] transition-colors">
              {navLabels.guides}
            </Link>
            <Link href={videoLink} className="hover:text-[#20c063] transition-colors">
              {navLabels.video}
            </Link>
          </nav>

          {/* Actions & Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            {/* Lang switcher: EN | RU | ES */}
            <div className="flex items-center bg-gray-100 rounded-full p-1 text-xs font-semibold">
              <Link
                href={getTargetUrl('en')}
                onClick={() => setLangCookie('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'en' ? 'bg-[#20c063] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                EN
              </Link>
              <Link
                href={getTargetUrl('ru')}
                onClick={() => setLangCookie('ru')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'ru' ? 'bg-[#20c063] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                RU
              </Link>
              <Link
                href={getTargetUrl('es')}
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
            <Link
              href={findHomeLink}
              onClick={handleAnchorClick('findmyhome')}
              className="px-5 py-2.5 bg-[#20c063] hover:bg-[#1aa654] text-white text-sm font-semibold rounded-xl shadow-xs transition-all hover:shadow-md"
            >
              {navLabels.findHome}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-semibold">
              <Link
                href={getTargetUrl('en')}
                onClick={() => setLangCookie('en')}
                className={`px-2 py-0.5 rounded-full ${lang === 'en' ? 'bg-[#20c063] text-white' : 'text-gray-600'}`}
              >
                EN
              </Link>
              <Link
                href={getTargetUrl('ru')}
                onClick={() => setLangCookie('ru')}
                className={`px-2 py-0.5 rounded-full ${lang === 'ru' ? 'bg-[#20c063] text-white' : 'text-gray-600'}`}
              >
                RU
              </Link>
              <Link
                href={getTargetUrl('es')}
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
          <Link
            href={aboutLink}
            onClick={handleAnchorClick('about')}
            className="block py-2 text-base font-medium text-gray-700 hover:text-[#20c063]"
          >
            {navLabels.about}
          </Link>
          <Link
            href={workLink}
            onClick={handleAnchorClick('workelena')}
            className="block py-2 text-base font-medium text-gray-700 hover:text-[#20c063]"
          >
            {navLabels.work}
          </Link>
          <Link
            href={reviewsLink}
            onClick={handleAnchorClick('reviews')}
            className="block py-2 text-base font-medium text-gray-700 hover:text-[#20c063]"
          >
            {navLabels.reviews}
          </Link>
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
            <Link
              href={findHomeLink}
              onClick={handleAnchorClick('findmyhome')}
              className="flex items-center justify-center w-full py-2.5 bg-[#20c063] text-white rounded-xl font-semibold text-sm"
            >
              {navLabels.findHome}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
