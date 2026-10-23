import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import SmartQuiz from '@/components/SmartQuiz';
import WorkWithElena from '@/components/WorkWithElena';
import AboutSection from '@/components/AboutSection';
import WhatNext from '@/components/WhatNext';
import GuidesPreview from '@/components/GuidesPreview';
import VideosPreview from '@/components/VideosPreview';
import QuickBar from '@/components/QuickBar';
import Footer from '@/components/Footer';
import { getSiteContent, getAllReviews, getGuides } from '@/lib/content';
import { getChannelVideos } from '@/lib/youtube';

export default async function HomePage() {
  const lang = 'en';
  const content = getSiteContent(lang);
  const reviews = getAllReviews(false);
  const guides = getGuides(lang);
  const videos = await getChannelVideos();

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
        <VideosPreview videos={videos} lang={lang} />
        <GuidesPreview guides={guides} lang={lang} />
      </main>
      <QuickBar lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
