import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { AdGrid } from "@/root/ui/dev/components/shared/elements/advertising/AdGrid";
import { Title } from "./Title/Title"
import { Filter } from "./Filter/Filter";
import { List } from "@/root/ui/dev/components/shared/tamplates/OpenWorks/List/List";
import { MobileBackTab } from './Title/MobileTabBar';
import { openWorksList } from '@/root/business/api/main/openWorks/openWorksList';

interface Props {
    className?: string;
}

export const OpenWorks = async ({ className }: Props) => {
    const response = await openWorksList()
    
    return (
        <div className={cn(className, "w-full flex flex-col gap-6 sm:pt-6")}>
            <MobileBackTab />
            <div className='sm:px-4 px-2'>
                <AdGrid />
                <Title />
                <Filter />
                <List  data={response}/>
            </div>
        </div>
    );
};
