'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import {
  LinkedInIcon,
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
  ZillowIcon,
  WhatsAppIcon,
} from '@/components/icons/SocialIcons';

interface FooterProps {
  lang: 'ru' | 'en' | 'es';
}

export default function Footer({ lang }: FooterProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Elena Stazhkova',
    image: 'https://stazhkova.com/images/lena-4.webp',
    url: 'https://stazhkova.com',
    telephone: '+1-347-515-4087',
    email: 'elena@stazhkova.com',
    parentOrganization: {
      '@type': 'RealEstateAgency',
      name: 'Big Data Realty',
      url: 'https://bigdatarealty.com/',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Aventura',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.9582,
      longitude: -80.1395,
    },
    priceRange: '$$$',
    areaServed: [
      'Miami',
      'Aventura',
      'Hollywood',
      'Hallandale Beach',
      'Sunny Isles Beach',
      'Fort Lauderdale',
    ],
    speaksLanguage: ['Russian', 'English', 'Spanish'],
    license: '3352133',
    sameAs: [
      'https://www.linkedin.com/in/stazhkova-elena/',
      'https://www.instagram.com/elena_realestate_miami/',
      'https://www.youtube.com/@ElenaStazhkova',
      'https://www.facebook.com/ElenaStazhkovaMiami',
      'https://www.zillow.com/profile/ElenaStazhkova',
    ],
  };

  return (
    <footer className="bg-[#1f201d] text-white pt-10 pb-14 sm:pb-6 border-t border-white/[0.06] relative overflow-hidden">
      {/* Background Florida Skyline watermark — 0 added height */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden flex justify-center z-0 opacity-[0.035]">
        <Image
          src="/images/miami-skyline-silhouette-white.png"
          alt=""
          width={1332}
          height={350}
          className="w-full max-w-5xl h-auto object-contain object-bottom"
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-4">
          {/* Brand Col */}
          <div className="space-y-4">
            {/* Official Logo on Dark Footer */}
            <div className="relative w-56 h-14 sm:w-60 sm:h-16">
              <Image
                src="/images/logo_dark_transparent.webp"
                alt="Elena Stazhkova Real Estate"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              {lang === 'ru'
                ? 'Профессиональный подбор и сопровождение сделок с недвижимостью в Майами и Южной Флориде. Инвестиционный консалтинг.'
                : lang === 'es'
                ? 'Asesoramiento y compra de bienes raíces residenciales y de inversión en Miami y el sur de Florida.'
                : 'Premier residential & investment real estate advisory in Miami and South Florida.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-[#20c063]" />
              <span>Florida License #3352133</span>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase text-white mb-4">
              {lang === 'ru' ? 'Контакты' : lang === 'es' ? 'Contacto' : 'Contact'}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-300 font-light">
              <a
                href="tel:+13475154087"
                className="flex items-center gap-2.5 hover:text-[#20c063] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#20c063]" />
                <span>+1 (347) 515-4087</span>
              </a>
              <a
                href="mailto:elena@stazhkova.com"
                className="flex items-center gap-2.5 hover:text-[#20c063] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#20c063]" />
                <span>elena@stazhkova.com</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#20c063]" />
                <span>Aventura & Miami, FL, USA</span>
              </div>
            </div>
          </div>

          {/* Social Profiles with Icons Row + Zillow & WhatsApp */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase text-white mb-4">
              {lang === 'ru' ? 'Соцсети и Профили' : lang === 'es' ? 'Perfiles Sociales' : 'Social Profiles'}
            </h4>

            {/* Social Icons in a Row without text */}
            <div className="flex items-center gap-2.5 mb-4">
              <a
                href="https://www.linkedin.com/in/stazhkova-elena/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-gray-800 text-gray-300 hover:bg-[#0a66c2] hover:text-white flex items-center justify-center transition-all shadow-xs"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/elena_realestate_miami/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-gray-800 text-gray-300 hover:bg-[#e4405f] hover:text-white flex items-center justify-center transition-all shadow-xs"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.youtube.com/@ElenaStazhkova"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube @ElenaStazhkova"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-gray-800 text-gray-300 hover:bg-[#ff0000] hover:text-white flex items-center justify-center transition-all shadow-xs"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/ElenaStazhkovaMiami"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-gray-800 text-gray-300 hover:bg-[#1877f2] hover:text-white flex items-center justify-center transition-all shadow-xs"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Zillow and WhatsApp with text */}
            <div className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <a
                href="https://www.zillow.com/profile/ElenaStazhkova"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#006aff] transition-colors group"
              >
                <span className="p-1.5 rounded-lg bg-gray-800 text-gray-300 group-hover:bg-[#006aff] group-hover:text-white transition-all">
                  <ZillowIcon className="w-4 h-4" />
                </span>
                <span>Zillow Premier Agent (5.0 ★)</span>
              </a>

              <a
                href="https://wa.me/13475154087"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#25d366] transition-colors group text-emerald-400 font-medium"
              >
                <span className="p-1.5 rounded-lg bg-gray-800 text-emerald-400 group-hover:bg-[#25d366] group-hover:text-white transition-all">
                  <WhatsAppIcon className="w-4 h-4" />
                </span>
                <span>WhatsApp Direct Chat</span>
              </a>
            </div>
          </div>

          {/* Areas Served */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase text-white mb-4">
              {lang === 'ru' ? 'Локации' : lang === 'es' ? 'Zonas' : 'Areas'}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Sunny Isles Beach, Aventura, Miami Beach, Brickell, Bal Harbour,
              Hollywood, Hallandale Beach, Fort Lauderdale.
            </p>
          </div>
        </div>

        {/* Copyright Centered */}
        <div className="pt-2 text-center text-xs text-gray-400">
          <p>
            Copyright 2025-2026 | Big Data Realty. All Rights Reserved | Made by{' '}
            <a
              href="https://fewhands.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#20c063] underline underline-offset-2 transition-colors"
            >
              fewhands.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
