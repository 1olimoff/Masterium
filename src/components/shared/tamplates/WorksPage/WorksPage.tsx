import React from 'react';
import { cn } from '@lib/utils';
import {AdGrid} from "@/components/shared/elements/advertising/AdGrid";
import {Title} from "@/components/shared/tamplates/WorksPage/Title/Title";
import {Content} from "@/components/shared/tamplates/WorksPage/Content/Content";
import {Similar} from "@/components/shared/tamplates/WorksPage/Similar/Similar";

interface Props {
    className?: string;
}

export const WorksPage = ({ className }: Props) => {
    return (
        <div className={cn(className, "w-full flex flex-col gap-12 pt-6 pb-24")}>
            <AdGrid />
            <Title />
            <Content />
            <Similar />
        </div>
    );
};
