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
  const { pathname } = req.nextUrl;
  const regionFromCookie = req.cookies.get('region')?.value;
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  // Main page yo'lini aniqlash (masalan, /uz/tashkent)
  const mainPagePath = `/${defaultLocale}/${defaultRegion}`;

  // Access token yo'q, lekin refresh token bor bo'lsa, tokenni yangilashga urinish
  if (!accessToken && refreshToken) {
    try {
      const refreshRes = await fetch(`${req.nextUrl.origin}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (refreshRes.ok) {
        const resData = await refreshRes.json();
        if (resData.success && resData.access) {
          console.log('Access token middleware orqali yangilandi');
          const response = NextResponse.next();

          // Yangi access tokenni cookie'ga yozish
          response.cookies.set('accessToken', resData.access, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 15, // 15 daqiqa
            path: '/',
          });

          // Agar yangi refresh token kelgan bo'lsa, uni ham yangilash
          if (resData.refresh) {
            response.cookies.set('refreshToken', resData.refresh, {
              httpOnly: true,
              sameSite: 'lax',
              maxAge: 15 * 24 * 60 * 60, // 15 kun
              path: '/',
            });
          }

          // Auth type ni ham yangilash, agar mavjud bo'lsa
          if (resData.token_type) {
            response.cookies.set('authType', resData.token_type, {
              httpOnly: true,
              sameSite: 'lax',
              maxAge: 15 * 24 * 60 * 60, // 15 kun
              path: '/',
            });
          }

          return response;
        } else {
          console.error('Refresh token yaroqsiz:', resData);
          // Yaroqsiz refresh token bo'lsa, cookie'larni tozalash
          const response = pathname === mainPagePath ? NextResponse.next() : NextResponse.redirect(new URL(mainPagePath, req.url));
          response.cookies.delete('accessToken');
          response.cookies.delete('refreshToken');
          response.cookies.delete('authType');
          return response;
        }
      } else {
        console.error('Refresh token so‘rovi muvaffaqiyatsiz:', refreshRes.status);
        // Yaroqsiz refresh token bo'lsa, cookie'larni tozalash
        const response = pathname === mainPagePath ? NextResponse.next() : NextResponse.redirect(new URL(mainPagePath, req.url));
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        response.cookies.delete('authType');
        return response;
      }
    } catch (err) {
      console.error('Middleware auto refresh error:', err);
      // Xato yuz bersa, cookie'larni tozalash
      const response = pathname === mainPagePath ? NextResponse.next() : NextResponse.redirect(new URL(mainPagePath, req.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      response.cookies.delete('authType');
      return response;
    }
  }

  // Agar access token va refresh token yo'q bo'lsa va main page'da bo'lmasa, main page'ga yo'naltirish
  if (!accessToken && !refreshToken && pathname !== mainPagePath) {
    return NextResponse.redirect(new URL(mainPagePath, req.url));
  }

  // Agar yo'l '/' bo'lsa, default til va hududga yo'naltirish
  if (pathname === '/') {
    const regionToUse = regionFromCookie && allowedRegions.includes(regionFromCookie)
      ? regionFromCookie
      : defaultRegion;

    return NextResponse.redirect(new URL(`/${defaultLocale}/${regionToUse}${req.nextUrl.search}`, req.url));
  }

  // Til va hududni tekshirish
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
      maxAge: 60 * 60 * 24 * 30, // 30 kun
    });
    return response;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(uz|ru|en)/:path*'],
};