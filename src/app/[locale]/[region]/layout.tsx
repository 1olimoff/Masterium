import {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Toaster} from "@/root/ui/dev/shadcn/ui/toaster"
import '../../globals.css'

import {LayoutProvider} from '@/root/ui/dev/components/shared/tamplates/LayoutProvider/LayoutProvider';

interface LayoutProps {
    children: ReactNode;
    params: {
        /** The locale param extracted from the route. */
        locale?: 'ru' | 'uz';
        /** Additional param e.g. region. */
        region: string;
    };
}

export default async function RootLayout({children, params}: LayoutProps) {
    const {locale = 'ru', region} = params;

    // Optionally set the request locale (if needed by next-intl).
    unstable_setRequestLocale(locale);

    // Load translations
    let messages = await getMessages({locale});


    return (
        <html lang={locale}>
        <body className={`bg-[#F8F9FA]`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <LayoutProvider params={{locale, region}}>
                {children}
            </LayoutProvider>
        </NextIntlClientProvider>
        <Toaster/>
        </body>
        </html>
    );
}
