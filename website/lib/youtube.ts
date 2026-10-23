export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
  lang?: 'ru' | 'en' | 'es';
}

const RU_KNOWN_IDS = new Set([
  '3mifT9bNjE8',
  'zJqlwuYgRgI',
  'pYq4n1lDFso',
  'C6sbrM5hC1s',
  'ym7nZqRJlRU',
  'qU4AM2XA4WA',
  'U5VhAjx_-yY',
  '4IwSwjueHfI',
  'lF5eFpl1Jlw',
  'Eb1cmTQ4YFM',
  '7N6h6Uwdi-Q',
  'dpSZeL44cBM',
]);

const ES_KNOWN_IDS = new Set([
  'WIhazGjB8fE',
  'seu1jCnw158',
  'Qe21v8SQPB4',
  'asABOhFGbeU',
  '_RWhTFVAcvQ',
  '8F5jiNHZHr8',
  'WlCS5KNYxnk',
  'gkt16e81qhU',
]);

// Curated catalog of Elena's channel videos by language
export const BASE_CATALOG: Record<'ru' | 'en' | 'es', YouTubeVideo[]> = {
  ru: [
    {
      id: '3mifT9bNjE8',
      title: 'Golden Gate Estates & Marina Sunny Isles Beach 2026 — закрытое комьюнити с причалами',
      published: '2026-03-01',
      thumbnail: 'https://i.ytimg.com/vi/3mifT9bNjE8/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=3mifT9bNjE8',
      lang: 'ru',
    },
    {
      id: 'zJqlwuYgRgI',
      title: 'Greenview at Presidential: Почему здесь покупают, пока Майами стоит в пробках?',
      published: '2026-02-10',
      thumbnail: 'https://i.ytimg.com/vi/zJqlwuYgRgI/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=zJqlwuYgRgI',
      lang: 'ru',
    },
    {
      id: 'pYq4n1lDFso',
      title: 'Poinciana Island Майами: дом с причалом у океана — цены, инфраструктура, рынок',
      published: '2026-03-15',
      thumbnail: 'https://i.ytimg.com/vi/pYq4n1lDFso/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=pYq4n1lDFso',
      lang: 'ru',
    },
    {
      id: 'C6sbrM5hC1s',
      title: 'Aventura Isles в Майами | Почему это самый топовый гейтед коммьюнити?',
      published: '2026-04-05',
      thumbnail: 'https://i.ytimg.com/vi/C6sbrM5hC1s/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=C6sbrM5hC1s',
      lang: 'ru',
    },
    {
      id: 'ym7nZqRJlRU',
      title: 'Как выбрать школу и не переплатить за жильё в Южной Флориде',
      published: '2026-01-20',
      thumbnail: 'https://i.ytimg.com/vi/ym7nZqRJlRU/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=ym7nZqRJlRU',
      lang: 'ru',
    },
    {
      id: 'qU4AM2XA4WA',
      title: 'Закрытие сделки в Майами: HOA, титул, расходы и ключи!',
      published: '2025-12-15',
      thumbnail: 'https://i.ytimg.com/vi/qU4AM2XA4WA/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=qU4AM2XA4WA',
      lang: 'ru',
    },
    {
      id: 'U5VhAjx_-yY',
      title: 'Финальное одобрение ипотеки в США: ставка, оценка, страховка',
      published: '2025-12-01',
      thumbnail: 'https://i.ytimg.com/vi/U5VhAjx_-yY/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=U5VhAjx_-yY',
      lang: 'ru',
    },
    {
      id: '4IwSwjueHfI',
      title: 'Как пройти инспекцию в Майами без ошибок',
      published: '2025-11-20',
      thumbnail: 'https://i.ytimg.com/vi/4IwSwjueHfI/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=4IwSwjueHfI',
      lang: 'ru',
    },
    {
      id: 'lF5eFpl1Jlw',
      title: 'Подача предложения: депозит, эскроу и договор',
      published: '2025-11-10',
      thumbnail: 'https://i.ytimg.com/vi/lF5eFpl1Jlw/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=lF5eFpl1Jlw',
      lang: 'ru',
    },
    {
      id: 'Eb1cmTQ4YFM',
      title: 'Как выбрать риэлтора в Майами: опыт и стратегия',
      published: '2025-10-25',
      thumbnail: 'https://i.ytimg.com/vi/Eb1cmTQ4YFM/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=Eb1cmTQ4YFM',
      lang: 'ru',
    },
    {
      id: '7N6h6Uwdi-Q',
      title: 'Покупка в Майами: бюджет, предодобрение кредита и POF',
      published: '2025-10-15',
      thumbnail: 'https://i.ytimg.com/vi/7N6h6Uwdi-Q/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=7N6h6Uwdi-Q',
      lang: 'ru',
    },
    {
      id: 'dpSZeL44cBM',
      title: 'Пошаговая схема покупки жилья в США: от выбора до ключей',
      published: '2025-10-01',
      thumbnail: 'https://i.ytimg.com/vi/dpSZeL44cBM/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=dpSZeL44cBM',
      lang: 'ru',
    },
  ],
  es: [
    {
      id: 'WIhazGjB8fE',
      title: 'Greenview at Presidential Aventura 2026: Casas Nuevas de Lujo',
      published: '2026-02-17',
      thumbnail: 'https://i.ytimg.com/vi/WIhazGjB8fE/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=WIhazGjB8fE',
      lang: 'es',
    },
    {
      id: 'gkt16e81qhU',
      title: 'Cierre en Miami: seguro de título, aprobación HOA, walkthrough y llaves',
      published: '2025-12-15',
      thumbnail: 'https://i.ytimg.com/vi/gkt16e81qhU/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=gkt16e81qhU',
      lang: 'es',
    },
    {
      id: 'WlCS5KNYxnk',
      title: 'Aprobación final en Miami: Loan Estimate, Rate Lock y tasación',
      published: '2025-12-01',
      thumbnail: 'https://i.ytimg.com/vi/WlCS5KNYxnk/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=WlCS5KNYxnk',
      lang: 'es',
    },
    {
      id: '8F5jiNHZHr8',
      title: 'Inspección de vivienda en Miami: tipos, informes y negociación',
      published: '2025-11-20',
      thumbnail: 'https://i.ytimg.com/vi/8F5jiNHZHr8/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=8F5jiNHZHr8',
      lang: 'es',
    },
    {
      id: '_RWhTFVAcvQ',
      title: 'Cómo presentar una oferta en Miami: contrato, contraoferta y escrow',
      published: '2025-11-10',
      thumbnail: 'https://i.ytimg.com/vi/_RWhTFVAcvQ/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=_RWhTFVAcvQ',
      lang: 'es',
    },
    {
      id: 'asABOhFGbeU',
      title: 'Cómo elegir un agente en Miami: acceso MLS, experiencia y estrategia',
      published: '2025-10-25',
      thumbnail: 'https://i.ytimg.com/vi/asABOhFGbeU/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=asABOhFGbeU',
      lang: 'es',
    },
    {
      id: 'Qe21v8SQPB4',
      title: 'Pre-aprobación hipotecaria y POF: primer paso del comprador en Miami',
      published: '2025-10-15',
      thumbnail: 'https://i.ytimg.com/vi/Qe21v8SQPB4/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=Qe21v8SQPB4',
      lang: 'es',
    },
    {
      id: 'seu1jCnw158',
      title: 'Guía rápida para tener las llaves de tu nuevo hogar',
      published: '2025-10-01',
      thumbnail: 'https://i.ytimg.com/vi/seu1jCnw158/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=seu1jCnw158',
      lang: 'es',
    },
  ],
  en: [
    {
      id: 'MOB2LSCgWXE',
      title: 'Florida Homestead Exemption and the Buyer Tax Reset',
      published: '2026-08-08',
      thumbnail: 'https://i.ytimg.com/vi/MOB2LSCgWXE/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=MOB2LSCgWXE',
      lang: 'en',
    },
    {
      id: '4QQX9tDdrnE',
      title: 'St. Tropez Market Intelligence | Patience Gives You Negotiation Leverage',
      published: '2026-07-10',
      thumbnail: 'https://i.ytimg.com/vi/4QQX9tDdrnE/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=4QQX9tDdrnE',
      lang: 'en',
    },
    {
      id: '8j8A5yayEzQ',
      title: 'Trump Towers Sunny Isles market data reveals massive buyer advantage right now',
      published: '2026-06-22',
      thumbnail: 'https://i.ytimg.com/vi/8j8A5yayEzQ/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=8j8A5yayEzQ',
      lang: 'en',
    },
    {
      id: 'lhWRookt06g',
      title: 'Parque Towers Sunny Isles: Is This $137,000 Discount a Trap?',
      published: '2026-06-01',
      thumbnail: 'https://i.ytimg.com/vi/lhWRookt06g/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=lhWRookt06g',
      lang: 'en',
    },
    {
      id: 'hRhz1-qc-lE',
      title: 'La Perla Sunny Isles: Huge Price Reductions?',
      published: '2026-05-27',
      thumbnail: 'https://i.ytimg.com/vi/hRhz1-qc-lE/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=hRhz1-qc-lE',
      lang: 'en',
    },
    {
      id: 'noxEndyrIFk',
      title: 'Poinciana Island Sunny Isles: Private Marina Condo Buyer Guide',
      published: '2026-05-21',
      thumbnail: 'https://i.ytimg.com/vi/noxEndyrIFk/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=noxEndyrIFk',
      lang: 'en',
    },
    {
      id: 'mtkizTCXwqw',
      title: "Champion Lakes Gated Community | Miami's Hottest New Development",
      published: '2026-05-10',
      thumbnail: 'https://i.ytimg.com/vi/mtkizTCXwqw/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=mtkizTCXwqw',
      lang: 'en',
    },
    {
      id: 'wfuiw-1ylO0',
      title: 'Private Island Living in Miami: Poinciana Yacht & Racquet Club Explained',
      published: '2026-04-18',
      thumbnail: 'https://i.ytimg.com/vi/wfuiw-1ylO0/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=wfuiw-1ylO0',
      lang: 'en',
    },
    {
      id: 'LOpKvBYHIt8',
      title: 'Golden Gate Estates & Marina Sunny Isles Beach 2026',
      published: '2026-03-01',
      thumbnail: 'https://i.ytimg.com/vi/LOpKvBYHIt8/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=LOpKvBYHIt8',
      lang: 'en',
    },
    {
      id: 'hISwqsR9Uic',
      title: 'Greenview at Presidential: Is This ACTUALLY "Modern Luxury"?',
      published: '2026-02-12',
      thumbnail: 'https://i.ytimg.com/vi/hISwqsR9Uic/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=hISwqsR9Uic',
      lang: 'en',
    },
    {
      id: 'BTzvyeAU44o',
      title: 'Final Step to Ownership: Closing Costs (1–5%), Remote Notary & Handover',
      published: '2025-12-15',
      thumbnail: 'https://i.ytimg.com/vi/BTzvyeAU44o/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=BTzvyeAU44o',
      lang: 'en',
    },
    {
      id: 'JOQcIOmgU_Y',
      title: 'Final Mortgage Approval in Miami: Loan Estimate, Rate Lock & Appraisal',
      published: '2025-12-01',
      thumbnail: 'https://i.ytimg.com/vi/JOQcIOmgU_Y/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=JOQcIOmgU_Y',
      lang: 'en',
    },
    {
      id: 'rhgYcBKdZKE',
      title: 'Home Inspection in Miami: Types, Reports, and Negotiation Options',
      published: '2025-11-20',
      thumbnail: 'https://i.ytimg.com/vi/rhgYcBKdZKE/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=rhgYcBKdZKE',
      lang: 'en',
    },
    {
      id: '6cvatZEL008',
      title: 'How to Submit an Offer in Miami: Contract, Counteroffer & Escrow',
      published: '2025-11-10',
      thumbnail: 'https://i.ytimg.com/vi/6cvatZEL008/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=6cvatZEL008',
      lang: 'en',
    },
    {
      id: 'bA3-Xya1XpU',
      title: 'How to Choose a Realtor in Miami: MLS Access, Experience & Strategy',
      published: '2025-10-25',
      thumbnail: 'https://i.ytimg.com/vi/bA3-Xya1XpU/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=bA3-Xya1XpU',
      lang: 'en',
    },
  ],
};

