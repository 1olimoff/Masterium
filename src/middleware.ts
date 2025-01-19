import { NextResponse, NextRequest } from "next/server";

// Дефолтные значения
const DEFAULT_LOCALE = "ru";
const DEFAULT_REGION = "tashkent";

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    // Получаем текущую локаль и регион из куки
    const locale = req.cookies.get("locale")?.value || DEFAULT_LOCALE;
    const region = req.cookies.get("region")?.value || DEFAULT_REGION;

    // Если пользователь заходит на "/", перенаправляем на сохранённый путь
    if (url.pathname === "/") {
        url.pathname = `/${locale}/${region}`;
        return NextResponse.redirect(url);
    }

    // Если путь начинается с локали, проверяем корректность и обновляем куки
    const pathMatch = url.pathname.match(/^\/(ru|uz|en)(\/([^/]+))?/);
    if (pathMatch) {
        const [, currentLocale, , currentRegion] = pathMatch;

        const response = NextResponse.next();

        // Обновляем куки, если локаль или регион изменились
        if (currentLocale !== locale) {
            response.cookies.set("locale", currentLocale);
        }
        if (currentRegion && currentRegion !== region) {
            response.cookies.set("region", currentRegion);
        }

        return response;
    }

    // Если запрос не соответствует ожидаемому формату, возвращаем 404
    return NextResponse.next();
}

// Конфигурация matcher
export const config = {
    matcher: ["/", "/(ru|uz|en)/:path*"], // Обрабатываем корневой путь и пути с локалью
};
