import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Header from "@/root/ui/dev/components/shared/tamplates/Header";
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

    return (
        <>
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