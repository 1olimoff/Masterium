import React from 'react';
import { cn } from '@lib/utils';
import {AdGrid} from "@/components/shared/elements/advertising/AdGrid";
import {Title} from "@/components/shared/tamplates/Services/Service/Title/Title";
import {List} from "@/components/shared/tamplates/Services/Service/List/List";

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
