'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Review } from '@/lib/content';

interface ReviewsProps {
  reviews: Review[];
  data: any;
  settings?: any;
}

export default function ReviewsCarousel({ reviews, data }: ReviewsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedIds, setExpandedIds] = useState<{ [key: number]: boolean }>({});

  const activeReviews = reviews.filter((r) => !r.hidden);
  if (activeReviews.length === 0) return null;

  const pageSize = 6; // 2 rows x 3 columns = 6 reviews per slide
  const totalPages = Math.ceil(activeReviews.length / pageSize);

  const currentReviews = activeReviews.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[#31312c]">
            {data.title_accent ? (
              <>
                <span className="font-bold text-[#20c063]">{data.title_accent} </span>
                <span className="font-light text-[#31312c]">{data.title_main}</span>
              </>
            ) : (
              <>
                <span className="font-light text-[#31312c]">{data.title_main} </span>
                <span className="font-bold text-[#20c063]">{data.title_accent}</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 font-light max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Carousel Grid with Side Navigation Buttons */}
        <div className="relative px-2 sm:px-8">
          {/* Left Arrow Button */}
          {totalPages > 1 && (
            <button
              onClick={handlePrev}
              className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-all shadow-sm"
              aria-label="Previous Reviews"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow Button */}
          {totalPages > 1 && (
            <button
              onClick={handleNext}
              className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-all shadow-sm"
              aria-label="Next Reviews"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* 2 Rows x 3 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {currentReviews.map((rev) => {
              const isExpanded = Boolean(expandedIds[rev.id]);
              const isLong = rev.text.length > 170;
              const displayText =
                isLong && !isExpanded ? rev.text.substring(0, 170) + '...' : rev.text;

              return (
                <div key={rev.id} className="flex flex-col items-start">
                  {/* Speech Bubble Container */}
                  <div className="relative w-full bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col justify-between min-h-[220px]">
                    <div>
                      {/* Top Header inside bubble: Quotes + Stars */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-gray-300 text-2xl font-serif leading-none select-none">
                          ““
                        </span>
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-gray-600 italic font-light leading-relaxed">
                        {displayText}{' '}
                        {isLong && (
                          <button
                            onClick={() => toggleExpand(rev.id)}
                            className="text-xs text-gray-500 font-medium hover:text-[#20c063] underline inline-block ml-1"
                          >
                            {isExpanded ? 'Show Less' : 'Show More'}
                          </button>
                        )}
                      </p>
                    </div>

                    {/* Bottom Right: Blue Zillow Logo */}
                    <div className="flex justify-end mt-4">
                      <div className="w-7 h-7 flex items-center justify-center text-[#1277e1]" title="Zillow">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path d="M12 2L2 10.5h3v9.5h14v-9.5h3L12 2zm2.5 14.5h-5v-1.8l3.1-3.7H9.5v-1.5h5v1.8l-3.1 3.7h3.1v1.5z" />
                        </svg>
                      </div>
                    </div>

                    {/* Speech Bubble Tail (Triangle pointing down) */}
                    <div
                      className="absolute -bottom-2.5 left-10 w-0 h-0"
                      style={{
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderTop: '11px solid #ffffff',
                        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.06))',
                      }}
                    />
                  </div>

                  {/* Author Name Under the Speech Bubble Tail */}
                  <div className="mt-4 pl-8">
                    <span className="text-xs font-bold text-gray-800 tracking-wider uppercase">
                      {rev.author}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPage === idx
                      ? 'bg-gray-700 w-3'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
