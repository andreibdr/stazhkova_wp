import fs from 'fs';
import path from 'path';

export interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  text: string;
  hidden: boolean;
  source: string;
}

export interface Guide {
  id: number;
  slug: string;
  lang: 'ru' | 'en' | 'es';
  title: string;
  excerpt: string;
  content: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  bedrooms: string;
  area: string;
  timeline: string;
  budget: string;
  lang: string;
  status: 'new' | 'contacted' | 'showing' | 'deal' | 'archived';
  notes: string;
}

export interface SiteSettings {
  adminPin: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsApp: string;
  zillowProfileUrl: string;
  zillowWriteReviewUrl: string;
  notifications: {
    emailEnabled: boolean;
    whatsappEnabled: boolean;
    telegramStubEnabled: boolean;
  };
}

const contentDir = path.join(process.cwd(), 'content');

export function getSettings(): SiteSettings {
  try {
    const file = path.join(contentDir, 'settings.json');
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading settings:', e);
  }
  return {
    adminPin: 'elena2026',
    contactEmail: 'elena@stazhkova.com',
    contactPhone: '+1-347-515-4087',
    contactWhatsApp: '+13475154087',
    zillowProfileUrl: 'https://www.zillow.com/profile/ElenaStazhkova',
    zillowWriteReviewUrl: 'https://www.zillow.com/reviews/write/?s=X1-ZU10z7apkel7i89_8i7yn',
    notifications: {
      emailEnabled: true,
      whatsappEnabled: true,
      telegramStubEnabled: false,
    },
  };
}

export function saveSettings(settings: SiteSettings) {
  const file = path.join(contentDir, 'settings.json');
  fs.writeFileSync(file, JSON.stringify(settings, null, 2), 'utf-8');
}

export function getAllReviews(includeHidden = false): Review[] {
  try {
    const file = path.join(contentDir, 'reviews.json');
    if (fs.existsSync(file)) {
      const reviews: Review[] = JSON.parse(fs.readFileSync(file, 'utf-8'));
      if (includeHidden) return reviews;
      return reviews.filter((r) => !r.hidden);
    }
  } catch (e) {
    console.error('Error reading reviews:', e);
  }
  return [];
}

export function saveReviews(reviews: Review[]) {
  const file = path.join(contentDir, 'reviews.json');
  fs.writeFileSync(file, JSON.stringify(reviews, null, 2), 'utf-8');
}

export function formatGuideContent(content: string): string {
  if (!content) return '';

  // 1. Replace Gutenberg wp:embed blocks with YouTube URL
  let html = content.replace(
    /<!--\s*wp:embed\s*\{[^}]*\"url\"\s*:\s*\"([^\"]+)\"[^}]*\}\s*-->\s*<figure[^>]*>\s*<div[^>]*>[\s\S]*?<\/div>\s*<\/figure>\s*<!--\s*\/wp:embed\s*-->/gi,
    (_, url) => {
      const match = url.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
      if (match) {
        return `<div class="my-8 aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black"><iframe src="https://www.youtube-nocookie.com/embed/${match[1]}" title="Elena Stazhkova Real Estate Guide Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="w-full h-full border-0" loading="lazy"></iframe></div>`;
      }
      return url;
    }
  );

  // 2. Replace any leftover wp-block-embed figure with YouTube
  html = html.replace(
    /<figure[^>]*class=\"[^\"]*wp-block-embed[^\"]*\"[^>]*>[\s\S]*?https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s\"\'<>]+\s*[\s\S]*?<\/figure>/gi,
    (fig) => {
      const match = fig.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
      if (match) {
        return `<div class="my-8 aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black"><iframe src="https://www.youtube-nocookie.com/embed/${match[1]}" title="Elena Stazhkova Real Estate Guide Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="w-full h-full border-0" loading="lazy"></iframe></div>`;
      }
      return fig;
    }
  );

  // 3. Replace standalone paragraphs containing a YouTube link
  html = html.replace(
    /<p>\s*(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s\"\'<>]+)\s*<\/p>/gi,
    (_, url) => {
      const match = url.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
      if (match) {
        return `<div class="my-8 aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black"><iframe src="https://www.youtube-nocookie.com/embed/${match[1]}" title="Elena Stazhkova Real Estate Guide Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="w-full h-full border-0" loading="lazy"></iframe></div>`;
      }
      return `<p>${url}</p>`;
    }
  );

  return html;
}

export function getGuides(lang?: string): Guide[] {
  try {
    const file = path.join(contentDir, 'guides.json');
    if (fs.existsSync(file)) {
      const guides: Guide[] = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const formatted = guides.map((g) => ({
        ...g,
        content: formatGuideContent(g.content),
      }));
      if (lang) {
        return formatted.filter((g) => g.lang === lang);
      }
      return formatted;
    }
  } catch (e) {
    console.error('Error reading guides:', e);
  }
  return [];
}

export function getGuideBySlug(slug: string, lang?: string): Guide | undefined {
  const guides = getGuides();
  const decoded = decodeURIComponent(slug);
  return guides.find(
    (g) =>
      (g.slug === slug || g.slug === decoded || decodeURIComponent(g.slug) === decoded) &&
      (!lang || g.lang === lang)
  );
}

export function getSiteContent(lang: 'ru' | 'en' | 'es' = 'ru') {
  try {
    const file = path.join(contentDir, 'content.json');
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
      return data[lang] || data['ru'];
    }
  } catch (e) {
    console.error('Error reading content:', e);
  }
  return null;
}

export function getLeads(): Lead[] {
  try {
    const file = path.join(contentDir, 'leads.json');
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading leads:', e);
  }
  return [];
}

export function saveLeads(leads: Lead[]) {
  const file = path.join(contentDir, 'leads.json');
  fs.writeFileSync(file, JSON.stringify(leads, null, 2), 'utf-8');
}

export function addLead(newLead: Omit<Lead, 'id' | 'createdAt' | 'status' | 'notes'>): Lead {
  const leads = getLeads();
  const created: Lead = {
    ...newLead,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
    notes: '',
  };
  leads.unshift(created);
  saveLeads(leads);
  return created;
}
