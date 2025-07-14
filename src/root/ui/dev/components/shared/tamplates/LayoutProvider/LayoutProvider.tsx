import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Header from "@/root/ui/dev/components/shared/tamplates/Header";
import Aside from "@/root/ui/dev/components/shared/tamplates/Aside";
import { Footer } from "@/root/ui/dev/components/shared/tamplates/Footer/Footer";
import TabBar from '../../TabBar/TabBar';
import { cookies } from 'next/headers';

interface LayoutProps {
    children: React.ReactNode;
    params: { locale?: string; region?: string }; // Определяем params как промис
    className?: string;
}

export const LayoutProvider = async ({ className, children, params }: LayoutProps) => {
    const cookieToken = (await cookies()).get('accessToken')?.value || null
    console.log('COOKIE TOKEN', cookieToken)

    return (
        <div className={cn(className)}>
            <Header params={params} />
            <main>
                <Aside />
                {children}
            </main>
            <Footer />
            <TabBar token={cookieToken} />
        </div>
    );
};
