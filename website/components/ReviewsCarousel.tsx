'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote } from 'lucide-react';
import { Review } from '@/lib/content';

interface ReviewsProps {
  reviews: Review[];
  data: any;
  settings?: any;
}

export default function ReviewsCarousel({ reviews, data, settings }: ReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only visible reviews
  const activeReviews = reviews.filter((r) => !r.hidden);

  if (activeReviews.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activeReviews.length - 1 ? 0 : prev + 1));
  };

  const current = activeReviews[currentIndex];
  const zillowProfile = settings?.zillowProfileUrl || 'https://www.zillow.com/profile/ElenaStazhkova';
  const zillowWrite =
    settings?.zillowWriteReviewUrl ||
    'https://www.zillow.com/reviews/write/?s=X1-ZU10z7apkel7i89_8i7yn';

  return (
    <section id="reviews" className="py-20 bg-[#f7fbfc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                Zillow Verified
              </span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-700">5.0 / 5.0</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#31312c] tracking-tight">
              {data.title}
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-xl">
              {data.subtitle}
            </p>
          </div>

          {/* Links to Zillow */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={zillowProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-xs"
            >
              <span>{data.view_zillow}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={zillowWrite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <span>{data.write_review}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Carousel Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100 relative">
          <Quote className="w-16 h-16 text-emerald-100 absolute top-6 right-6 -rotate-12 pointer-events-none" />

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-500">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-400">
              • {current.date}
            </span>
          </div>

          <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-light italic mb-8 relative z-10">
            &ldquo;{current.text}&rdquo;
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div>
              <div className="font-bold text-gray-900 text-base">
                {current.author}
              </div>
              <div className="text-xs text-emerald-600 font-medium">
                Verified Client Review on Zillow
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 mr-2">
                {currentIndex + 1} / {activeReviews.length}
              </span>
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
