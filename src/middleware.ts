import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['uz', 'ru', 'en'],
  defaultLocale: 'uz',
});

const allowedRegions = [
  'tashkent', 'tashkent-region', 'fergana', 'andijan', 'namangan',
  'sirdarya', 'jizzax', 'samarqand', 'qashqadarya', 'surxandarya',
  'buxara', 'navai', 'xarezm', 'qaraqalpak'
];

const defaultLocale = 'uz';
const defaultRegion = 'tashkent';

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const regionFromCookie = req.cookies.get('region')?.value;

  if (pathname === '/') {
    const regionToUse = regionFromCookie && allowedRegions.includes(regionFromCookie)
      ? regionFromCookie
      : defaultRegion;

    return NextResponse.redirect(new URL(`/${defaultLocale}/${regionToUse}${req.nextUrl.search}`, req.url));
  }

  const match = pathname.match(/^\/(uz|ru|en)\/([^\/?#]+)/);
  if (match) {
    const lang = match[1];
    const region = match[2].toLowerCase();

    if (!allowedRegions.includes(region)) {
      return NextResponse.redirect(new URL(`/${lang}/${defaultRegion}${req.nextUrl.search}`, req.url));
    }


    const response = intlMiddleware(req);
    response.cookies.set('region', region, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 kun saqlanadi
    });
    return response;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(uz|ru|en)/:path*']
};
