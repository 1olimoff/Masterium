import {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import "./globals.css"

import {LayoutProvider} from '@/components/shared/tamplates/LayoutProvider/LayoutProvider';

/**
 * Types for layout props
 */
interface LayoutProps {
    children: ReactNode;
    params: {
        /** The locale param extracted from the route. */
        locale?: 'ru' | 'uz';
        /** Additional param e.g. region. */
        region: string;
    };
}

/**
 * This function allows you to dynamically define metadata based on your locale.
 * Next.js will call this server-side before rendering.
 */
export async function generateMetadata({ params }: LayoutProps) {
    // Extract locale & region
    const { locale = 'ru', region } = params;

    console.log("LAYOUT.tsx Region", region)

    // Or get it from any external source / logic if needed
    const siteUrl = 'https://masterium-real.vercel.app';

    // Localized SEO data
    const seoData = {
        ru: {
            title: 'Masterium | Ташкент',
            description: 'Единственный сайт по поиску услуг разнорабочих',
            imageUrl: `${siteUrl}/favicon.ico`,
            canonicalUrl: `${siteUrl}/ru`,
        },
        uz: {
            title: 'Masterium | Toshkent',
            description: "Santexnika bo'yicha yagona sayt",
            imageUrl: `${siteUrl}/favicon.ico`,
            canonicalUrl: `${siteUrl}/uz`,
        },
    };

    // If locale is not recognized, default to 'ru'
    const { title, description, imageUrl, canonicalUrl } = seoData[locale] ?? seoData.ru;

    return {
        title,
        description,
        // This sets the <link rel="canonical" ...> tag
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                },
            ],
            siteName: 'Oq Id',
            type: 'website',
            locale,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

/**
 * Main layout component
 */
export default async function RootLayout({ children, params }: LayoutProps) {
    const { locale = 'ru', region } = params;

    // Optionally set the request locale (if needed by next-intl).
    unstable_setRequestLocale(locale);

    // Load translations
    let messages;
    try {
        messages = await getMessages({ locale });
    } catch (err) {
        // If we can't find messages for the locale, show 404 or fallback
        console.log("Layout ERROR",err);
        notFound();
    }

    // Configure your custom Google Font

    return (
        <html lang={locale}>
        <body className={`bg-[#F8F9FA]`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            {/*
            LayoutProvider can do region/locale-based logic too,
            or you can pass them separately as props
          */}
            <LayoutProvider params={{ locale, region }}>
                {children}
            </LayoutProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
