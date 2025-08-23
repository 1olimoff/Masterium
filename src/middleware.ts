import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
});

const allowedRegions = [
  "tashkent", "tashkent-region", "fergana", "andijan", "namangan",
  "sirdarya", "jizzax", "samarqand", "qashqadarya", "surxandarya",
  "buxara", "navai", "xarezm", "qaraqalpak",
];

const defaultLocale = "uz";
const defaultRegion = "tashkent";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const regionFromCookie = req.cookies.get("region")?.value;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const mainPagePath = `/${defaultLocale}/${defaultRegion}`;

  // ✅ Access token yo‘q, refresh token bor → yangilash
  if (!accessToken && refreshToken) {
    try {
      const refreshRes = await fetch("https://cdn.masterium.uz/api/v1/auth/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
          token: refreshToken, // backend ikkalasini ham so‘raydi
        }),
      });

      if (refreshRes.ok) {
        const resData = await refreshRes.json();

        if (resData.success && resData.access_token) {
          console.log("✅ Access token middleware orqali yangilandi");

          const response = NextResponse.next();

          // 🔑 faqat access token update qilinadi
          response.cookies.set("accessToken", resData.access_token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 15, // 15 daqiqa
            path: "/",
          });

          // 🔑 token_type (Bearer bo‘ladi)
          if (resData.token_type) {
            response.cookies.set("authType", resData.token_type, {
              httpOnly: true,
              sameSite: "lax",
              maxAge: 15 * 24 * 60 * 60,
              path: "/",
            });
          }

          return response;
        } else {
          console.error("❌ Refresh token yaroqsiz:", resData);
        }
      } else {
        console.error(
          "❌ Refresh so‘rovi muvaffaqiyatsiz:",
          refreshRes.status,
          await refreshRes.text()
        );
      }
    } catch (err) {
      console.error("❌ Middleware auto refresh error:", err);
    }

    // ❌ Refresh bo‘lmadi → cookie tozalanadi va main pageda redirect
    const response =
      pathname === mainPagePath
        ? NextResponse.next()
        : NextResponse.redirect(new URL(mainPagePath, req.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    response.cookies.delete("authType");
    return response;
  }

  // 🔐 Umuman token yo‘q → main pagega qaytariladi
  if (!accessToken && !refreshToken && pathname !== mainPagePath) {
    return NextResponse.redirect(new URL(mainPagePath, req.url));
  }

  // 🏠 "/" → default locale & region
  if (pathname === "/") {
    const regionToUse =
      regionFromCookie && allowedRegions.includes(regionFromCookie)
        ? regionFromCookie
        : defaultRegion;

    return NextResponse.redirect(
      new URL(`/${defaultLocale}/${regionToUse}${req.nextUrl.search}`, req.url)
    );
  }

  // 🌍 Til va region tekshirish
  const match = pathname.match(/^\/(uz|ru|en)\/([^\/?#]+)/);
  if (match) {
    const lang = match[1];
    const region = match[2].toLowerCase();

    if (!allowedRegions.includes(region)) {
      return NextResponse.redirect(
        new URL(`/${lang}/${defaultRegion}${req.nextUrl.search}`, req.url)
      );
    }

    const response = intlMiddleware(req);
    response.cookies.set("region", region, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 kun
    });
    return response;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(uz|ru|en)/:path*"],
};
