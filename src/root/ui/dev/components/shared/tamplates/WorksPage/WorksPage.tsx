import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {AdGrid} from "@/root/ui/dev/components/shared/elements/advertising/AdGrid";
import {Title} from "@/root/ui/dev/components/shared/tamplates/WorksPage/Title/Title";
import {Content} from "@/root/ui/dev/components/shared/tamplates/WorksPage/Content/Content";
import {Similar} from "@/root/ui/dev/components/shared/tamplates/WorksPage/Similar/Similar";
import { MobileBackTab } from './Title/MobileBackTab';


interface Props {
    className?: string;
}

export const WorksPage = ({ className }: Props) => {
    return (
        <div className={cn(className, "w-full flex flex-col gap-6 sm:pt-6")}>
            <MobileBackTab />
            <div className='px-2'>
            <AdGrid />
            <Title />
            <Content />
            <Similar />
            </div>
        </div>
    );
};
