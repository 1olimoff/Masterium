"use client"
import React, { useState } from 'react';
import { cn } from '@/root/business/lib/utils';
import { OpenWorkCard } from "@/root/ui/dev/components/shared/elements/OpenWorkCard/OpenWorkCard";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { useTranslations } from "next-intl";
import { AdCarouselServer } from '../../../elements/advertising/AdCarousel/AdCarousel.server';

interface Item {
    offer_id: number;
    title: string;
    category_name: string;
    price: number;
    currency: string;
    images: string[];
    user: {
      user_uuid: string;
      first_name: string; // Changed from name to first_name
      last_name: string;  // Added last_name
    }
}

interface Props {
    className?: string;
    data: Item[]
}

const WORKS_TO_DISPLAY = 8;

export const List = ({ className, data }: Props) => {
    const t = useTranslations();
    const [showMore, setShowMore] = useState(false);
    
    return (
        <section className={cn(className)}>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-y-8">
                {data.slice(0, WORKS_TO_DISPLAY).map((item, i) => (
                    <OpenWorkCard data={item} key={i} />
                ))}
            </div>

            <div className="py-8 md:py-10">
                {/* <AdCarouselServer /> */}
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-y-8">
                {data.slice(WORKS_TO_DISPLAY).map((item, i) => (
                    <OpenWorkCard data={item} key={i + WORKS_TO_DISPLAY} />
                ))}
            </div>

            {showMore && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-y-8 mt-8">
                    {data.slice(WORKS_TO_DISPLAY).map((item, i) => (
                        <OpenWorkCard data={item} key={i + WORKS_TO_DISPLAY} />
                    ))}
                </div>
            )}

            <Button
                className="bg-maket-primary text-white rounded-xl my-6 md:my-8 py-4 md:py-6 px-4 w-full text-sm md:text-base font-semibold hover:bg-sky-800 transition-all"
                onClick={() => setShowMore(!showMore)}
            >
                {t('OpenWorks.more')}
            </Button>
        </section>
    );
};