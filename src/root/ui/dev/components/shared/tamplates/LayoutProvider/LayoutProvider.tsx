import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Header from "@/root/components/shared/tamplates/Header";
import Aside from "@/root/components/shared/tamplates/Aside";
import {Footer} from "@/root/components/shared/tamplates/Footer/Footer";

interface LayoutProps {
    children: React.ReactNode;
    params: { locale?: string; region?: string }; // Определяем params как промис
    className?: string;
}

export const LayoutProvider = ({ className, children, params }: LayoutProps) => {
    return (
        <div className={cn(className)}>
            <Header params={params} />
            <main>
                <Aside />
            {children}
            </main>
            <Footer />
        </div>
    );
};
