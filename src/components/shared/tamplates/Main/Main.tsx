import React from 'react';
import { cn } from '@lib/utils';
import {AdCarousel} from "@/components/shared/elements/advertising/AdCarousel";
import {Categories} from "@/components/shared/tamplates/Main/Categories/Categories";
import {OpenWorks} from "@/components/shared/tamplates/Main/OpenWorks/OpenWorks";

interface Props {
    className?: string;
}

export const Main = ({ className }: Props) => {
    return (
        <div className={cn(className, "flex flex-col gap-4 p-6")}>
            <AdCarousel />
            <Categories />
            <OpenWorks />
        </div>
    );
};
