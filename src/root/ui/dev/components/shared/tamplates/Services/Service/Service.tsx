import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {AdGrid} from "@/root/components/shared/elements/advertising/AdGrid";
import {Title} from "@/root/components/shared/tamplates/Services/Service/Title/Title";
import {List} from "@/root/components/shared/tamplates/Services/Service/List/List";

interface Props {
    className?: string;
}

export const Service = ({ className }: Props) => {
    return (
        <div className={cn(className, "w-full flex flex-col gap-12 pt-6 pb-24")}>
            <AdGrid />
            <Title />
            <List />
        </div>
    );
};
