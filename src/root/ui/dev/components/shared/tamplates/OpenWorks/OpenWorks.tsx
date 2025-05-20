import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {AdGrid} from "@/root/ui/dev/components/shared/elements/advertising/AdGrid";
import {Title} from "./Title/Title"
import {Filter} from "./Filter/Filter";
import {List} from "@/root/ui/dev/components/shared/tamplates/OpenWorks/List/List";

interface Props {
    className?: string;
}

export const OpenWorks = ({ className }: Props) => {
    return (
        <div className={cn(className, "w-full flex flex-col gap-12 pt-6 pb-24")}>
            <AdGrid />
            <Title />
            <Filter />
            <List />
        </div>
    );
};
