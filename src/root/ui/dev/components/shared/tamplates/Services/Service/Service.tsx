import React from 'react';
import { cn } from '@/root/business/lib/utils';

import { Title } from './Title/Title';
import {List} from "@/root/ui/dev/components/shared/tamplates/Services/Service/List/List";
import { AdGrid } from '../../../elements/advertising/AdGrid';

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
