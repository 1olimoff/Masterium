import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { AdCarouselServer } from '../../elements/advertising/AdCarousel/AdCarousel.server';
import { Categories } from "@/root/ui/dev/components/shared/tamplates/Main/Categories/Categories";
import { OpenWorks } from "@/root/ui/dev/components/shared/tamplates/Main/OpenWorks/OpenWorks";
import { DailyWorkers } from "@/root/ui/dev/components/shared/tamplates/Main/DailyWorkers/DailyWorkers";
import InputArea from '../Aside/InputArea/InputArea';
import { AdBannerServer } from '../../elements/advertising/AdCarousel/AdBanner.server';
import { AdPosterServer } from '../../elements/advertising/AdPoster/AdPoster.server';

interface Props {
    className?: string;
}

export const Main = ({ className }: Props) => {
    return (
        <div className={cn(className, "flex flex-col gap-4 sm:gap-2 p-2")}>
            <div className='sm:hidden flex'>
                <InputArea />
            </div>
            <AdCarouselServer />
            <Categories />
            <OpenWorks />
            <div className="flex gap-4">
                <div className="flex-[7.5]">
                    <AdBannerServer />
                </div>
                <div className="hidden sm:flex flex-[3]">
                    <AdPosterServer />
                </div>
            </div>
            <DailyWorkers />
        </div>
    );
};
