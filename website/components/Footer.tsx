'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  lang: 'ru' | 'en' | 'es';
}

export default function Footer({ lang }: FooterProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Elena Stazhkova',
    image: 'https://stazhkova.com/images/lena-4.png',
    url: 'https://stazhkova.com',
    telephone: '+1-347-515-4087',
    email: 'elena@stazhkova.com',
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
      'https://www.zillow.com/profile/ElenaStazhkova',
      'https://www.instagram.com/elena_realestate_miami',
      'https://www.facebook.com/ElenaStazhkovaMiami',
    ],
  };

  return (
    <footer className="bg-[#1f201d] text-white pt-12 pb-20 sm:pb-10 border-t border-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-8 border-b border-gray-800">
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

          {/* Social Profiles */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase text-white mb-4">
              {lang === 'ru' ? 'Профили' : lang === 'es' ? 'Perfiles' : 'Profiles'}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <div>
                <a
                  href="https://www.zillow.com/profile/ElenaStazhkova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#20c063] transition-colors"
                >
                  Zillow Premier Agent (5.0 ★)
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/elena_realestate_miami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#20c063] transition-colors"
                >
                  Instagram @elena_realestate_miami
                </a>
              </div>
              <div>
                <a
                  href="https://www.facebook.com/ElenaStazhkovaMiami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#20c063] transition-colors"
                >
                  Facebook Page
                </a>
              </div>
              <div>
                <a
                  href="https://wa.me/13475154087"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#20c063] transition-colors text-emerald-400 font-semibold"
                >
                  WhatsApp Direct Chat
                </a>
              </div>
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
        <div className="pt-6 text-center text-xs text-gray-400">
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
