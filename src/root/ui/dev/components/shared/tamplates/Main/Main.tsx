import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {AdCarousel} from "@/root/ui/dev/components/shared/elements/advertising/AdCarousel";
import {Categories} from "@/root/ui/dev/components/shared/tamplates/Main/Categories/Categories";
import {OpenWorks} from "@/root/ui/dev/components/shared/tamplates/Main/OpenWorks/OpenWorks";
import {DailyWorkers} from "@/root/ui/dev/components/shared/tamplates/Main/DailyWorkers/DailyWorkers";
import {AdBanner} from "@/root/ui/dev/components/shared/elements/advertising/AdBanner";

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
            {/* <DailyWorkers /> */}
            <AdBanner />
        </div>
    );
};
