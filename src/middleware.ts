import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {

}

// Конфигурация matcher
export const config = {
    matcher: ["/", "/(ru|uz|en)/:path*"], // Обрабатываем корневой путь и пути с локалью
};
