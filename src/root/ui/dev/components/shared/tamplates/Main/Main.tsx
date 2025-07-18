import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {AdCarousel} from "@/root/ui/dev/components/shared/elements/advertising/AdCarousel";
import {Categories} from "@/root/ui/dev/components/shared/tamplates/Main/Categories/Categories";
import {OpenWorks} from "@/root/ui/dev/components/shared/tamplates/Main/OpenWorks/OpenWorks";
import {DailyWorkers} from "@/root/ui/dev/components/shared/tamplates/Main/DailyWorkers/DailyWorkers";
import {AdBanner} from "@/root/ui/dev/components/shared/elements/advertising/AdBanner";
import InputArea from '../Aside/InputArea/InputArea';

interface Props {
    className?: string;
}

export const Main = ({ className }: Props) => {
    return (
        <div className={cn(className, "flex flex-col gap-4 sm:gap-2 p-2")}>
            <div className='sm:hidden flex'>
                <InputArea />
            </div>
            <AdCarousel />
            <Categories alt=''/>
            <OpenWorks />
            <AdCarousel />
            <DailyWorkers />
            <AdBanner />
        </div>
    );
};
