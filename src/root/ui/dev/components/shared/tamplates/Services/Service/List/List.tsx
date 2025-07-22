// src/root/ui/dev/components/shared/tamplates/Services/Service/List/List.tsx
"use client"
import React, { useState } from 'react';
import { cn } from '@/root/business/lib/utils';
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { useTranslations } from "next-intl";
import { AdCarousel } from "@/root/ui/dev/components/shared/elements/advertising/AdCarousel";
import { ServiceCard } from "@/root/ui/dev/components/shared/elements/Services/Service/ServiceCard";

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
    masters: Master[]; // Receive masters as a prop
}

const WORKS_TO_DISPLAY = 8;

export const List = ({ className, slug, masters }: Props) => {
    const t = useTranslations();
    const [showMore, setShowMore] = useState(false);

    // Removed useEffect and local state for masters

    return (
        <section className={cn(className, "mt-4")}>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                {masters.slice(0, WORKS_TO_DISPLAY).map((item, i) => (
                    <ServiceCard data={item} key={i} />
                ))}
            </div>

            <div className="py-10">
                <AdCarousel />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                {masters.slice(WORKS_TO_DISPLAY).map((item, i) => (
                    <ServiceCard data={item} key={i + WORKS_TO_DISPLAY} />
                ))}
            </div>

            {showMore && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 mt-10">
                    {masters.slice(WORKS_TO_DISPLAY).map((item, i) => (
                        <ServiceCard data={item} key={i + WORKS_TO_DISPLAY} />
                    ))}
                </div>
            )}

            {masters.length > WORKS_TO_DISPLAY && (
                 <Button
                    className="bg-maket-primary text-white rounded-xl my-4 py-6 w-full font-semibold hover:bg-sky-800"
                    onClick={() => setShowMore(!showMore)}
                 >
                    {t('OpenWorks.more')}
                 </Button>
            )}
        </section>
    );
};