import React from 'react';
import {cn} from '@lib/utils';
import {useTranslations} from "next-intl";
import {Input} from "@/components/ui/input";

interface Props {
    className?: string;
}

export const FilterBar = ({className}: Props) => {
    const t = useTranslations();
    return (
        <div className={cn(className, "w-full flex justify-between gap-4")}>
            <div className={"w-[27%] flex flex-col gap-4"}>
                <p>{t('OpenWorks.filter.catalog.title')}</p>
                <Input className={"border-2 border-[#CFD9FE] md:text-lg md:font-thin py-6 rounded-xl"} placeholder={t("OpenWorks.filter.catalog.placeholder")}/>
            </div>
        </div>
    );
};
