import { NextRequest, NextResponse } from "next/server";

const allowedRegions = ["tashkent", "tashkent-region", "fergana", "andijan", "namangan", "sirdarya", "jizzax", "samarqand", "qashqadarya", "surxandarya", "buxara", "navai", "xarezm", "qaraqalpak"
];
const defaultLocale = "uz";
const defaultRegion = "tashkent";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}/${defaultRegion}${search}`, req.url));
  }
  const langRegionRegex = /^\/(uz|ru|en)\/([^\/?#]+)/;
  const match = pathname.match(langRegionRegex);

  if (match) {
    const lang = match[1];
    const region = match[2].toLowerCase();
    if (!allowedRegions.includes(region)) {
      return NextResponse.redirect(new URL(`/${lang}/${defaultRegion}${search}`, req.url));
    }
  }
  return NextResponse.next();
}



export const config = {
  matcher: ["/", "/(uz|ru|en)/:path*"]
};
