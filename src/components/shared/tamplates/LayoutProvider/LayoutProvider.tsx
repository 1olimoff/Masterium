import React from 'react';
import { cn } from '@lib/utils';
import Header from "@/components/shared/tamplates/Header";
import Aside from "@/components/shared/tamplates/Aside";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale?: string }>; // Определяем params как промис
    className?: string;
}

export const LayoutProvider = ({ className, children, params }: LayoutProps) => {
    return (
        <div className={cn(className)}>
            <Header />
            <div>
                <Aside />
            {children}
            </div>
        </div>
    );
};