function detectVideoLanguage(id: string, title: string, desc: string): 'ru' | 'en' | 'es' {
  if (RU_KNOWN_IDS.has(id) || /[а-яё]/i.test(title) || /[а-яё]/i.test(desc.slice(0, 500))) {
    return 'ru';
  }
  if (
    ES_KNOWN_IDS.has(id) ||
    /[áéíóúüñ¿¡]/i.test(title) ||
    /\b(casas|de lujo|bienes raíces|en venta|en miami|inversión|inversion|apartamento|apartamentos|compradores|propiedades|recorrido|bienvenidos|nuevo|nueva|nuevas|nuevos|habitaciones|dormitorios|edificio|guía|paso)\b/i.test(title) ||
    /\b(casas|de lujo|bienes raíces|en venta|en miami|inversión|inversion|apartamento|apartamentos|compradores|propiedades)\b/i.test(desc.slice(0, 500))
  ) {
    return 'es';
  }
  return 'en';
}

export async function getChannelVideos(lang?: 'ru' | 'en' | 'es'): Promise<YouTubeVideo[]> {
  const dynamicVideos: YouTubeVideo[] = [];

  try {
    const res = await fetch(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UCMOGlyi_ZoMJSnI5VEz0FNw',
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const xml = await res.text();
      const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
      let match;

      while ((match = entryRegex.exec(xml)) !== null) {
        const entryXml = match[1];
        const idMatch = entryXml.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
        const titleMatch = entryXml.match(/<title>(.*?)<\/title>/);
        const pubMatch = entryXml.match(/<published>(.*?)<\/published>/);
        const descMatch = entryXml.match(/<media:description>([\s\S]*?)<\/media:description>/);

        const id = idMatch ? idMatch[1] : '';
        const rawTitle = titleMatch ? titleMatch[1] : '';
        const published = pubMatch ? pubMatch[1] : '';
        const desc = descMatch ? descMatch[1] : '';

        // Clean HTML entities in title
        const title = rawTitle
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');

        // Filter out shorts
        if (/#shorts?\b/i.test(title) || /#shorts?\b/i.test(desc)) {
          continue;
        }

        if (id) {
          const videoLang = detectVideoLanguage(id, title, desc);
          dynamicVideos.push({
            id,
            title,
            published: published.slice(0, 10),
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            url: `https://www.youtube.com/watch?v=${id}`,
            lang: videoLang,
          });
        }
      }
    }
  } catch (e) {
    console.error('Error fetching YouTube channel feed:', e);
  }

  // If specific language requested, filter RSS feed and merge with base catalog
  if (lang) {
    const langDynamic = dynamicVideos.filter((v) => v.lang === lang);
    const catalogForLang = BASE_CATALOG[lang] || [];
    const seenIds = new Set(langDynamic.map((v) => v.id));

    const merged = [...langDynamic];
    for (const item of catalogForLang) {
      if (!seenIds.has(item.id)) {
        merged.push(item);
        seenIds.add(item.id);
      }
    }
    return merged;
  }

  // If no language specified, return all dynamic videos or default catalog
  if (dynamicVideos.length > 0) {
    return dynamicVideos;
  }

  return BASE_CATALOG.en;
}
