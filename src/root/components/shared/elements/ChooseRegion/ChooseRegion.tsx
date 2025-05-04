"use client"
import React from 'react';
import {cn} from '@lib/utils';
import {Button} from "@/root/components/ui/button";
import {useTranslations} from "next-intl";
import Cookies from "js-cookie";

interface Props {
    className?: string;
    region: string;
    currentLocale: string;
}

export const ChooseRegion = ({className, region, currentLocale}: Props) => {
    const t = useTranslations("Header.Region");
    const saveRegionToCookies = () => {
        Cookies.set("region", region); // Сохраняем выбранный регион в куки
        Cookies.set("locale", currentLocale); // Обновляем текущую локаль
    };
    return (
        <a
            onClick={saveRegionToCookies}
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
