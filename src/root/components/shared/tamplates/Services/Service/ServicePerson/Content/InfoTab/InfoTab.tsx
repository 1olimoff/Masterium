import React from 'react';
import { cn } from '@lib/utils';
import {useTranslations} from "next-intl";

interface Props {
    infoText: string;
    experienceText?: string;
    tags?: string[];
    className?: string;
}

export const InfoTab = ({ className, infoText, experienceText, tags }: Props) => {
    const t = useTranslations();
    return (
        <div className={cn(className, "w-full h-full flex flex-col gap-8 pb-8")}>
            <div className={"w-full px-8 py-8 flex flex-col gap-8 rounded-xl bg-white shadow-lg"}>
                <h2 className={"text-[20px] font-bold"}>
                    {t('Services.Service.ServicePerson.infoTab.infoTitle')}
                </h2>
                <p className={"text-[16px] font-medium"}>
                    {infoText}
                </p>
            </div>
        </div>
    );
};
