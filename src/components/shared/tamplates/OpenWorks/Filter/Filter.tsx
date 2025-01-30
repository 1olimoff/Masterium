import React from 'react';
import { cn } from '@lib/utils';
import {useTranslations} from "next-intl";

interface Props {
    className?: string;
}

export const Filter = ({ className }: Props) => {
    const t = useTranslations();


    return (
        <div className={cn(className, "w-full rounded-2xl bg-white p-6 flex flex-col gap-6")}>
            <h3 className={"text-maket-primary text-2xl font-semibold"}>{t('OpenWorks.filter.title')}</h3>

        </div>
    );
};
