import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Header from "@/root/ui/dev/components/shared/tamplates/Header";
import Aside from "@/root/ui/dev/components/shared/tamplates/Aside";
import { Footer } from "@/root/ui/dev/components/shared/tamplates/Footer/Footer";
import TabBar from '../../TabBar/TabBar';
import { cookies } from 'next/headers';
import { AsideServer } from '../Aside/InputArea/Aside';
import Head from 'next/head';

interface LayoutProps {
    children: React.ReactNode;
    params: { locale?: string; region?: string };
    className?: string;
}

export const LayoutProvider = async ({ className, children, params }: LayoutProps) => {
    const cookieToken = (await cookies()).get('accessToken')?.value || null
    console.log('COOKIE TOKEN', cookieToken)

    return (
        <>
            <Head>
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  k=e.createElement(t),
                  a=e.getElementsByTagName(t)[0],
                  k.async=1,
                  k.src=r,
                  a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(103536516, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true,
                  ecommerce:"dataLayer"
              });
            `,
                    }}
                />
            </Head>

            <div className={cn(className)}>
                <Header params={params} />
                <main>
                    <AsideServer token={cookieToken} />
                    {children}
                </main>
                <Footer />
                <TabBar token={cookieToken} />
            </div>
        </>
    );
};