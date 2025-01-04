import { NextResponse, NextRequest } from 'next/server'; // Импортируем NextResponse
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Основная логика middleware
export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const locale = req.cookies.get('locale') || 'ru'; // Проверяем куки, используем 'ru' по умолчанию

    // Если пользователь на корневом пути, перенаправляем его на /ru или /uz
    if (url.pathname === '/') {
        url.pathname = `/${locale}`;
        return NextResponse.redirect(url);
    }

    // Применяем стандартную обработку через next-intl middleware
    return createMiddleware(routing)(req);
}

// Конфигурация matcher
export const config = {
    matcher: ['/', '/(ru|uz)/:path*'], // Перехватываем корень и все пути с локалями
};
