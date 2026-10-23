import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const langParam = request.nextUrl.searchParams.get('lang');

  // Skip static files, api, admin, next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/images') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // If user explicitly switched language via ?lang= param, remember it in cookie
  if (langParam === 'en') {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', 'en', { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return response;
  }
  if (langParam === 'ru') {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', 'ru', { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return response;
  }
  if (langParam === 'es') {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', 'es', { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return response;
  }

  // Only auto-redirect on root URL '/'
  if (pathname === '/') {
    const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

    // If user has explicitly chosen English, ALWAYS serve English!
    if (localeCookie === 'en') {
      return NextResponse.next();
    }

    // Never redirect search engine bots on root
    const userAgent = request.headers.get('user-agent') || '';
    if (/bot|crawler|spider|crawling|googlebot|bingbot|yandex/i.test(userAgent)) {
      return NextResponse.next();
    }

    // If user previously chose RU or ES explicitly, redirect them
    if (localeCookie === 'ru') {
      return NextResponse.redirect(new URL('/ru', request.url));
    }
    if (localeCookie === 'es') {
      return NextResponse.redirect(new URL('/es', request.url));
    }

    // If first-time visitor with NO cookie set, inspect Accept-Language
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const preferences = acceptLanguage
        .split(',')
        .map((part) => {
          const [tag, q] = part.trim().split(';q=');
          return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1.0 };
        })
        .sort((a, b) => b.q - a.q);

      for (const item of preferences) {
        if (item.tag.startsWith('ru')) {
          return NextResponse.redirect(new URL('/ru', request.url));
        }
        if (item.tag.startsWith('es')) {
          return NextResponse.redirect(new URL('/es', request.url));
        }
        if (item.tag.startsWith('en')) {
          break;
        }
      }
    }

    // Default to English ('/')
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
