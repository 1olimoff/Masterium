import React from 'react';
import { cn } from '@lib/utils';
import {AdGrid} from "@/components/shared/elements/advertising/AdGrid";

interface Props {
    className?: string;
}

export const OpenWorks = ({ className }: Props) => {
    return (
        <div className={cn(className, "w-full flex flex-col gap-12 py-6")}>
            <AdGrid />
        </div>
    );
};
