import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import SmartQuiz from '@/components/SmartQuiz';
import WorkWithElena from '@/components/WorkWithElena';
import AboutSection from '@/components/AboutSection';
import WhatNext from '@/components/WhatNext';
import GuidesPreview from '@/components/GuidesPreview';
import QuickBar from '@/components/QuickBar';
import Footer from '@/components/Footer';
import { getSiteContent, getAllReviews, getGuides } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Elena Stazhkova | Agente Inmobiliaria en Miami | Bienes Raíces Florida',
  description:
    'Encuentre la casa de sus sueños en el sur de Florida con Elena Stazhkova. Miami, Sunny Isles Beach, Aventura. Licencia de Florida #3352133.',
  alternates: {
    canonical: 'https://stazhkova.com/es',
    languages: {
      en: 'https://stazhkova.com',
      ru: 'https://stazhkova.com/ru',
      es: 'https://stazhkova.com/es',
      'x-default': 'https://stazhkova.com',
    },
  },
};

export default async function SpanishHomePage() {
  const lang = 'es';
  const content = getSiteContent(lang);
  const reviews = getAllReviews(false);
  const guides = getGuides(lang);

  return (
    <>
      <Navbar lang={lang} />
      <main className="flex-1">
        <Hero content={content} lang={lang} />
        <ReviewsCarousel reviews={reviews} data={content.reviews_section} />
        <SmartQuiz quizData={content.quiz} transitionData={content.transition} lang={lang} />
        <WorkWithElena data={content.work_with_elena} />
        <AboutSection data={content.about_elena} />
        <WhatNext data={content.what_next} />
        <GuidesPreview guides={guides} lang={lang} />
      </main>
      <QuickBar lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
