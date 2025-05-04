import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {useTranslations} from "next-intl";

interface Props {
    className?: string;
}

export const FilterHeader = ({ className }: Props) => {
    const t = useTranslations();
    return (
        <h3 className={cn(className, "text-maket-primary text-2xl font-semibold")}>{t('OpenWorks.filter.title')}</h3>
    );
};
