import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const blockedUrls = [
    '/armored-rentals/armored-mercedes-benz-s580-executive-1287',
    '/pdf/MB-S550-3947/mercedes-benz-S550-full-armoring-specs.pdf',
    '/contact-message.html',
    '/Standard-0108.00',
    '/Standard-0101.02',
    '/link',
    '/allaboutcookies.org',
  ];

  // Check if the current URL matches any of the blocked URLs
  const isBlockedUrl = blockedUrls.some((url) => {
    return (
      request.nextUrl.pathname === url ||
      request.nextUrl.pathname.startsWith(url + '/') ||
      (url.includes('?') &&
        (() => {
          const [path, query] = url.split('?');
          if (request.nextUrl.pathname !== path) return false;
          const [param, value] = query.split('=');
          return request.nextUrl.searchParams.get(param) === value;
        })())
    );
  });

  if (
    request.nextUrl.pathname.startsWith('/images') ||
    request.nextUrl.pathname.startsWith('/vehicle-pages') ||
    request.nextUrl.pathname.startsWith('/pdf') ||
    isBlockedUrl
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    // const response = NextResponse.redirect(url, { status: 301 });

    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/images/:path*',
    '/vehicle-pages/:path*',
    '/pdf/:path*',
    '/:path*',
  ],
};
