import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { getTranslations } from 'next-intl/server';
import { ServiceCard } from "@/root/ui/dev/components/shared/elements/Services/Service/ServiceCard";
import { AdCarouselServer } from '../../../../elements/advertising/AdCarousel/AdCarousel.server';
import { ShowMoreSection } from './ShowMoreSection';

interface Master {
    user_uuid: string;
    profile_photo: string;
    first_name: string;
    last_name: string;
    rating: number;
    comments_count: number;
    name: string;
    category_id: number;
    categories: { id: number; name: string }[];
    tags?: { category_id: number; id: number; name: string }[];
}

interface Props {
    className?: string;
    slug: string;
    masters: Master[];
}

const WORKS_TO_DISPLAY = 8;

export const List = async ({ className, slug, masters }: Props) => {
    const t = await getTranslations();
        
    return (
        <section className={cn(className, "mt-4")}>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                {masters.slice(0, WORKS_TO_DISPLAY).map((item, i) => (
                    <ServiceCard data={item} key={i} slug={slug} />
                ))}
            </div>

            <div className="py-10">
                <AdCarouselServer />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                {masters.slice(WORKS_TO_DISPLAY).map((item, i) => (
                    <ServiceCard data={item} slug={slug} key={i + WORKS_TO_DISPLAY} />
                ))}
            </div>

            <ShowMoreSection 
                masters={masters.slice(WORKS_TO_DISPLAY)} 
                slug={slug} 
                showMoreText={t('OpenWorks.more')} 
                totalMasters={masters.length} 
                worksToDisplay={WORKS_TO_DISPLAY}
            />
        </section>
    );
};
