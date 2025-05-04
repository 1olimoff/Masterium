import React from 'react';
import { cn } from '@lib/utils';
import {AdCarousel} from "@/root/components/shared/elements/advertising/AdCarousel";
import {Categories} from "@/root/components/shared/tamplates/Main/Categories/Categories";
import {OpenWorks} from "@/root/components/shared/tamplates/Main/OpenWorks/OpenWorks";
import {DailyWorkers} from "@/root/components/shared/tamplates/Main/DailyWorkers/DailyWorkers";
import {AdBanner} from "@/root/components/shared/elements/advertising/AdBanner";

interface Props {
    className?: string;
}

export const Main = ({ className }: Props) => {
    return (
        <div className={cn(className, "flex flex-col gap-12 p-6")}>
            <AdCarousel />
            <Categories />
            <OpenWorks />
            <AdCarousel />
            <DailyWorkers />
            <AdBanner />
        </div>
    );
};
