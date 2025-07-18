import React from 'react';
import {cn} from '@/root/business/lib/utils';
import {FilterHeader} from "@/root/ui/dev/components/shared/tamplates/OpenWorks/Filter/FilterHeader";
import { getCatalogs, getLocations } from "@/root/business/services/services/open-works/filter";
import FilterBarServer from "@/root/ui/dev/components/shared/tamplates/OpenWorks/Filter/FilterBar/FilterBarServer";
const catalogs = await getCatalogs();
const locations = await getLocations();

interface Props {
    className?: string;
}

export const Filter = async ({className}: Props) => {
    return (
        <section className={cn(className, "w-full rounded-2xl mt-2 bg-white p-4 md:p-4 flex flex-col gap-4 md:gap-6")}>
            <FilterHeader />
            <FilterBarServer catalogs={catalogs} locations={locations} />
        </section>
    );
};