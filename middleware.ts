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
  ['/contact-embassy.html', '/contact'],
  ['/privacy.html', '/privacy-policy'],
  ['/contact-private-mobile.html', '/contact'],
  ['/contact-embassy.html', '/contact'],
  ['/contact-private-mobile.html', '/contact'],
  [
    '/armored-rentals/armored-mercedes-benz-s580-executive-1287',
    '/armored-rentals',
  ],
  ['/link', '/'],
  ['/allaboutcookies.org', '/'],
  [
    '/pdf/Chevrolet-Suburban-6562/Chevrolet-Suburban-high-country-oem-specs.pdf',
    '/armored-rentals',
  ],
  ['/pdf/stanag.pdf', '/ballistic-chart'],
  ['/pdf/MB-S550-5805/mercedes-benz-S550-oem-specs.pdf', '/armored-rentals'],
  ['/vehicle-pages/Mercedes-Benz-S550-3947.html', '/armored-rentals'],
  ['/pdf/UL-752.pdf', '/ballistic-chart'],
  [
    '/pdf/GMC-Yukon-Denali-9835/GMC-Yukon-Denali-9835-general-armoring-brochure.pdf',
    '/armored-rentals',
  ],
  [
    '/pdf/MB-S550-3947/mercedes-benz-S550-general-armoring-brochure.pdf',
    '/armored-rentals',
  ],
  ['/images/inventory/MB-S550-3947/gallery/thumbs/thumb', '/armored-rentals'],
  [
    '/images/inventory/Cadillac-Escalade-4193/gallery/small/image',
    '/armored-rentals',
  ],
  [
    '/images/inventory/Cadillac-Escalade-4193/gallery/large/image',
    '/armored-rentals',
  ],
  [
    '/images/inventory/Chevrolet-Suburban-LTZ-4774/gallery/thumbs/thumb',
    '/armored-rentals',
  ],
  [
    '/pdf/Cadillac-Escalade-6127/Cadillac-Escalade-oem-specs.pdf',
    '/armored-rentals',
  ],
  [
    '/pdf/Cadillac-Escalade-6127/Cadillac-Escalade-general-armoring-brochure.pdf',
    '/armored-rentals',
  ],
  [
    '/images/inventory/Chevrolet-Suburban-LTZ-4774/gallery/small/image',
    '/armored-rentals',
  ],
  [
    '/images/inventory/GMC-Yukon-Denali-9835/gallery/thumbs/thumb',
    '/armored-rentals',
  ],
  ['/images/inventory/MB-S550-5805/gallery/thumbs/thumb', '/armored-rentals'],
  ['/images/inventory/MB-S550-5805/gallery/large/image', '/armored-rentals'],
  ['/images/inventory/MB-S550-7204/gallery/large/image', '/armored-rentals'],
  [
    '/images/inventory/Chevrolet-Suburban-LTZ-4774/gallery/large/image',
    '/armored-rentals',
  ],
  ['/images/inventory/MB-S550-3947/gallery/small/image', '/armored-rentals'],
  ['/images/inventory/MB-S550-3947/gallery/large/image', '/armored-rentals'],
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
    '/((?!_next/static|_next/image|favicon.ico|api|sitemap|robots|manifest|sw.js).*)',
  ],
};
