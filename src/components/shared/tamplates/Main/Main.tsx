import React from 'react';
import { cn } from '@lib/utils';
import {AdCarousel} from "@/components/shared/advertising/AdCarousel";

interface Props {
    className?: string;
}

export const Main = ({ className }: Props) => {
    return (
        <div className={cn(className, "flex flex-col gap-4 p-6")}>
            <AdCarousel />
        </div>
    );
};
