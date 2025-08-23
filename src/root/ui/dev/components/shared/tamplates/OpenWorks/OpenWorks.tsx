import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { AdGrid } from "@/root/ui/dev/components/shared/elements/advertising/AdGrid";
import { Title } from "./Title/Title"
import { Filter } from "./Filter/Filter";
import { List } from "@/root/ui/dev/components/shared/tamplates/OpenWorks/List/List";
import { MobileBackTab } from './Title/MobileTabBar';
import { openWorksList } from '@/root/business/api/main/openWorks/openWorksList';
import axios from 'axios';

interface Props {
    className?: string;
}

const AdVisitka = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/ads/list/?type=visitka&limit/`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching masters:', error);
    }
}

export const OpenWorks = async ({ className }: Props) => {
    const response = await openWorksList()
    const advisitka = await AdVisitka()

    return (
        <div className={cn(className, "w-full flex flex-col gap-6 sm:pt-6")}>
            <MobileBackTab />
            <div className='sm:px-4 px-2'>
                <AdGrid advisitka={advisitka} />
                <Title />
                <Filter />
                <List data={response} />
            </div>
        </div>
    );
};
