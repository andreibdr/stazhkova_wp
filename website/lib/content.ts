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

export function getGuides(lang?: string): Guide[] {
  try {
    const file = path.join(contentDir, 'guides.json');
    if (fs.existsSync(file)) {
      const guides: Guide[] = JSON.parse(fs.readFileSync(file, 'utf-8'));
      if (lang) {
        return guides.filter((g) => g.lang === lang);
      }
      return guides;
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
