"use client";
import React, { useState } from 'react';
import { cn } from '@/root/business/lib/utils';
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { useTranslations } from "next-intl";
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
    masters: Master[];
    slug: string;
    showMoreText: string;
    totalMasters: number;
    worksToDisplay: number;
}

export const ShowMoreSection = ({ masters, slug, showMoreText, totalMasters, worksToDisplay }: Props) => {
    const [showMore, setShowMore] = useState(false);
    const t = useTranslations();

    return (
        <>
            {showMore && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 mt-10">
                {masters.slice(worksToDisplay).map((item, i) => (
                    <ServiceCard data={item} slug={slug} key={i + worksToDisplay} />
                ))}
            </div>
            )}

            {totalMasters > worksToDisplay && (
                <Button
                    className="bg-maket-primary text-white rounded-xl my-4 py-6 w-full font-semibold hover:bg-sky-800"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMoreText}
                </Button>
            )}
        </>
    );
};