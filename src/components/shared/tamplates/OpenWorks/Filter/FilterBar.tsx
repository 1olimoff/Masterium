import React from 'react';
import { cn } from '@lib/utils';
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";

interface Props {
    className?: string;
}

export const FilterBar = ({ className }: Props) => {
    const t = useTranslations();
    return (
        <div className={cn(className, "w-full flex justify-between gap-4")}>
            <div className={"w-[27%] flex flex-col gap-4"}>
                <p className="font-gilroy text-lg">{t('OpenWorks.filter.catalog.title')}</p>
                <Input
                    className={"border-2 border-[#CFD9FE] text-xl py-6 px-4 rounded-xl font-gilroy placeholder-gray-500"}
                    placeholder={t("OpenWorks.filter.catalog.placeholder")}
                />
            </div>
        </div>
    );
};
