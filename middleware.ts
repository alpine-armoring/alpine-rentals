import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirects = new Map([
  ['/index.html', '/'],
  ['/contact-limo.html', '/contact'],
  ['/contact-brokers.html', '/contact'],
  ['/contact-limo-resp.html', '/contact'],
  ['/contact-private.html', '/contact'],
  ['/contact-message.html', '/contact'],
  ['/ballistic-chart.html', '/ballistic-chart'],
  ['/Standard-0101.02', '/ballistic-chart'],
  ['/pdf/NIJ-Standards_0108_01.pdf', '/ballistic-chart'],
  ['/Standard-0108.00', '/ballistic-chart'],
  ['/armoredSuvs.html', '/armored-rentals'],
  ['/complete-stock.html', '/armored-rentals'],
  ['/armored-rentals/[slug]', '/armored-rentals'],
  ['/vehicle-pages/armoredSedans.html', '/armored-rentals'],
  ['/vehicle-pages/contact-brokers.html', '/contact'],
  ['/vehicle-pages/contact-private.html', '/contact'],
  [
    '/armored-rentals/armored-mercedes-benz-s580-executive-1287',
    '/armored-rentals',
  ],
  ['/link', '/'],
  ['/allaboutcookies.org', '/'],
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path should be noindexed (directory starts with or exact redirect match)
  const shouldNoindex =
    pathname.startsWith('/images') ||
    pathname.startsWith('/vehicle-pages') ||
    pathname.startsWith('/pdf') ||
    Array.from(redirects.keys()).some(
      (url) => pathname === url || pathname.startsWith(url + '/')
    );

  // Check for redirect
  const redirectTo = redirects.get(pathname);

  // If URL needs to be redirected
  if (redirectTo) {
    const response = NextResponse.redirect(new URL(redirectTo, request.url), {
      status: 301,
    });
    // Add noindex header if needed
    if (shouldNoindex) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return response;
  }

  // If URL only needs noindex
  if (shouldNoindex) {
    // const url = request.nextUrl.clone();
    // url.pathname = '/';
    // url.search = '';
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
