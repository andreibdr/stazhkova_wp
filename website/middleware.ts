import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  // If visiting Russian or Spanish pages directly, remember choice
  if (pathname.startsWith('/ru')) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', 'ru', { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
  }
  if (pathname.startsWith('/es')) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', 'es', { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  // Only auto-redirect on the root URL '/'
  if (pathname === '/') {
    // 1. Check if user already set an explicit language cookie
    const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
    if (localeCookie === 'ru') {
      return NextResponse.redirect(new URL('/ru', request.url));
    }
    if (localeCookie === 'es') {
      return NextResponse.redirect(new URL('/es', request.url));
    }
    if (localeCookie === 'en') {
      return NextResponse.next();
    }

    // 2. Never redirect search engine bots on root
    const userAgent = request.headers.get('user-agent') || '';
    if (/bot|crawler|spider|crawling|googlebot|bingbot|yandex/i.test(userAgent)) {
      return NextResponse.next();
    }

    // 3. Inspect browser Accept-Language header
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
          const response = NextResponse.redirect(new URL('/ru', request.url));
          response.cookies.set('NEXT_LOCALE', 'ru', { path: '/', maxAge: 60 * 60 * 24 * 365 });
          return response;
        }
        if (item.tag.startsWith('es')) {
          const response = NextResponse.redirect(new URL('/es', request.url));
          response.cookies.set('NEXT_LOCALE', 'es', { path: '/', maxAge: 60 * 60 * 24 * 365 });
          return response;
        }
        if (item.tag.startsWith('en')) {
          // English preferred -> stay on default '/'
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
