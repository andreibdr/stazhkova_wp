import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuickBar from '@/components/QuickBar';
import { getGuideBySlug, getGuides } from '@/lib/content';
import { ArrowLeft, MessageCircle, User, ShieldCheck } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getGuides('en');
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug, 'en');
  if (!guide) return { title: 'Guide Not Found' };

  const baseUrl = 'https://stazhkova.com';
  const currentUrl = `${baseUrl}/guides/${guide.slug}`;

  // Find matching guide translations by step
  const allGuides = getGuides();
  const step = guide.step;
  const matchingEn = allGuides.find((g) => g.lang === 'en' && g.step === step);
  const matchingRu = allGuides.find((g) => g.lang === 'ru' && g.step === step);
  const matchingEs = allGuides.find((g) => g.lang === 'es' && g.step === step);

  const languages: Record<string, string> = {};
  if (matchingEn) {
    languages.en = `${baseUrl}/guides/${matchingEn.slug}`;
    languages['x-default'] = `${baseUrl}/guides/${matchingEn.slug}`;
  }
  if (matchingRu) {
    languages.ru = `${baseUrl}/ru/guides/${encodeURIComponent(matchingRu.slug)}`;
  }
  if (matchingEs) {
    languages.es = `${baseUrl}/es/guides/${encodeURIComponent(matchingEs.slug)}`;
  }

  const imageUrl = guide.image ? (guide.image.startsWith('http') ? guide.image : `${baseUrl}${guide.image}`) : undefined;

  return {
    title: `${guide.title} | Elena Stazhkova Guide`,
    description: guide.excerpt,
    alternates: {
      canonical: currentUrl,
      languages: Object.keys(languages).length > 0 ? languages : undefined,
    },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: 'article',
      url: currentUrl,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: guide.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.excerpt,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug, 'en');
  if (!guide) notFound();

  const baseUrl = 'https://stazhkova.com';
  const currentUrl = `${baseUrl}/guides/${guide.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    image: guide.image ? `${baseUrl}${guide.image}` : undefined,
    author: {
      '@type': 'Person',
      name: 'Elena Stazhkova',
      jobTitle: 'Licensed Real Estate Agent',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Big Data Realty',
      url: 'https://bigdatarealty.com',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo_dark_transparent.webp`,
      },
    },
    mainEntityOfPage: currentUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${baseUrl}/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: currentUrl,
      },
    ],
  };

  const allGuides = getGuides('en');
  const currentIndex = allGuides.findIndex((g) => g.id === guide.id);
  const nextGuide = currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;
  const prevGuide = currentIndex > 0 ? allGuides[currentIndex - 1] : null;

  const allGuidesCatalog = getGuides();
  const step = guide.step;
  const matchingEn = allGuidesCatalog.find((g) => g.lang === 'en' && g.step === step);
  const matchingRu = allGuidesCatalog.find((g) => g.lang === 'ru' && g.step === step);
  const matchingEs = allGuidesCatalog.find((g) => g.lang === 'es' && g.step === step);

  const alternateUrls = {
    en: matchingEn ? `/guides/${matchingEn.slug}` : '/guides',
    ru: matchingRu ? `/ru/guides/${encodeURIComponent(matchingRu.slug)}` : '/ru/guides',
    es: matchingEs ? `/es/guides/${encodeURIComponent(matchingEs.slug)}` : '/es/guides',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar lang="en" alternateUrls={alternateUrls} />
      <main className="flex-1 py-16 bg-[#f7fbfc]">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Buyer Guides</span>
          </Link>

          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-gray-100 mb-8 overflow-hidden">
            {guide.image && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 shadow-sm">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-500 mb-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Guide • Step {guide.step || currentIndex + 1}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Elena Stazhkova
                </span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full">
                <Link
                  href={alternateUrls.en}
                  className="px-2.5 py-0.5 rounded-full bg-[#20c063] text-white shadow-xs font-bold"
                >
                  EN
                </Link>
                <Link
                  href={alternateUrls.ru}
                  className="px-2.5 py-0.5 rounded-full text-gray-600 hover:text-black font-medium transition-colors"
                >
                  RU
                </Link>
                <Link
                  href={alternateUrls.es}
                  className="px-2.5 py-0.5 rounded-full text-gray-600 hover:text-black font-medium transition-colors"
                >
                  ES
                </Link>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#31312c] tracking-tight mb-8">
              {guide.title}
            </h1>

            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />

            <div className="mt-12 p-8 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-lg text-emerald-950">
                  Questions about this step?
                </h3>
                <p className="text-sm text-emerald-800 font-light mt-1">
                  Connect with Elena for a personalized consultation or tailored property search.
                </p>
              </div>
              <a
                href="https://wa.me/13475154087"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all shrink-0"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-10 mt-10 border-t border-gray-100">
              {prevGuide ? (
                <Link
                  href={`/guides/${prevGuide.slug}`}
                  className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#20c063] transition-colors"
                >
                  ← Previous Step
                </Link>
              ) : (
                <div />
              )}
              {nextGuide && (
                <Link
                  href={`/guides/${nextGuide.slug}`}
                  className="text-xs sm:text-sm font-semibold text-[#20c063] hover:text-[#1aa654] transition-colors"
                >
                  Next Step →
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>
      <QuickBar lang="en" />
      <Footer lang="en" />
    </>
  );
}
