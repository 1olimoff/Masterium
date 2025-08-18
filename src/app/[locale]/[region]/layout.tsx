import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from "@/root/ui/dev/shadcn/ui/toaster";
import '../../globals.css';
import { LayoutProvider } from '@/root/ui/dev/components/shared/tamplates/LayoutProvider/LayoutProvider';
import ClientWrapper from './ClientWrapper';

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
      <head>
        {/* Agar boshqa meta teglar yoki skriptlar bo‘lsa, bu yerga qo‘shiladi */}
      </head>
      <body className="bg-[#F8F9FA]">
        <NextIntlClientProvider locale={locale} messages={messages}>
        <LayoutProvider params={{ locale, region }}>
            {children}
          </LayoutProvider>
          <Toaster />
          <ClientWrapper /> {/* 👈 client ishlari shu yerda */}
          {/* Yandex.Metrika counter */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103536516', 'ym');

                ym(103536516, 'init', {
                  ssr: true,
                  webvisor: true,
                  clickmap: true,
                  ecommerce: "dataLayer",
                  accurateTrackBounce: true,
                  trackLinks: true
                });
              `,
            }}
          />
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/103536516"
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
          {/* /Yandex.Metrika counter */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}