import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AudienceSection from '@/components/AudienceSection';
import ProcessSection from '@/components/ProcessSection';
import SmartQuiz from '@/components/SmartQuiz';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import AboutSection from '@/components/AboutSection';
import AreasSection from '@/components/AreasSection';
import GuidesPreview from '@/components/GuidesPreview';
import QuickBar from '@/components/QuickBar';
import Footer from '@/components/Footer';
import { getSiteContent, getAllReviews, getGuides, getSettings } from '@/lib/content';

export default function HomePage() {
  const lang = 'en';
  const content = getSiteContent(lang);
  const reviews = getAllReviews(false);
  const guides = getGuides(lang);
  const settings = getSettings();

  return (
    <>
      <Navbar lang={lang} />
      <main className="flex-1">
        <Hero content={content} lang={lang} />
        <AudienceSection data={content.target_audience} />
        <SmartQuiz quizData={content.quiz} lang={lang} />
        <ReviewsCarousel reviews={reviews} data={content.reviews_section} settings={settings} />
        <ProcessSection data={content.steps} />
        <AboutSection data={content.about} lang={lang} />
        <AreasSection data={content.areas} />
        <GuidesPreview guides={guides} lang={lang} />
      </main>
      <QuickBar lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
