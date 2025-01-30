import React from 'react';
import { cn } from '@lib/utils';
import Header from "@/components/shared/tamplates/Header";
import Aside from "@/components/shared/tamplates/Aside";
import {Footer} from "@/components/shared/tamplates/Footer/Footer";

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
