"use client"
import React from 'react';
import {cn} from '@lib/utils';
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

interface Props {
    className?: string;
    region: string;
    currentLocale: string;
    currentRegion: string;
}

export const ChooseRegion = ({className, region, currentRegion, currentLocale}: Props) => {
    const t = useTranslations("Header.Region");
    return (
        <a
            href={`/${currentLocale}/${region}`}
        >
            <Button
                className={cn(className, "bg-maket-primary w-full hover:bg-white hover:text-maket-primary hover:border-maket-primary hover:border")}
            >
                {t(region)}
            </Button>
        </a>
    );
};
