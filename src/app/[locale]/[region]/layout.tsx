import {Nunito} from "next/font/google";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {unstable_setRequestLocale} from "next-intl/server";

//styles
import "./globals.css";
import React from "react";

// Подключение Google Fonts (Raleway)
const nunito = Nunito({
    subsets: ["latin", "cyrillic"],
    weight: ["300", "400", "600", "700"], // Choose the weights you need
    variable: "--font-nunito",
});

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale?: string }>; // Определяем params как промис
}

export default async function RootLayout({children, params}: LayoutProps) {
    // Устанавливаем локаль для запроса

    // SEO и OG данные для узбекского и русского языков
    const siteUrl = "https://masterium-real.vercel.app";

    type Locales = "ru" | "uz";

    const seoData: Record<
        Locales,
        {
            title: string;
            description: string;
            imageUrl: string;
            canonicalUrl: string;
        }
    > = {
        ru: {
            title: "Masterium | Ташкент",
            description: "Единственный сайт по поиску услуг разнорабочих",
            imageUrl: `${siteUrl}/favicon.ico`,
            canonicalUrl: `${siteUrl}/ru`,
        },
        uz: {
            title: "Masterium | Toshkent",
            description: "Santexnika bo'yicha yagona sayt",
            imageUrl: `${siteUrl}/favicon.ico`,
            canonicalUrl: `${siteUrl}/uz`,
        },
    };

    const resolvedParams = await params;

    const locale = resolvedParams?.locale === "uz" ? "uz" : "ru";

    const {title, description, imageUrl, canonicalUrl} = seoData[locale];
    unstable_setRequestLocale(locale);

    const messages = await getMessages({locale});

    return (
        <html lang={locale}>
        <head>
            {/* Базовые SEO-теги */}
            <meta name="description" content={description}/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta charSet="UTF-8"/>
            <meta name="robots" content="index, follow"/>
            <meta name="author" content="Abdukhakim Fayzullin"/>
            <link rel="canonical" href={canonicalUrl}/>
            <link rel="icon" href="/favicon.ico"/>
            {/* Open Graph (OG) теги */}
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={canonicalUrl}/>
            <meta property="og:image" content={imageUrl}/>
            <meta property="og:image:width" content="1200"/>
            {/* Рекомендованные размеры */}
            <meta property="og:image:height" content="630"/>
            <meta property="og:site_name" content="Oq Id"/>
            {/* Теги для Twitter */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={imageUrl}/>
            <title>{title}</title>
        </head>
        {/*antialiased content-hidden*/}
        <body className={`${nunito.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>

            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
