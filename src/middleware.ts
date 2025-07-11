import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

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

export async function middleware(req: NextRequest) {
  const { pathname, search } = await req.nextUrl;

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

  // TO‘G‘RI: Middleware'ni return qilamiz
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(uz|ru|en)/:path*']
};
