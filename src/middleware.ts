import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import Cookies from 'js-cookie';

// next-intl middleware (locale uchun)
const intlMiddleware = createIntlMiddleware({
  locales: ['uz', 'ru'],
  defaultLocale: 'uz',
});

const allowedRegions = [
  'tashkent', 'tashkent-region', 'fergana', 'andijan', 'namangan',
  'sirdarya', 'jizzax', 'samarqand', 'qashqadarya', 'surxandarya',
  'buxara', 'navai', 'xarezm', 'qaraqalpak'
];

const defaultLocale = 'uz';
const defaultRegion = 'tashkent';

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}/${defaultRegion}${search}`, req.url));
  }

  const match = pathname.match(/^\/(uz|ru|en)\/([^\/?#]+)/);
  if (match) {
    const lang = match[1];
    const region = match[2].toLowerCase();

    if (!allowedRegions.includes(region)) {
      return NextResponse.redirect(new URL(`/${lang}/${defaultRegion}${search}`, req.url));
    }
  }


  const response = intlMiddleware(req);

  console.log("Regioon", Cookies.get('region'))

  return response;
}

export const config = {
  matcher: ['/', '/(uz|ru|en)/:path*']
};
