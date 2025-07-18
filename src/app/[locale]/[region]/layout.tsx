import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from "@/root/ui/dev/shadcn/ui/toaster";
import '../../globals.css';

import { LayoutProvider } from '@/root/ui/dev/components/shared/tamplates/LayoutProvider/LayoutProvider';

interface LayoutProps {
  children: ReactNode;
  params: {
    locale?: 'ru' | 'uz' | 'en';
    region: string;
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale = 'ru', region } = await params;

  // Set server locale for next-intl
  unstable_setRequestLocale(locale);

  // Get translations
  let messages;
  try {
    messages = await getMessages({ locale });
    if (!messages) notFound(); // fallback if messages missing
  } catch (error) {
    console.error('❌ Error loading messages:', error);
    notFound(); // redirect to 404 if messages not found or error thrown
  }

  return (
    <html lang={locale}>
      <body className="bg-[#F8F9FA]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LayoutProvider params={{ locale, region }}>
            {children}
          </LayoutProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
