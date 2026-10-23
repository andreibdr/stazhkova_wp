export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
}

export async function getChannelVideos(): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UCMOGlyi_ZoMJSnI5VEz0FNw',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error('Failed to fetch YouTube feed');
    const xml = await res.text();

    const entries: YouTubeVideo[] = [];
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

      // Filter out shorts: skip if title or description contains #short or #shorts
      if (/#shorts?\b/i.test(title) || /#shorts?\b/i.test(desc)) {
        continue;
      }

      if (id) {
        entries.push({
          id,
          title,
          published: published.slice(0, 10),
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${id}`,
        });
      }
    }

    if (entries.length > 0) {
      return entries;
    }
  } catch (e) {
    console.error('Error fetching YouTube channel feed:', e);
  }

  // Robust fallback of Elena Stazhkova latest horizontal public videos
  return [
    {
      id: 'MOB2LSCgWXE',
      title: 'Florida Homestead Exemption and the Buyer Tax Reset',
      published: '2026-08-08',
      thumbnail: 'https://i.ytimg.com/vi/MOB2LSCgWXE/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=MOB2LSCgWXE',
    },
    {
      id: '4QQX9tDdrnE',
      title: 'St. Tropez Market Intelligence | Patience Gives You Negotiation Leverage',
      published: '2026-07-10',
      thumbnail: 'https://i.ytimg.com/vi/4QQX9tDdrnE/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=4QQX9tDdrnE',
    },
    {
      id: '8j8A5yayEzQ',
      title: 'Trump Towers Sunny Isles market data reveals massive buyer advantage right now',
      published: '2026-06-22',
      thumbnail: 'https://i.ytimg.com/vi/8j8A5yayEzQ/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=8j8A5yayEzQ',
    },
    {
      id: 'lhWRookt06g',
      title: 'Parque Towers Sunny Isles: Is This $137,000 Discount a Trap?',
      published: '2026-06-01',
      thumbnail: 'https://i.ytimg.com/vi/lhWRookt06g/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=lhWRookt06g',
    },
    {
      id: 'hRhz1-qc-lE',
      title: 'La Perla Sunny Isles: Huge Price Reductions?',
      published: '2026-05-27',
      thumbnail: 'https://i.ytimg.com/vi/hRhz1-qc-lE/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=hRhz1-qc-lE',
    },
    {
      id: 'noxEndyrIFk',
      title: 'Poinciana Island Sunny Isles: Private Marina Condo Buyer Guide',
      published: '2026-05-21',
      thumbnail: 'https://i.ytimg.com/vi/noxEndyrIFk/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=noxEndyrIFk',
    },
  ];
}
